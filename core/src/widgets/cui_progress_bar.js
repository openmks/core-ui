function CoreUIProgressBar (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_progress_bar";
	this.Content    = `
        <div id="[ID]">
            <div class="progress">
                <div id="[ID]_bar" class="progress-bar progress-bar-striped" style="min-width: 20px;"></div>
            </div>
            <div>
                <span class="text-muted" id="[ID]_item"></span>
            </div>
        </div>
	`;
	
	return this;
}

CoreUIProgressBar.prototype              = Object.create(CoreUIObject.prototype);
CoreUIProgressBar.prototype.constructor  = CoreUIProgressBar;

CoreUIProgressBar.prototype.PostBuild = function() {
    this.SetValue(0);
    this.SetMessage("Idle");
}

CoreUIProgressBar.prototype.SetMessageView = function (status) {
	if (status == true) {
		document.getElementById(this.WidgetID+"_item").classList.add("d-none");
	} else {
		document.getElementById(+this.WidgetID+"_item").classList.remove("d-none");
	}
}

CoreUIProgressBar.prototype.SetValue = function (value) {
    $("#"+this.WidgetID+"_bar").css("width", value+"%").text(value+"%");
}

CoreUIProgressBar.prototype.SetMessage = function (message) {
    document.getElementById(this.WidgetID+"_item").innerHTML = message;
}