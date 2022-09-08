function CoreUIBox (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_box";
    this.Content    = `<div id="[ID]_content" style="width:100%;height:100%"></div>`;
    this.Data       = null;

	return this;
}

CoreUIBox.prototype              = Object.create(CoreUIObject.prototype);
CoreUIBox.prototype.constructor  = CoreUIBox;

CoreUIBox.prototype.Set = function (data) {
    this.Data = data;
}

CoreUIBox.prototype.Get = function () {
    return this.Data;
}

CoreUIBox.prototype.SetWidth = function (width) {
    
}

CoreUIBox.prototype.SetHeight = function (width) {
    
}