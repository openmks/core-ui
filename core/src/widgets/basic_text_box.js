function CoreUIBasicTextBox () {
	self = this;

    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = `
        <div style="text-align: center;">
            <input class="form-control shadow" type="text" id="[ID]_textbox" onkeyup="[ONKEYUP_CALLBACK](event);" />
        </div>
    `;

	return this;
}

CoreUIBasicTextBox.prototype.Build = function (id, info) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_basic_text_box";
    var html            = this.Content;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[ONKEYUP_CALLBACK]").join(info.onkeyup_callback);
    // Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIBasicTextBox.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicTextBox.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicTextBox.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicTextBox.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIBasicTextBox.prototype.GetText = function () {
    return document.getElementById(this.WidgetID + "_textbox").value;;
}

CoreUIBasicTextBox.prototype.SetText = function (value) {
    document.getElementById(this.WidgetID + "_textbox").value = value;
}
