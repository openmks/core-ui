function RemoteApps(app) {
    var self = this;

    this.Application    = app;

    this.UsersEventCallbacks = [];
    this.Applications = {};
    this.Application.RegisterEventHandler("users", this.UsersHandlers, this);

    return this;
}

RemoteApps.prototype.RegisterUserEvent = function(callback) {
    var status = this.UsersEventCallbacks.includes(callback);
    if (status) {
        return;
    }

    this.UsersEventCallbacks.push(callback);
}

RemoteApps.prototype.UsersHandlers = function(user, scope) {
    console.log("UsersHandlers", user, scope);

    var hash = user.info.data.hash;
    var user_exist = scope.Applications.hasOwnProperty(hash);
    if (user_exist) {
        switch (user.event) {
            case "new":
                // Disconnect if connected
                if (scope.Applications[hash].is_connected) {
                    // Disconnect
                }
                scope.Applications[hash] = {
                    info: user.info,
                    is_connected: false
                }
                break;
            case "update":
                scope.Applications[hash].info = user.info;
                break;
            case "del":
                // Remove user from list
                break;
        }
    } else {
        if (user.event == "del") {
            return;
        }

        scope.Applications[hash] = {
            info: user.info,
            is_connected: false
        }
    }

    var callback_data = {
        ip: user.info.data.server.address.ip,
        websock_port: user.info.data.server.web_socket.port,
        name: user.info.data.name,
        identification: user.info.data.identification,
        event: user.event,
        hash: hash
    };
    
    for (idx in scope.UsersEventCallbacks) {
        scope.UsersEventCallbacks[idx](callback_data);
    }
}

RemoteApps.prototype.IsConnect = function(hash) {
    return this.Applications[hash].is_connected;
}

RemoteApps.prototype.Connect = function(hash, modules, callback) {
    var self = this;
    var app_info = this.Applications[hash].info;
    console.log("Connect", this.Applications[hash], app_info);

    var app = MkSApplicationBuilder.Create(app_info.data.name.replace(" ", "_"));
    for (idx in modules) {
        app.Application.AppendModule(modules[idx]);
    }

    app.Application.UserModulesLoadedCallback = function(scope) {
        console.log("UserModulesLoadedCallback");
        callback(self.Applications[hash].Application);
    }
    app.Application.Connect(app_info.data.server.address.ip, app_info.data.server.web_socket.port, function(scope) {
        console.log(app_info.data.name, "Service connected");
        self.Applications[hash].is_connected = true;
    });

    this.Applications[hash].Application = app;
}

RemoteApps.prototype.Disconnect = function(hash) {
    this.Applications[hash].Application.Disconnect();
}

RemoteApps.prototype.GetAPI = function(callback) {
    
}