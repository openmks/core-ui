function CoreUIBasicSliderWidget (scope) {
	self = this;

    this.Scope          = scope;
    this.WorkingObject  = null;
    this.Content        = `
        <div class="card">
            <div class="card-body">
                <h6 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">[NAME]</span>
                    <span class="badge badge-secondary badge-pill" id="[ID]_value">0</span>
                </h6>
                <div id="[ID]_basic_slider"></div>
            </div>
        </div>
    `;
    this.Slider         = null;
    this.Info           = null;
    this.SelectedValue  = null;
    this.UpdateValueEnabled = true;

    if (scope.Object.hasOwnProperty("CoreUIWidgets") == false) {   
		scope.Object.CoreUIWidgets = {};
	}
    this.MyPath = this.Scope.Path+`.CoreUIWidgets.[ID]`;

	return this;
}

CoreUIBasicSliderWidget.prototype.Build = function (id, info) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_widget_canvas";
    var html            = this.Content;

    this.Scope.Object.CoreUIWidgets[id] = this;
    this.MyPath = this.MyPath.split("[ID]").join(id);
    this.Info = info;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[NAME]").join(info.name);
    // Set HTML
    this.WorkingObject.innerHTML = html;
    // Build basic slider
    this.Slider = new CoreUIBasicSlider();
    this.Slider.Build(this.WidgetID+"_basic_slider", {
        min: info.min,
        max: info.max,
        step: info.step,
        oninput_callback: this.MyPath+".OnInputCallback",
        onchange_callback: this.MyPath+".OnChangeCallback",
        onmousedown_callback: this.MyPath+".OnMouseDownCallback",
        onmouseup_callback: this.MyPath+".OnMouseUpCallback"
    });
}

CoreUIBasicSliderWidget.prototype.Remove = function () {
    this.Slider.Remove();
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicSliderWidget.prototype.SetValue = function (value) {
    if (this.UpdateValueEnabled == false) {
        return false;
    }

    this.Slider.SetValue(value);
    document.getElementById(this.WidgetID+"_value").innerHTML = value;
    this.SelectedValue = value;

    return true;
}

CoreUIBasicSliderWidget.prototype.OnChangeCallback = function (value) {
    this.Info.onchange_callback(value);
    document.getElementById(this.WidgetID+"_value").innerHTML = value;
    this.SelectedValue = value;
}

CoreUIBasicSliderWidget.prototype.OnInputCallback = function (value) {
    this.Info.oninput_callback(value);
    document.getElementById(this.WidgetID+"_value").innerHTML = value;
    this.SelectedValue = value;
}

CoreUIBasicSliderWidget.prototype.OnMouseDownCallback = function () {
    this.UpdateValueEnabled = false;
    this.Info.onmousedown_callback();
}

CoreUIBasicSliderWidget.prototype.OnMouseUpCallback = function () {
    this.UpdateValueEnabled = true;
    this.Info.onmouseup_callback(this.Scope.Object, this.SelectedValue);
}