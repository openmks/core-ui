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
                </div>
            </div>
            <div id="[ID]_hr">
        </div>
    `;
    /*
    this.Content    = `
        <br>
        <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div><span style="font-size: x-large;font-weight: bold;margin-left: 5px;color: darkcyan;">[TITLE]</span></div>
                <div>
                    <table>
                        <tr>
                            <td style="vertical-align: middle;" id="[ID]_object_list_1"></td>
                            <td style="vertical-align: middle;" id="[ID]_object_list_2"></td>
                            <td style="vertical-align: middle;" id="[ID]_object_list_3"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="[ID]_hr">
        </div>
    `;
    this.Content = `
        <br>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
            <span style="font-size: x-large;font-weight: bold;margin-left: 5px;color: darkcyan;">[TITLE]</span>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <button class="btn btn-sm btn-outline-secondary">Share</button>
                    <button class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar"></span>
                    This week
                </button>
            </div>
        </div>
        <div id="[ID]_hr"></div>
    `;*/
    this.Params     = params;

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
    if (obj === undefined || obj === null) {
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
