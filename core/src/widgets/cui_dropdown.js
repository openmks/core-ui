function CoreUIDropDown (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_dropdown";
    this.Content    = `
        <div class="custom-control custom-radio xmt-3">
            <select class="custom-select mt-3" id="[ID]_items" onchange="[ONCHANGE_HANDLER](this, this.selectedIndex, this.options[this.selectedIndex].text, this.options[this.selectedIndex].value);">
            </select>
        </div>
    `;
    this.RowView    = `<option value="[VALUE]" id="[ID]_item_[NAME]">[NAME]</option>`;
    this.OnChange   = null;
	
	return this;
}

CoreUIDropDown.prototype              = Object.create(CoreUIObject.prototype);
CoreUIDropDown.prototype.constructor  = CoreUIDropDown;

CoreUIDropDown.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[ONCHANGE_HANDLER]").join(this.OnChange);
}

CoreUIDropDown.prototype.UpdateSelected = function (name) {
    var obj = document.getElementById(this.WidgetID+"_item_"+name);
    obj.selected = true;
}

CoreUIDropDown.prototype.AppendItem = function (item) {
    var obj = document.getElementById(this.WidgetID + "_items");
    var html = this.RowView;
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[NAME]").join(item.name);
    html = html.split("[VALUE]").join(item.value);
    obj.innerHTML += html;
}

CoreUIDropDown.prototype.GetSelected = function() {
    var select = document.getElementById(this.WidgetID + "_items")
    return {
        value: select.value,
        name: select.options[select.selectedIndex].text
    }
}