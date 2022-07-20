function CoreUIBasicSwitchButton () {
	self = this;

    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = `
        <div class="custom-control custom-switch">
            <input type="checkbox" id="[ID]_switch" onclick="[ONCLICK_CALLBACK](this, '[ID]_switch', '[NAME]');" [STATE] class="custom-control-input">
            <label class="custom-control-label" for="[ID]_switch"></label>
        </div>
    `;
    this.Status         = false

	return this;
}

CoreUIBasicSwitchButton.prototype.Build = function (id, info) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_basic_switch_button";
    var html            = this.Content;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[NAME]").join(info.name);
    html = html.split("[STATE]").join(info.state);
    html = html.split("[ONCLICK_CALLBACK]").join(info.onclick_callback);
    // Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIBasicSwitchButton.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicSwitchButton.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicSwitchButton.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicSwitchButton.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIBasicSwitchButton.prototype.GetValue = function () {
    return document.getElementById(this.WidgetID + "_switch").checked;
}

CoreUIBasicSwitchButton.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID + "_switch").checked = value;
    this.Status = value;
}

