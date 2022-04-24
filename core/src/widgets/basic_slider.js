function CoreUIBasicSlider () {
	self = this;

    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = `<input type="range" class="custom-range" min="[MIN]" max="[MAX]" step="[STEP]" id="[ID]" oninput="[ONINPUT_CALLBACK](this.value);" onchange="[ONCHANGE_CALLBACK](this.value);">`;
	this.Slider         = null;

	return this;
}

CoreUIBasicSlider.prototype.Build = function (id, info) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_slider";
    var html            = this.Content;

    // Update content with user info
    html = html.split("[MIN]").join(info.min);
    html = html.split("[MAX]").join(info.max);
    html = html.split("[STEP]").join(info.step);
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[ONINPUT_CALLBACK]").join(info.oninput_callback);
    html = html.split("[ONCHANGE_CALLBACK]").join(info.onchange_callback);
    // Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIBasicSlider.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicSlider.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicSlider.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicSlider.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID).value = value;
}