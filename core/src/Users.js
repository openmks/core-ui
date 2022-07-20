function RemoteApps(app) {
    var self = this;

    this.Application    = app;

    this.UsersEventCallbacks = [];
    this.Applications = {};
    this.Application.RegisterEventHandler("users", this.UsersHandlers, this);
    this.ApplicationDisconnectedEventCallback = null;

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
    // console.log("UsersHandlers", user, scope);

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
                delete scope.Applications[hash];
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
        hash: hash,
        ts: user.info.timestamp
    };
    
    for (idx in scope.UsersEventCallbacks) {
        scope.UsersEventCallbacks[idx](callback_data);
    }
}

RemoteApps.prototype.IsConnect = function(hash) {
    var user_exist = this.Applications.hasOwnProperty(hash);
    if (user_exist) {
        return this.Applications[hash].is_connected;
    }

    return false;
}

RemoteApps.prototype.ApplicationDisconnectedEvent = function(scope, name, identity) {
    var user_exist = scope.Applications.hasOwnProperty(identity);
    if (user_exist == false) {
        return false
    }

    if (scope.ApplicationDisconnectedEventCallback != null) {
        scope.ApplicationDisconnectedEventCallback(name, identity);
    }

    // Delete this application
    delete scope.Applications[identity];
}

RemoteApps.prototype.Connect = function(hash, modules, callback) {
    var self = this;

    var user_exist = this.Applications.hasOwnProperty(hash);
    if (user_exist == false) {
        return false
    }

    var app_info = this.Applications[hash].info;
    console.log("Connect", this.Applications[hash], app_info);

    var app = MkSApplicationBuilder.Create(app_info.data.name.replace(" ", "_"));
    for (idx in modules) {
        app.Application.AppendModule(modules[idx]);
    }

    app.Application.SetIdentity(hash);
    app.Application.RegisterOnCloseEvent(this.ApplicationDisconnectedEvent, this);

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
    var user_exist = this.Applications.hasOwnProperty(hash);
    if (user_exist) {
        this.Applications[hash].Application.Disconnect();
        return true;
    }
    
    return false;
}

RemoteApps.prototype.GetAPI = function(callback) {
    
}

RemoteApps.prototype.GetApplication = function(hash) {
    if (this.Applications.hasOwnProperty(hash) == false) {
        return null;
    }

    return this.Applications[hash].Application;
}

RemoteApps.prototype.SendSonar = function(name, category, group, type) {
    this.Application.API.SendCustomCommand("find_neighbors", {
        async: false,
        info: {
            name: name,
            category: category,
            group: group,
            type: type
        }
    }, function(data, error) {
    });
}