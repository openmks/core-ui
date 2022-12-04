function CoreUIWritingTitle (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_title";
    this.Content    = `
        <br>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
            <div><span style="font-size: x-large;font-weight: bold;margin-left: 5px;color: darkcyan;">[TITLE]</span></div>
                <div>
                    <div style="display: inline-block" id="[ID]_object_list_1"></div>
                    <div style="display: inline-block" id="[ID]_object_list_2"></div>
                    <div style="display: inline-block" id="[ID]_object_list_3"></div>
                    <div style="display: inline-block" id="[ID]_object_list_4"></div>
                    <div style="display: inline-block" id="[ID]_object_list_5"></div>
                </div>
            </div>
            <div id="[ID]_hr">
        </div>
    `;

    this.Params     = params;
    this.MaxObjects = 5;

	return this;
}

CoreUIWritingTitle.prototype              = Object.create(CoreUIObject.prototype);
CoreUIWritingTitle.prototype.constructor  = CoreUIWritingTitle;

CoreUIWritingTitle.prototype.PreBuild = function () {
    this.HTML = this.HTML.split("[TITLE]").join(this.Params.title);
}

CoreUIWritingTitle.prototype.PostBuild = function () {
    this.SetUnderLine(this.Params.underline);
}

CoreUIWritingTitle.prototype.SetUnderLine = function (state) {
    var html = "";
    if (state == true) {
        html = "<hr>";
    }
    document.getElementById(this.WidgetID+"_hr").innerHTML = html;
}

CoreUIWritingTitle.prototype.AppendObject = function (idx, obj) {
    if (obj === undefined || obj === null || idx > this.MaxObjects) {
        return false;
    }
    obj.Build(this.WidgetID+"_object_list_"+idx);
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

CoreUIWritingLabel.prototype.PreBuild = function () {
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
