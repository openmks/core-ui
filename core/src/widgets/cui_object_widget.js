function CoreUIObjectWidget(scope, params) {
    self = this;

    this.Scope          = scope;
    this.Params         = params;
    this.ObjectName     = ``;
    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = ``;
    this.MyPath         = ``;

    if (scope !== undefined || scope !== null) {
        if (scope.Object.hasOwnProperty("CoreUIWidgets") == false) {   
            scope.Object.CoreUIWidgets = {};
        }
        this.MyPath = this.Scope.Path+`.CoreUIWidgets.[ID]`;
    }

    return this;
}

CoreUIObjectWidget.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIObjectWidget.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIObjectWidget.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIObjectWidget.prototype.Clean = function () {
}

CoreUIObjectWidget.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIObjectWidget.prototype.SetHtml = function (html) {
    this.WorkingObject.innerHTML = html;
}

CoreUIObjectWidget.prototype.PreBuild = function(params) {
}

CoreUIObjectWidget.prototype.PostBuild = function(params) {
}

CoreUIObjectWidget.prototype.Build = function (id) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_"+this.ObjectName;
    this.HTML           = this.Content;

    this.Scope.Object.CoreUIWidgets[this.WidgetID] = this;
    this.MyPath = this.MyPath.split("[ID]").join(this.WidgetID);
    this.HTML = this.HTML.split("[ID]").join(this.WidgetID);

    this.PreBuild();
    // Set HTML
    this.WorkingObject.innerHTML = this.HTML;
    this.PostBuild();
}