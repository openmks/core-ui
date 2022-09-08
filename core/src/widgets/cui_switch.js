function CoreUISwitch (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_basic_switch";
    this.Content    = `
        <div class="custom-control custom-switch">
            <input type="checkbox" id="[ID]_switch" onclick="[ONCLICK_CALLBACK](this, '[ID]_switch', '[NAME]');" [STATE] class="custom-control-input">
            <label class="custom-control-label" for="[ID]_switch"></label>
        </div>
    `;
    this.Status     = false
    this.Params     = params

	return this;
}

CoreUISwitch.prototype              = Object.create(CoreUIObject.prototype);
CoreUISwitch.prototype.constructor  = CoreUISwitch;

CoreUISwitch.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[NAME]").join(this.Params.name);
    this.HTML = this.HTML.split("[STATE]").join(this.Params.state);
    this.HTML = this.HTML.split("[ONCLICK_CALLBACK]").join(this.Params.onclick_callback);
}

CoreUISwitch.prototype.GetValue = function () {
    return document.getElementById(this.WidgetID + "_switch").checked;
}

CoreUISwitch.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID + "_switch").checked = value;
    this.Status = value;
}

