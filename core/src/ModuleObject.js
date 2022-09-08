function ModuleObject(app, id) {
    var self = this;

    // Modules basic
    this.ModuleName                 = "";
    this.Application                = app.Application;
    this.ApplicationsPath           = app.Path + ".API.ApplicationModules.";
    this.DOMName                    = "";
    this.HTML 	                    = "";
    this.HostingID                  = id;
    // Objects section
    this.HostingObject              = null;
    this.ComponentObject            = null;

    return this;
}

ModuleObject.prototype.SetObjectDOMName = function(name) {
    this.DOMName = name;
}

ModuleObject.prototype.SetHostingID = function(id) {
    this.HostingID = id;
}

ModuleObject.prototype.PreBuild = function() {
}

ModuleObject.prototype.PostBuild = function() {

}

ModuleObject.prototype.Build = function(data, callback) {
    var self = this;

    this.DOMName = this.ApplicationsPath + this.ModuleName;

    this.PreBuild();
    this.Application.API.GetModuleUI(this.ModuleName+".html", function(html) {
        // Get HTML content
        self.HTML = html.replace("[ID]", self.HostingID);
        self.HTML = self.HTML.split("[MODULE]").join(self.DOMName);
        // Apply HTML to DOM
        self.HostingObject = document.getElementById(self.HostingID);
        if (self.HostingObject !== undefined && self.HostingObject != null) {
            self.HostingObject.innerHTML = self.HTML;
        }
        // Each UI module have encapsulated conent in component object (DIV)
        self.ComponentObject = document.getElementById("id_m_component_view_"+self.HostingID);

        self.PostBuild();

        // Call callback
        if (callback !== undefined && callback != null) {
            callback(self);
        }
    });
}

ModuleObject.prototype.Clean = function() {
}

ModuleObject.prototype.Hide = function() {
    this.ComponentObject.classList.add("d-none")
}

ModuleObject.prototype.Show = function() {
    this.ComponentObject.classList.remove("d-none")
}

ModuleObject.prototype.SelectedView = function() {
}
