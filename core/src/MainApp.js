function Application(name) {
    var self = this;
    this.Name = name;
    // Get makesense api instanse.
    // this.API = MkSAPIBuilder.GetInstance();
    this.API = new MkSAPI();
    this.API.DetectHost();
    // Default handler
    this.API.OnUnexpectedDataArrived = function (packet) {
        console.log("OnUnexpectedDataArrived", packet);
    }
    this.API.ModulesLoadedCallback = function () {
        console.log("Modules Loaded", this);

        if (self.UserModulesLoadedCallback != null) {
            self.UserModulesLoadedCallback(self);
        }

        // Get Application Name and Version
        this.SendCustomCommand("get_app_info", {
            "async": false
        }, function(data, error) {
            self.SetApplicationName(data.payload.name);
            self.SetApplicationVersion(data.payload.version.application);
        });
    }
    this.EventMapper = {};
    this.Adaptor    = null;
    this.Terminal   = null;
    this.Network    = new Network(this.API);
    this.Users      = new RemoteApps(this);

    this.SelectedMenu = null;
    this.API.ApplicationModules.Modal = new MksBasicModal("GLOBAL");
    this.API.ApplicationModules.Error = new MksBasicModal("ERROR");
    this.API.ApplicationModules.Confirm = new MksBasicModal("CONFIRM");
    this.UserModulesLoadedCallback  = null;
    this.WSDisconnectedBlock        = null;
    this.Identity                   = null
    this.WebSocketUrl               = null;

    // this.API.AppendModule("pidaptor");
    // this.API.AppendModule("piterm");

    return this;
}
Application.prototype.SetIdentity = function(identity) {
    this.Identity = identity;
}
Application.prototype.PostMessage = function(obj) {
    window.parent.postMessage(obj, "*")
}
Application.prototype.RegisterEventHandler = function(name, callback, scope) {
    this.EventMapper[name] = { 
        callback: callback,
        scope: scope
    };
}
Application.prototype.UnregisterEventHandler = function(name) {
    delete this.EventMapper[name];
}
Application.prototype.Publish = function(name, data) {
    var handler  = this.EventMapper[name];
    if (handler !== undefined && handler !== null) {
        handler.callback(data, handler.scope);
    }
}
Application.prototype.Connect = function(ip, port, callback) {
    var self = this;
    console.log("Connect Application");
    // Python will emit messages
    self.API.OnNodeChangeCallback = self.OnChangeEvent.bind(self);
    self.API.OnWSCloseCallback = self.OnCloseEvent.bind(self);
    this.API.ConnectLocalWS(ip, port, function(url) {
        console.log("Connected to local websocket", url);

        self.WebSocketUrl = url;
        self.API.GetModules();
        self.API.GetWidgets();
        callback(self);
    });
}
Application.prototype.Disconnect = function() {
    console.log("Disconnect Application");
    this.API.DisconnectLocalWS();
}
Application.prototype.OnChangeEvent = function(packet) {
    var event = packet.payload.event;
    var data = packet.payload.data;
    this.Publish(event, data);
}
Application.prototype.RegisterOnCloseEvent = function(callback, scope) {
    this.WSDisconnectedBlock = {
        "callback": callback,
        "scope": scope
    }
}
Application.prototype.OnCloseEvent = function(url) {
    console.log("Disconnected from local websocket", url);

    if ("Main" == this.Name) {
        document.getElementById("id_application_session_disconnected").innerHTML = "FOR UNKNOWN ERROR APPLICATION UI SESSION WAS TERMINATED. PLEASE RELOAD OR RE-RUN APLICATION.";
        document.getElementById("id_application_container_view_module").innerHTML = "";
        if (this.WSDisconnectedBlock != null) {
            console.log(this.WSDisconnectedBlock)
            this.WSDisconnectedBlock.callback(this.WSDisconnectedBlock.scope, this.Name, this.Identity);
        }
    }
}
Application.prototype.ShowInfoWindow = function (header, content, callback) {
    this.API.ApplicationModules.Error.Remove();
    this.API.ApplicationModules.Error.SetTitle(header);
    this.API.ApplicationModules.Error.SetContent(content);
    this.API.ApplicationModules.Error.SetFooter(`<button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" onclick="window.MKS.MicroServices.Main.API.ApplicationModules.Error.Callback();">Close</button>`);
    this.API.ApplicationModules.Error.Build("sm");
    this.API.ApplicationModules.Error.Show();
    this.API.ApplicationModules.Error.Callback = callback;
}
Application.prototype.HideInfoWindow = function (header, content) {
    this.API.ApplicationModules.Error.Hide();
}
Application.prototype.HideAllModals = function() {
    $('.modal').modal('hide');
}
Application.prototype.AppendModule = function (name) {
    this.API.AppendModule(name);
}
Application.prototype.ImportWidget = function (name) {
    this.API.ImportWidget(name);
}
Application.prototype.GetModalId = function() {
    return "id_basic_modal_GLOBAL_content";
}
Application.prototype.ShowModalEmpty = function(title, footer, size) {
    this.API.ApplicationModules.Modal.Remove();
    this.API.ApplicationModules.Modal.SetTitle(title);
    this.API.ApplicationModules.Modal.SetContent("");
    this.API.ApplicationModules.Modal.SetFooter(footer);
    this.API.ApplicationModules.Modal.Build(size);
    this.API.ApplicationModules.Modal.Show();
}
Application.prototype.ShowModal = function(title, content, footer, size) {
    this.API.ApplicationModules.Modal.Remove();
    this.API.ApplicationModules.Modal.SetTitle(title);
    this.API.ApplicationModules.Modal.SetContent(content);
    this.API.ApplicationModules.Modal.SetFooter(footer);
    this.API.ApplicationModules.Modal.Build(size);
    this.API.ApplicationModules.Modal.Show();
}
Application.prototype.ShowConfirm = function(data) {
    var footer = `
        <button type="button" class="btn btn-success btn-sm" onclick="`+data.onconfirm+`">`+data.confirm_text+`</button>
        <button type="button" onclick="`+data.oncancel+`" class="btn btn-secondary btn-sm" data-dismiss="modal">`+data.cancel_text+`</button>
    `;
    this.API.ApplicationModules.Confirm.Remove();
    this.API.ApplicationModules.Confirm.SetTitle(data.title);
    this.API.ApplicationModules.Confirm.SetContent(data.content);
    this.API.ApplicationModules.Confirm.SetFooter(footer);
    this.API.ApplicationModules.Confirm.Build(data.size);
    this.API.ApplicationModules.Confirm.Show();
}
Application.prototype.HideConfirm = function() {
    this.API.ApplicationModules.Confirm.Remove();
    this.API.ApplicationModules.Confirm.Hide();
}
Application.prototype.HideModal = function() {
    this.API.ApplicationModules.Modal.Remove();
    this.API.ApplicationModules.Modal.Hide();
}
Application.prototype.DictHasKey = function(dict, key) {
    return dict.hasOwnProperty(key);
}
Application.prototype.DictLength = function(dict) {
    return Object.keys(dict).length;
}
Application.prototype.DictToKeyArray = function(dict) {
    return Object.keys(dict);
}
Application.prototype.DictToArray = function(dict) {
    return Object.values(dict);
}
Application.prototype.RemoveFromArrayByValue = function(array, item) {
    var index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }
}
Application.prototype.Replace = function(origin, tag, replacement) {
    return origin.split(tag).join(replacement)
}
Application.prototype.HashMD5 = function(value) {
    // JSON.stringify(value)
    return CryptoJS.MD5(value).toString();
}
Application.prototype.GetViewInfo = function() {
    return {
        screen: window.screen,
        window: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
}
Application.prototype.Resize = function(width, height) {
    window.resizeTo(width, height);
}
Application.prototype.GetAppliactionModules = function() {
    return this.API.GetAppliactionModules();
}
Application.prototype.LoadModule = function(name, callback) {
    var self = this;
    this.API.LoadSingleModule(name, function(js) {
        if (callback != null) {
			callback(self, js);
		}
    });
}
Application.prototype.SetApplicationName = function(name) {
    document.getElementById("id_template_application_name").innerHTML = name;
    document.getElementById("id_template_application_title").innerHTML = name;
}
Application.prototype.SetApplicationVersion = function(version) {
    console.log(version)
    document.getElementById("id_template_application_version").innerHTML = version;
}

var MkSApplicationBuilder = (function () {
	function CreateInstance (name) {
        window.MKS.MicroServices[name] = new Application(name);
        return {
            Application: window.MKS.MicroServices[name],
            Path: "window.MKS.MicroServices." + name
        }
	}

	return {
		Create: function (name) {
            console.log("Create Application instance");
            return CreateInstance(name);
		}
	};
})();