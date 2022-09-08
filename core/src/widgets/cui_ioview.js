function CoreUIIOBoxView (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_basic_io_box_view";
    this.Content    = `
        <div class="card mb-4 shadow-sm" style="margin:5px;">
            <div class="card-header" style="text-align: center">
                <span id="[ID]_name" style="color: #2A7D8D; font-size: small; text-align: center">[NAME]</span>
            </div>
            <span id="[ID]_value" style="margin:5px; text-align: center">[VALUE] [UNIT]</span></strong>
        </div>
    `;
    this.Name = params.name;
    this.Value = params.value;
    this.Unit = params.unit;

	return this;
}

CoreUIIOBoxView.prototype              = Object.create(CoreUIObject.prototype);
CoreUIIOBoxView.prototype.constructor  = CoreUIIOBoxView;

CoreUIIOBoxView.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[NAME]").join(this.Name);
    this.HTML = this.HTML.split("[VALUE]").join(this.Value);
    this.HTML = this.HTML.split("[UNIT]").join(this.Unit);
}

CoreUIIOBoxView.prototype.GetValueID = function () {
    return this.WidgetID + "_value";
}

CoreUIIOBoxView.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID + "_value").innerHTML = value + " " + this.Unit;
}

