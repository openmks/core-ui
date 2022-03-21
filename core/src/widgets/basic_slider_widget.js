function CoreUIBasicSliderWidget () {
	self = this;

    this.WorkingObject  = null;
    this.Content        = `
        <div class="card-body">
            <h6 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Power</span>
                <span class="badge badge-secondary badge-pill" id="[ID]_value">0</span>
            </h6>
            <div id="[ID]"></div>
        </div>
    `;
    this.Slider         = null;

	return this;
}

CoreUIBasicSliderWidget.prototype.Build = function (id, info) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_widget_canvas";
    var html            = this.Content;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    // Set HTML
    this.WorkingObject.innerHTML = html;
    // Build basic slider
    this.Slider = new CoreUIBasicSlider();
    this.Slider.Build(this.WidgetID, {
        min: info.min,
        max: info.max,
        step: info.step,
        oninput_callback: "ModuleOnlineStreamView.prototype.SetLEDPower_oninput",
        onchange_callback: "window.ApplicationModules.OnlineStreamView.SetLEDPower_onclick"
    })
}

CoreUIBasicSliderWidget.prototype.Remove = function () {
    this.Slider.Remove();
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicSliderWidget.prototype.SetValue = function (value) {
    document.getElementById(this.SliderID).value = value;
}

CoreUIBasicSliderWidget.prototype.OnChangeCallback = function (value) {

}

CoreUIBasicSliderWidget.prototype.OnInputCallback = function (value) {
}