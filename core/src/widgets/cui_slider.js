function CoreUISlider (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_slider";
    this.Content    = `<input type="range" class="custom-range" min="[MIN]" max="[MAX]" step="[STEP]" id="[ID]" [ONMOUSEDOWN_CALLBACK] [ONMOUSEUP_CALLBACK] [ONINPUT_CALLBACK] [ONCHANGE_CALLBACK]>`;
    this.Info       = params;

	return this;
}

CoreUISlider.prototype              = Object.create(CoreUIObject.prototype);
CoreUISlider.prototype.constructor  = CoreUISlider;

CoreUISlider.prototype.PreBuild = function (params) {
    // Update content with user info
    this.HTML = this.HTML.split("[MIN]").join(this.Info.min);
    this.HTML = this.HTML.split("[MAX]").join(this.Info.max);
    this.HTML = this.HTML.split("[STEP]").join(this.Info.step);
    this.HTML = this.HTML.split("[ID]").join(this.WidgetID);

    this.HTML = this.HTML.split("[ONINPUT_CALLBACK]").join((this.Info.oninput_callback === undefined || this.Info.oninput_callback === null) ? "": `oninput=`+this.Info.oninput_callback+`(this.value);`);
    this.HTML = this.HTML.split("[ONCHANGE_CALLBACK]").join((this.Info.onchange_callback === undefined || this.Info.onchange_callback === null) ? "": `onchange=`+this.Info.onchange_callback+`(this.value);`);
    this.HTML = this.HTML.split("[ONMOUSEDOWN_CALLBACK]").join((this.Info.onmousedown_callback === undefined || this.Info.onmousedown_callback === null) ? "": `onmousedown=`+this.Info.onmousedown_callback+`(this.value);`);
    this.HTML = this.HTML.split("[ONMOUSEUP_CALLBACK]").join((this.Info.onmouseup_callback === undefined || this.Info.onmouseup_callback === null) ? "": `onmouseup=`+this.Info.onmouseup_callback+`(this.value);`);
}

CoreUISlider.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID).value = value;
}

