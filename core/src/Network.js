function Network(api) {
    var self = this;

    this.API        = api;
    this.Wifi       = new Wifi(api);
    this.Bluetooth  = new Bluetooth(api);
    this.Ethernet   = new Ethernet(api);
    this.MKS        = new MakeSense(api);

    return this;
}

function MakeSense(api) {
    var self = this;

    this.API = api;

    return this;
}
MakeSense.prototype.GetNeighbors = function(callback) {
    this.API.SendCustomCommand("get_neighbors", {
        "async": false
    }, function(packet, error) {
        if (callback === undefined || callback === null) {
            console.log(packet.payload);
        } else {
            callback(packet.payload, error);
        }
    });
}
MakeSense.prototype.ConnectNeighbor = function(ip, port, callback) {
    this.API.SendCustomCommand("connect_neighbor", {
        "async": false,
        "ip": ip,
        "port": port
    }, function(packet, error) {
        if (callback === undefined || callback === null) {
            console.log(packet.payload);
        } else {
            callback(packet.payload, error);
        }
    });
}
MakeSense.prototype.DisconnectNeighbor = function(ip, port, callback) {
    this.API.SendCustomCommand("disconnect_neighbor", {
        "async": false,
        "ip": ip,
        "port": port
    }, function(packet, error) {
        if (callback === undefined || callback === null) {
            console.log(packet.payload);
        } else {
            callback(packet.payload, error);
        }
    });
}
MakeSense.prototype.SendDataToNeighbor = function(ip, port, data, callback) {
    this.API.SendCustomCommand("send_data_to_neighbor", {
        "async": false,
        "ip": ip,
        "port": port,
        "data": data
    }, function(packet, error) {
        if (callback === undefined || callback === null) {
            console.log(packet.payload);
        } else {
            callback(packet.payload, error);
        }
    });
}

function Ethernet(api) {
    var self = this;

    this.API = api;

    return this;
}
Ethernet.prototype.GetIterfaces = function(callback) {
    this.API.SendCustomCommand("get_iface_list", {
        "async": false
    }, function(packet, error) {
        if (callback === undefined || callback === null) {
            console.log(packet.payload);
        } else {
            callback(packet.payload, error);
        }
    });
}

Ethernet.prototype.Ping = function(ip_addr) {
    
}

Ethernet.prototype.OpenSocket = function(ip_addr, port) {
    
}

Ethernet.prototype.CloseSocket = function(id) {
    
}

Ethernet.prototype.SendSocket = function(id, message) {
    
}

function Wifi(api) {
    var self = this;

    this.API = api;

    return this;
}
Wifi.prototype.GetAccessPoints = function() {
    
}

function Bluetooth(api) {
    var self = this;

    this.API = api;

    return this;
}
Bluetooth.prototype.Scan = function() {
    
}
