function ApplicationLoader() {
    var self = this;
    // Get makesense api instanse.
    this.API = MkSAPIBuilder.GetInstance();
    // Default handler
    this.API.OnUnexpectedDataArrived = function (packet) {
        console.log(packet);
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

ApplicationLoader.prototype.Load = function(callback) {
    var self = this;

    var host  = this.API.DetectHost();
    var files = this.API.HostMap[host];

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
            var payload = res.payload;
            var js = self.API.ConvertHEXtoString(payload.content);

            // Load Resource
            self.API.GetFileContent({
                "file_path": files.resource
            }, function(res) {
                var payload = res.payload;
                var resource = self.API.ConvertHEXtoString(payload.content);
                // Disconnect loader API
                self.Disconnect();
                // Inject into DOM
                self.API.ExecuteJS(js);
                self.API.ExecuteJS(resource);
                callback();
            });
        });
    });
}