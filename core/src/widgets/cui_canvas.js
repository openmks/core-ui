function CoreUICanvas (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_basic_canvas";
    this.Content    = `
        <div style="position: relative; width: [WIDTH]px; height: [HEIGHT]px; border: 3px solid #73AD21;" id="[ID]"></div>
    `;
    this.Params = params;
    this.Counter = 1;

	return this;
}

CoreUICanvas.prototype              = Object.create(CoreUIObject.prototype);
CoreUICanvas.prototype.constructor  = CoreUICanvas;

CoreUICanvas.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[WIDTH]").join(this.Params.width);
    this.HTML = this.HTML.split("[HEIGHT]").join(this.Params.height);
}

CoreUICanvas.prototype.AppendObject = function (obj) {
    var id = this.WidgetID + "_canvas_item_" + this.Counter;
    var envelope = `<div id="`+id+`"></div>`;
    document.getElementById(this.WidgetID).innerHTML += envelope;
    obj.Build(id);
    this.Counter += 1;
}
