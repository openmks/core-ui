function Application(name) {
    var self = this;
    this.name = name;
    // Get makesense api instanse.
    // this.API = MkSAPIBuilder.GetInstance();
    this.API = new MkSAPI();
    this.API.DetectHost();
    // Default handler
    this.API.OnUnexpectedDataArrived = function (packet) {
        console.log(packet);
    }
    this.API.ModulesLoadedCallback = function () {
        console.log("Modules Loaded");
        self.Adaptor    = new Pidaptor(self.API);
        self.Terminal   = new Piterm(self.API);
        if (self.UserModulesLoadedCallback != null) {
            self.UserModulesLoadedCallback();
        }
    }
    this.EventMapper = {};
    this.Adaptor    = null;
    this.Terminal   = null;
    this.Network    = new Network(this.API);

    this.SelectedMenu = null;
    this.API.ApplicationModules.Modal = new MksBasicModal("GLOBAL");
    this.API.ApplicationModules.Error = new MksBasicModal("ERROR");
    this.UserModulesLoadedCallback = null;

    this.API.AppendModule("pidaptor");
    this.API.AppendModule("piterm");

    return this;
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
    this.API.ConnectLocalWS(ip, port, function() {
        console.log("Connected to local websocket");

        self.API.GetModules();
        callback();
    });
}
Application.prototype.OnChangeEvent = function(packet) {
    var event = packet.payload.event;
    var data = packet.payload.data;
    this.Publish(event, data);
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

Application.prototype.AppendModule = function (name) {
    this.API.AppendModule(name);
}
Application.prototype.ShowModal = function(title, content, footer, size) {
    this.API.ApplicationModules.Modal.Remove();
    this.API.ApplicationModules.Modal.SetTitle(title);
    this.API.ApplicationModules.Modal.SetContent(content);
    this.API.ApplicationModules.Modal.SetFooter(footer);
    this.API.ApplicationModules.Modal.Build(size);
    this.API.ApplicationModules.Modal.Show();
}
Application.prototype.HideModal = function() {
    this.API.ApplicationModules.Modal.Remove();
    this.API.ApplicationModules.Modal.Hide();
}
Application.prototype.Replace = function(origin, tag, replacement) {
    return origin.split(tag).join(replacement)
}
Application.prototype.HashMD5 = function(value) {
    // JSON.stringify(value)
    return CryptoJS.MD5(value).toString();
}
Application.prototype.GetAppliactionModules = function() {
    return this.API.GetAppliactionModules();
}

Application.prototype.LoadModule = function(name, callback) {
    this.API.LoadSingleModule(name, function() {
        if (callback != null) {
			callback();
		}
    });
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