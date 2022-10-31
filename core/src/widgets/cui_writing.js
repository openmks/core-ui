function CoreUIWritingTitle (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_title";
    this.Content    = `<br><span style="font-size: x-large;font-weight: bold;margin-left: 5px;color: darkcyan;">[TITLE]</span><hr>`;
    this.Title      = params.title;

	return this;
}

CoreUIWritingTitle.prototype              = Object.create(CoreUIObject.prototype);
CoreUIWritingTitle.prototype.constructor  = CoreUIWritingTitle;

CoreUIWritingTitle.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[TITLE]").join(this.Title);
}

function CoreUIWritingLabel (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_label";
    this.Content    = `<span id="[ID]" style="font-family:[FAMILY]; font-size: [SIZE];">[TEXT]</span>`;
    this.Params      = params;

	return this;
}

CoreUIWritingLabel.prototype              = Object.create(CoreUIObject.prototype);
CoreUIWritingLabel.prototype.constructor  = CoreUIWritingLabel;

CoreUIWritingLabel.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[TEXT]").join(this.Params.text);
    this.HTML = this.HTML.split("[FAMILY]").join((this.Params.font === undefined || this.Params.font === null) ? "ariel" : this.Params.font);
    this.HTML = this.HTML.split("[SIZE]").join((this.Params.size === undefined || this.Params.size === null) ? "small" : this.Params.size+"px");
}

CoreUIWritingLabel.prototype.SetFont = function (text) {
    document.getElementById(this.WidgetID).style.fontfamily = text;
}


CoreUIWritingLabel.prototype.SetText = function (text) {
    document.getElementById(this.WidgetID).innerHTML = text;
}
