function ApplicationLoader() {
    var self = this;
    // Get makesense api instanse.
    this.API = MkSAPIBuilder.GetInstance();
    // Default handler
    this.API.OnUnexpectedDataArrived = function (packet) {
        console.log(packet);
    }
    this.HostMap = {
        "mobile": {
            "html": "js/application/app/mobile/app.html",
            "js": "js/application/app/mobile/app.js"
        },
        "default": {
            "html": "js/application/app/default/app.html",
            "js": "js/application/app/default/app.js"
        }
    }

    return this;
}
ApplicationLoader.prototype.Connect = function(callback) {
    this.API.ConnectLocalWS(global_ip, global_port, function() {
        console.log("Loader", "Connected to local websocket");
        callback();
    });
}
ApplicationLoader.prototype.Disconnect = function(callback) {
    console.log("Disconnect");
    this.API.DisconnectLocalWS();
}
ApplicationLoader.prototype.DetectHost = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        console.log("mobile device");
        return "mobile";
    } else {
        // false for not mobile device
        console.log("not mobile device");
        return "default";
    }
}
ApplicationLoader.prototype.Load = function(callback) {
    var self = this;

    var host = this.DetectHost();
    var files = this.HostMap[host];

    // Load HTML
    this.API.GetFileContent({
        "file_path": files.html
    }, function(res) {
        var payload = res.payload;
        var html = self.API.ConvertHEXtoString(payload.content);
        // Inject into DOM
        document.getElementById("id_application_container_view_module").innerHTML = html;
        // Load JS
        self.API.GetFileContent({
            "file_path": files.js
        }, function(res) {
            self.Disconnect();
            var payload = res.payload;
            var js = self.API.ConvertHEXtoString(payload.content);
            // Inject into DOM
            self.API.ExecuteJS(js);
        });
    });
}