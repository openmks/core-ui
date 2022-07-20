function CoreUIBasicIOView () {
	self = this;

    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = `
        <div class="card mb-4 shadow-sm" style="margin:5px;">
            <div class="card-header" style="text-align: center">
                <span id="[ID]_name" style="color: #2A7D8D; font-size: small; text-align: center">[NAME]</span>
            </div>
            <span id="[ID]_value" style="margin:5px; text-align: center">[VALUE]</span></strong>
        </div>
    `;

	return this;
}

CoreUIBasicIOView.prototype.Build = function (id, name, value) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_basic_io_view";
    var html            = this.Content;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[NAME]").join(name);
    html = html.split("[VALUE]").join(value);
    // Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIBasicIOView.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicIOView.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicIOView.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicIOView.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIBasicIOView.prototype.GetValueID = function () {
    return this.WidgetID + "_value";
}

CoreUIBasicIOView.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID + "_value").innerHTML = value;
}

