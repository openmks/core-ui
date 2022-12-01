function CoreUIButton (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_button";
    this.Content    = `<button type="button" id="[ID]" onclick="[ONCLICK_CALLBACK](this, '[ID]');" class="btn btn-secondary btn-sm">[TEXT]</button>`;

    this.Params     = params;
    this.Status     = params.status;
    this.OnClick    = params.onclick_callback;
    this.Text       = params.text;

	return this;
}

CoreUIButton.prototype              = Object.create(CoreUIObject.prototype);
CoreUIButton.prototype.constructor  = CoreUIButton;

CoreUIButton.prototype.PreBuild = function () {
    this.HTML = this.HTML.split("[ONCLICK_CALLBACK]").join(this.OnClick);
    this.HTML = this.HTML.split("[TEXT]").join(this.Text);
}

CoreUIButton.prototype.PostBuild = function () {

}

CoreUIButton.prototype.SetText = function (text) {
    this.Text = text;
    document.getElementById(this.WidgetID).innerHTML = text;
}

CoreUIButton.prototype.GetText = function () {
    return this.Text;
}

CoreUIButton.prototype.SetStatus = function (status) {
    this.Status = status;
}

CoreUIButton.prototype.GetStatus = function () {
    return this.Status;
}

CoreUIButton.prototype.EnableBackground = function (status) {
    document.getElementById(this.WidgetID).classList.remove((status == true) ? "btn-outline-secondary":"btn-secondary");
    document.getElementById(this.WidgetID).classList.add((status == true) ? "btn-secondary":"btn-outline-secondary");
}
