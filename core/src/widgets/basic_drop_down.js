function CoreUIBasicDropDown () {
	self = this;

    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = `
        <div class="custom-control custom-radio xmt-3">
            <select class="custom-select mt-3" id="[ID]_items" onchange="[ONCHANGE_HANDLER](this);">
            </select>
        </div>
    `;
    this.RowView = `<option value="[VALUE]" id="[ID]_item_[NAME]" onclick="[ONCLICK_HANDLER](this);">[NAME]</option>`;
    /*
    this.Content        = `
        <button class="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" id="[ID]_content" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span data-feather="calendar"></span>
            <span id="[ID]_name"></span>
        </button>
        <div class="dropdown-menu text-center" aria-labelledby="[ID]_content" id="[ID]_items"></div>
    `;
    this.RowView = `<span class="dropdown-item" style="cursor:pointer" onclick="[ONCLICK_HANDLER]">[NAME]</span>`;
    */
   this.OnChange = null;
	
	return this;
}

CoreUIBasicDropDown.prototype.Build = function (id) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_basic_drop_down";
    var html            = this.Content;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[ONCHANGE_HANDLER]").join(this.OnChange);
    // Set HTML
    this.WorkingObject.innerHTML = html;
    feather.replace();
}

CoreUIBasicDropDown.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicDropDown.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicDropDown.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicDropDown.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIBasicDropDown.prototype.UpdateSelected = function (name) {
    var obj = document.getElementById(this.WidgetID+"_item_"+name);
    obj.selected = true;
}

CoreUIBasicDropDown.prototype.AppendItem = function (item) {
    var obj = document.getElementById(this.WidgetID + "_items");
    var html = this.RowView;
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[ONCLICK_HANDLER]").join(item.onclick);
    html = html.split("[NAME]").join(item.name);
    html = html.split("[VALUE]").join(item.value);
    obj.innerHTML += html;
}

CoreUIBasicDropDown.prototype.GetSelected = function() {
    var select = document.getElementById(this.WidgetID + "_items")
    return {
        value: select.value,
        name: select.options[select.selectedIndex].text
    }
}