function CoreUIBasicTabs () {
	self = this;

	this.WorkingObject  = null;
    this.WidgetID       = null;
	this.Content 		= `
        <div id="[ID]">
            <div class="progress">
                <div id="id-progress-bar-[ID]" class="progress-bar progress-bar-striped" style="min-width: 20px;"></div>
            </div>
            <div>
                <span class="text-muted" id="id-progress-item-[ID]"></span>
            </div>
        </div>
	`;
	
	return this;
}

CoreUIBasicTabs.prototype.Build = function (id) {
	this.WorkingObject  = document.getElementById(id);
	this.WidgetID  		= id+"_core_ui_progress_bar";
	var html 			= this.Content;

	html = html.split("[ID]").join(this.WidgetID);
	// Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIBasicTabs.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicTabs.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicTabs.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicTabs.prototype.SetMessageView = function (status) {
	if (status == true) {
		document.getElementById("id-progress-item-"+this.WidgetID).classList.add("d-none");
	} else {
		document.getElementById("id-progress-item-"+this.WidgetID).classList.remove("d-none");
	}
}

CoreUIBasicTabs.prototype.SetValue = function (value) {
    $("#id-progress-bar-"+this.WidgetID).css("width", value+"%").text(value+"%");
}

CoreUIBasicTabs.prototype.SetMessage = function (message) {
    document.getElementById("id-progress-item-"+this.WidgetID).innerHTML = message;
}