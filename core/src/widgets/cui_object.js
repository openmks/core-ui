function CoreUIObject(params) {
    self = this;

    this.Params         = params;
    this.ObjectName     = ``;
    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = ``;
    this.HTML           = ``;

    return this;
}

CoreUIObject.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIObject.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIObject.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIObject.prototype.Clean = function () {
}

CoreUIObject.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIObject.prototype.SetHtml = function (html) {
    this.WorkingObject.innerHTML = html;
}

CoreUIObject.prototype.PreBuild = function(params) {
}

CoreUIObject.prototype.PostBuild = function(params) {
}

CoreUIObject.prototype.Build = function (id) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_"+this.ObjectName;
    this.HTML           = this.Content;

    this.HTML = this.HTML.split("[ID]").join(this.WidgetID);

    this.PreBuild();
    // Set HTML
    this.WorkingObject.innerHTML = this.HTML;
    this.PostBuild();
}