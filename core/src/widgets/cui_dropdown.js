function CoreUIDropDown (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_dropdown";
    this.Content    = `
        <div id="[ID]" class="custom-radio xmt-3">
            <select class="custom-select" style="vertical-align: middle;" id="[ID]_items" onchange="[ONCHANGE_HANDLER](this, this.selectedIndex, this.options[this.selectedIndex].text, this.options[this.selectedIndex].value);">
            </select>
        </div>
    `;
    this.RowView    = `<option value="[VALUE]" id="[ID]_item_[NAME]">[NAME]</option>`;
    this.Params     = params;
	
	return this;
}

CoreUIDropDown.prototype              = Object.create(CoreUIObject.prototype);
CoreUIDropDown.prototype.constructor  = CoreUIDropDown;

CoreUIDropDown.prototype.PreBuild = function () {
    this.HTML = this.HTML.split("[ONCHANGE_HANDLER]").join(this.Params.onchange);
}

CoreUIDropDown.prototype.UpdateSelected = function (name) {
    var obj = document.getElementById(this.WidgetID+"_item_"+name);
    obj.selected = true;
}

CoreUIDropDown.prototype.AppendItem = function (item) {
    var obj = document.getElementById(this.WidgetID + "_items");
    var html = this.RowView;
    
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