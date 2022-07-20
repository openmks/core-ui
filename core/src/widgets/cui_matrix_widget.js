function CoreUIMatrixWidget (scope) {
	self = this;

    this.Scope          = scope;
    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = "";
    this.X              = 0;
    this.Y              = 0;

    if (scope.Object.hasOwnProperty("CoreUIWidgets") == false) {   
		scope.Object.CoreUIWidgets = {};
	}
    this.MyPath = this.Scope.Path+`.CoreUIWidgets.[ID]`;

	return this;
}

CoreUIMatrixWidget.prototype.Build = function (id, x, y) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_matrix";
    var html            = this.Content;

    this.Scope.Object.CoreUIWidgets[id] = this;
    this.MyPath = this.MyPath.split("[ID]").join(id);

    this.X = x;
    this.Y = y;

    html = `<table style="width: 100%"><tbody style="width: 100%">`;
    for (var idy = 0; idy < y; idy++) {
        html += `<tr id="`+this.WidgetID+`_row_`+(idy+1)+`" style="width: 100%">`
        for (var idx = 0; idx < x; idx++) {
            html += `<td id="`+this.WidgetID+`_`+(idy+1)+`_`+(idx+1)+`" style="width: `+100.0 / parseFloat(this.X)+`%"></td>`
        }
        html += `</tr>`;
    }
    html += `</tbody></table>`;
    
    // Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIMatrixWidget.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIMatrixWidget.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIMatrixWidget.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIMatrixWidget.prototype.SetValue = function (x, y, data) {
    var id = this.WidgetID+"_"+y+"_"+x;
    var obj = document.getElementById(id);

    if (obj !== undefined || obj !== null) {
        obj.innerHTML = data;
    } else {
        console.log("CoreUIMatrixWidget [SetValue] Cannot find object.");
    }
}

CoreUIMatrixWidget.prototype.GetCellId = function (x, y) {
    return this.WidgetID+"_"+y+"_"+x;
}

CoreUIMatrixWidget.prototype.GetRowId = function (y) {
    return this.WidgetID+`_row_`+y;
}

CoreUIMatrixWidget.prototype.AppendRow = function () {
    this.Y += 1;
    html = `<tr id="`+this.WidgetID+`_row_`+this.Y+`">`
    for (var idx = 0; idx < this.X; idx++) {
        html += `<td id="`+this.WidgetID+`_`+this.Y+`_`+(idx+1)+`"></td>`
    }
    html += `</tr>`;
    // Set HTML
    this.WorkingObject.innerHTML += html;
}