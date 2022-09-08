function CoreUITextBox (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName = "core_ui_textbox";
    this.Content    = `<input type="text" id="[ID]_content" class="form-control [SIZE]" onkeyup="return [ONKEYUP_CALLBACK](event);">`;
    this.Size       = params.size;
    this.OnKeyUp    = params.onkeyup;

	return this;
}

CoreUITextBox.prototype              = Object.create(CoreUIObject.prototype);
CoreUITextBox.prototype.constructor  = CoreUITextBox;

CoreUITextBox.prototype.PreBuild = function (params) {
    var size = "form-control";
    switch(this.Size) {
        case "sm":
            size = "form-control-sm";
            break;
        case "lg":
            size = "form-control-lg";
            break;
    }
    this.HTML = this.HTML.split("[SIZE]").join(size);
    this.HTML = this.HTML.split("[ONKEYUP_CALLBACK]").join(this.OnKeyUp);
}

CoreUITextBox.prototype.PostBuild = function (params) {

}

CoreUITextBox.prototype.Set = function (text) {
    document.getElementById(this.WidgetID+"_content").value = text;
}

CoreUITextBox.prototype.Get = function () {
    return document.getElementById(this.WidgetID+"_content").value;
}

CoreUITextBox.prototype.SetSize = function (size) {
    var size_s = "form-control";
    switch(size) {
        case "sm":
            size_s = "form-control-sm";
            break;
        case "lg":
            size_s = "form-control-lg";
            break;
    }

    document.getElementById(this.WidgetID).classList.remove("form-control");
    document.getElementById(this.WidgetID).classList.remove("form-control-sm");
    document.getElementById(this.WidgetID).classList.remove("form-control-lg");
    document.getElementById(this.WidgetID).classList.add(size_s);
}