function CoreUICheckBox (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_checkbox";
    this.Content    = `
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" onclick="[ONCLICK_CALLBACK](this, '[ID]');" id="[ID]">
            <label class="custom-control-label" id="[ID]_text" for="[ID]">[TEXT]</label>
        </div>
    `;

    this.Params     = params;
    this.Status     = params.status;
    this.OnClick    = params.onclick_callback;
    this.Text       = params.text;

	return this;
}

CoreUICheckBox.prototype              = Object.create(CoreUIObject.prototype);
CoreUICheckBox.prototype.constructor  = CoreUICheckBox;

CoreUICheckBox.prototype.PreBuild = function () {
    this.HTML = this.HTML.split("[ONCLICK_CALLBACK]").join(this.OnClick);
    this.HTML = this.HTML.split("[TEXT]").join(this.Text);
}

CoreUICheckBox.prototype.PostBuild = function () {

}

CoreUICheckBox.prototype.SetText = function (text) {
    this.Text = text;
    document.getElementById(this.WidgetID+"_text").innerHTML = text;
}

CoreUICheckBox.prototype.GetText = function () {
    return this.Text;
}

CoreUICheckBox.prototype.SetStatus = function (status) {
    this.Status = status;
    document.getElementById(this.WidgetID).checked = status;
}

CoreUICheckBox.prototype.GetStatus = function () {
    return this.Status;
}
