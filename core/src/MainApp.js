function Application() {
    var self = this;
    // Get makesense api instanse.
    this.API = MkSAPIBuilder.GetInstance();
    // Default handler
    this.API.OnUnexpectedDataArrived = function (packet) {
        console.log(packet);
    }
    this.API.ModulesLoadedCallback = function () {
        console.log("Modules Loaded");
        if (self.UserModulesLoadedCallback != null) {
            self.UserModulesLoadedCallback();
        }
    }
    this.EventMapper = {};
    this.Adaptor = new Pidaptor(this.API);
    this.Terminal = new Piterm(this.API);

    this.SelectedMenu = null;
    window.ApplicationModules.Modal = new MksBasicModal("GLOBAL");
    window.ApplicationModules.Error = new MksBasicModal("ERROR");
    this.UserModulesLoadedCallback = null;

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
    window.ApplicationModules.Error.Remove();
    window.ApplicationModules.Error.SetTitle(header);
    window.ApplicationModules.Error.SetContent(content);
    window.ApplicationModules.Error.SetFooter(`<button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" onclick="window.ApplicationModules.Error.Callback();">Close</button>`);
    window.ApplicationModules.Error.Build("sm");
    window.ApplicationModules.Error.Show();
    window.ApplicationModules.Error.Callback = callback;
}
Application.prototype.HideInfoWindow = function (header, content) {
    window.ApplicationModules.Error.Hide();
}

Application.prototype.AppendModule = function (name) {
    this.API.AppendModule(name);
}
Application.prototype.ShowModal = function(title, content, footer, size) {
    window.ApplicationModules.Modal.Remove();
    window.ApplicationModules.Modal.SetTitle(title);
    window.ApplicationModules.Modal.SetContent(content);
    window.ApplicationModules.Modal.SetFooter(footer);
    window.ApplicationModules.Modal.Build(size);
    window.ApplicationModules.Modal.Show();
}
Application.prototype.HideModal = function() {
    window.ApplicationModules.Modal.Remove();
    window.ApplicationModules.Modal.Hide();
}
Application.prototype.Replace = function(origin, tag, replacement) {
    return origin.split(tag).join(replacement)
}
Application.prototype.HashMD5 = function(value) {
    // JSON.stringify(value)
    return CryptoJS.MD5(value).toString();
}