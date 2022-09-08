function CoreUITemplate () {
	self = this;

	this.WorkingObject  = null;
    this.WidgetID       = null;
	this.Content 		= `
		<div id="[ID]"></div>
	`;

	if (window.ApplicationModules.hasOwnProperty("CoreUIWidgets") == false) {   
		window.ApplicationModules.CoreUIWidgets = {};
	}

	this.ID 			= "";
	this.Text	 		= "";
    this.DataIn         = null;
    this.DataOut        = null;

	return this;
}

CoreUITemplate.prototype.Build = function (id) {
	this.WorkingObject  = document.getElementById(id);
	this.WidgetID  		= id+"<UNIQUE_WIDGET_NAME>";
	var html 			= this.Content;

    // Update Core UI local DB with this instance
	window.ApplicationModules.CoreUIWidgets[this.WidgetID] = this;
    // Build widget html context
	html = html.split("[ID]").join(this.WidgetID);

	// Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUITemplate.prototype.Update = function () {
}

CoreUITemplate.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUITemplate.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUITemplate.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUITemplate.prototype.GetHTML = function () {
    return this.WorkingObject.innerHTML;
}

CoreUITemplate.prototype.SetHTML = function () {
}

CoreUITemplate.prototype.Send = function () {
}

CoreUITemplate.prototype.Recieve_Event = function () {
}

CoreUITemplate.prototype.OnClick_Event = function () {
}

CoreUITemplate.prototype.OnKeyPress_Event = function () {
}
