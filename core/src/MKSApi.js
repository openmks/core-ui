function MkSAPI () {
	self 		= this;
	this.WS 	= null;

	this.ModulesLoadedCallback = null;
	this.OnNodeChangeCallback = null;
	this.OnWSErrorCallback = null;
	this.OnWSCloseCallback = null;

	// Monitoring
	this.CallbacksMonitorId	= 0;

	// Callback management
	this.Callbacks 			= {};
	this.PacketCounter		= 1;
	this.SentPackets 		= [];

	this.ApplicationModules = {
		'Count': 0,
		'ModulesPathList': []
	}
	this.WidgetsList = {
		'Count': 0,
		'ModulesPathList': []
	}
	this.ApplicationModulesLoaded	= false;
	this.WidgetsLoaded 				= false;

	this.HostMap = {
        "mobile": {
            "html": "js/application/app/mobile/app.html",
            "js": "js/application/app/mobile/app.js",
			"resource": "js/application/app/mobile/resource.js"
        },
        "default": {
            "html": "js/application/app/default/app.html",
            "js": "js/application/app/default/app.js",
			"resource": "js/application/app/default/resource.js"
        }
    }

	self.HostType 			= null; 
	
	return this;
}

MkSAPI.prototype.ConvertHEXtoStringNoZeroCheck = function(hexx) {
	var hex = hexx.toString(); //force conversion
	var str = '';
	for (var i = 0; (i < hex.length); i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return str;
}

MkSAPI.prototype.ConvertHEXtoString = function(hexx) {
	var hex = hexx.toString();//force conversion
	var str = '';
	for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return str;
}

MkSAPI.prototype.ExecuteJS = function(content) {
	var oScript 	= document.createElement("script");
	var oScriptText = document.createTextNode(content);
	oScript.appendChild(oScriptText);
	document.body.appendChild(oScript);
}

MkSAPI.prototype.AppendCSS = function(content) {
	console.log("AppendCSS");
	var styleSheet = document.createElement("style");
	// styleSheet.type = "text/css";
	styleSheet.textContent = content;
	document.head.appendChild(styleSheet);
}

MkSAPI.prototype.WidgetAppendCSS = function(name, content) {
	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = content;
	document.head.appendChild(styleSheet);
}

MkSAPI.prototype.ConnectLocalWS = function (ip, port, callback) {
	var self = this;
	var url	= "ws://" + ip;
	url = url.concat(":", port);

	console.log("LOCAL WEBSOCKET", url);

	this.WS = new WebSocket(url);
	this.WS.onopen = function () {
		console.log("LOCAL WEBSOCKET > CREATED", self.WS.url);
		callback(self.WS.url);
	};
	this.WS.onmessage = function (event) {
		var jsonData = JSON.parse(event.data);
		// console.log("LOCAL WEBSOCKET > DATA", jsonData);
		var identifier = jsonData.header.identifier;
		if (self.Callbacks[identifier]) {
			handler = self.Callbacks[identifier];
			if (handler.callback !== undefined && handler.callback !== null) {
				handler.callback(jsonData, {error: "none"});
			}

			// console.log("[LOCAL #2] Delete Identifier #", identifier);	
			delete self.Callbacks[identifier];
		} else {
			if (identifier == -1) {
				if (null != self.OnNodeChangeCallback) {
					self.OnNodeChangeCallback(jsonData);
				}
			} else {
			}
		}
	}
	this.WS.onerror = function (event) {
		console.log("[ERROR] Websocket", event.data);
		if (null != self.OnWSErrorCallback) {
			self.OnWSErrorCallback(event.data);
		}
	}
	this.WS.onclose = function () {
		console.log("[LOCAL WEBSOCKET] Connection closed...");
		if (null != self.OnWSCloseCallback) {
			self.OnWSCloseCallback(self.WS.url);
		}
	};
}

MkSAPI.prototype.DisconnectLocalWS = function () {
	this.WS.close();
}

MkSAPI.prototype.CallbacksMonitor = function () {
	// console.log("(CallbacksMonitor)");
	if (0 == Object.keys(this.Callbacks).length) {
		//console.log("(CallbacksMonitor) Callbacks list empty");
		clearInterval(this.CallbacksMonitorId);
		this.CallbacksMonitorId	= 0;
	} else {
		for (key in this.Callbacks) {
			if (this.Callbacks.hasOwnProperty(key)) {
				item = this.Callbacks[key];
				
				if (item.timeout_counter > item.timeout) {
					try {
						if (item.callback !== undefined && item.callback !== null) {
							item.callback(null, {error: "timeout"});
						}
					}
					catch (e) {
						console.log("[ERROR] (CallbacksMonitor)", e.message);
					}
					
					delete this.Callbacks[key];
					// console.log(Object.keys(this.Callbacks).length);
				} else {
					item.timeout_counter++;
					// console.log(item.timeout_counter, item.timeout);
				}
			}
		}
	}
}

MkSAPI.prototype.SendPacket = function (cmd, payload, callback) {
	if ("" == payload) {
		payload = {};
	}

	request = {
		header: {
			command: cmd,
			timestamp: Date.now(),
			identifier: this.PacketCounter
		},
		payload: payload
	}

	this.Callbacks[this.PacketCounter] = { 
		callback: callback,
		timeout_counter: 0,
		timeout: 10
		};

	this.PacketCounter++;
	if (this.PacketCounter < 1) {
		this.PacketCounter = 0;
	}

	this.WS.send(JSON.stringify(request));

	if (!this.CallbacksMonitorId) {
		this.CallbacksMonitorId = setInterval(this.CallbacksMonitor.bind(this), 1000);
	}
}

MkSAPI.prototype.SendPacketNoResponse = function (cmd, payload) {
	if ("" == payload) {
		payload = {};
	}

	request = {
		header: {
			command: cmd,
			timestamp: Date.now(),
			identifier: this.PacketCounter
		},
		payload: payload
	}

	this.PacketCounter++;
	if (this.PacketCounter < 1) {
		this.PacketCounter = 0;
	}

	this.WS.send(JSON.stringify(request));
}

MkSAPI.prototype.OpenURL = function (method) {
	window.open(method);
}

MkSAPI.prototype.DetectHost = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        console.log("mobile device");
        self.HostType = "mobile";
    } else {
        // false for not mobile device
        console.log("not mobile device");
        self.HostType = "default";
    }

	return self.HostType;
}

MkSAPI.prototype.GetFileContent = function (payload, callback) {
	this.SendPacket("get_file", payload, callback);
}

MkSAPI.prototype.GetResourceContent = function (payload, callback) {
	this.SendPacket("get_resource", payload, callback);
}

MkSAPI.prototype.GetWidgetContent = function (payload, callback) {
	this.SendPacket("get_widget", payload, callback);
}

MkSAPI.prototype.UploadFileContent = function (payload) {
	this.SendPacketNoResponse("upload_file", payload);
}

MkSAPI.prototype.SendCustomCommand = function (command, payload, callback) {
	this.SendPacket(command, payload, callback);
}

MkSAPI.prototype.RegisterOnNodeChange = function (callback) {
	this.SendPacket("register_on_node_change", {}, callback);
}

MkSAPI.prototype.UnregisterOnNodeChange = function (callback) {
	this.SendPacket("unregister_on_node_change", {}, callback);
}

MkSAPI.prototype.AppendModule = function(name) {
	this.ApplicationModules.ModulesPathList.push(name+".js");
	this.ApplicationModules.Count++;
}

MkSAPI.prototype.ImportWidget = function(name) {
	this.WidgetsList.ModulesPathList.push(name+".js");
	this.WidgetsList.Count++;
}

MkSAPI.prototype.GetModuleUI = function(name, callback) {
	var self = this;
	this.GetResourceContent({
		"file_path": "modules/"+name
	}, function(res, error) {
		// Get payload
        var payload = res.payload;
		// Get HTML content
        var html = self.ConvertHEXtoString(payload.content);
		callback(html);
	});
}

MkSAPI.prototype.GetModules = function(name) {
	for (key in this.ApplicationModules.ModulesPathList) {
		this.LoadModule(this.ApplicationModules.ModulesPathList[key]);
	}
}

MkSAPI.prototype.GetWidgets = function(name) {
	for (key in this.WidgetsList.ModulesPathList) {
		this.LoadWidget(this.WidgetsList.ModulesPathList[key]);
	}
}

MkSAPI.prototype.LoadModule = function(name) {
	var self = this;
	this.GetResourceContent({
		"file_path": "modules/"+name
	}, function(res, error) {
		var payload = res.payload;
		var js = self.ConvertHEXtoString(payload.content);
		// Inject into DOM
		self.ExecuteJS(js);
		self.ApplicationModules.Count--;
		console.log(self.ApplicationModules.Count, name);
		if (self.ApplicationModules.Count == 0) {
			self.ApplicationModulesLoaded = true;
			if (self.WidgetsLoaded == true || self.WidgetsList.Count == 0) {
				if (self.ModulesLoadedCallback != null) {
					self.ModulesLoadedCallback();
				}
			}
		}
	});
}

MkSAPI.prototype.LoadWidget = function(path) {
	var self = this;
	this.GetWidgetContent({
		"file_path": path
	}, function(res, error) {
		var payload = res.payload;
		var js = self.ConvertHEXtoString(payload.content);
		// Inject into DOM
		self.ExecuteJS(js);
		self.WidgetsList.Count--;
		console.log(self.WidgetsList.Count, path);
		if (self.WidgetsList.Count == 0) {
			self.WidgetsLoaded = true;
			if (self.ApplicationModulesLoaded == true || self.ApplicationModules.Count == 0) {
				if (self.ModulesLoadedCallback != null) {
					self.ModulesLoadedCallback();
				}
			}
		}
	});
}

MkSAPI.prototype.LoadSingleModule = function(name, callback) {
	var self = this;
	this.GetResourceContent({
		"file_path": "modules/"+name+".js"
	}, function(res, error) {
		var payload = res.payload;
		var js = self.ConvertHEXtoString(payload.content);
		// Inject into DOM
		self.ExecuteJS(js);
		console.log(self.ApplicationModules.Count, name);
		if (callback != null) {
			callback(js);
		}
	});
}


MkSAPI.prototype.GetAppliactionModules = function() {
	return this.ApplicationModules;
}

var MkSAPIBuilder = (function () {
	var Instance;

	function CreateInstance () {
		api = new MkSAPI();
		api.DetectHost();
		return api;
	}

	return {
		GetInstance: function () {
			if (!Instance) {
				console.log("Create API instance");
				Instance = CreateInstance();
			}

			console.log("Return API instance");
			return Instance;
		}
	};
})();
