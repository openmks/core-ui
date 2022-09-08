function CoreUIButton (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_button";
    this.Content    = `<button type="button" id="[ID]_content" onclick="[ONCLICK_CALLBACK](this, '[ID]_content');" class="btn btn-secondary btn-sm">[TEXT]</button>`;

    this.Status     = params.status;
    this.OnClick    = params.onclick_callback;
    this.Text       = params.text;

	return this;
}

CoreUIButton.prototype              = Object.create(CoreUIObject.prototype);
CoreUIButton.prototype.constructor  = CoreUIButton;

CoreUIButton.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[ONCLICK_CALLBACK]").join(this.OnClick);
    this.HTML = this.HTML.split("[TEXT]").join(this.Text);
}

CoreUIButton.prototype.PostBuild = function (params) {

}

CoreUIButton.prototype.SetText = function (text) {
    this.Text = text;
    document.getElementById(this.WidgetID+"_content").innerHTML = text;
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