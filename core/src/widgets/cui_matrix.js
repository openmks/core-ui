function CoreUIMatrix (params) {
    CoreUIObject.call(this, params);
	self = this;
 
    this.ObjectName     = "core_ui_matrix";
    this.Devider        = 0;

    this.X              = (params.x === null || params.x === undefined) ? 0 : params.x;
    this.Y              = (params.y === null || params.y === undefined) ? 0 : params.y;
    this.WidthCells     = (params.width_cells === null || params.width_cells === undefined) ? null : params.width_cells;
    this.BorderColor    = (params.border_color === null || params.border_color === undefined) ? "" : params.border_color;

	return this;
}

CoreUIMatrix.prototype              = Object.create(CoreUIObject.prototype);
CoreUIMatrix.prototype.constructor  = CoreUIMatrix;

CoreUIMatrix.prototype.PreBuild = function () {
    this.HTML = `<table style="width: 100%"><tbody style="width: 100%">`;
    for (var idy = 0; idy < this.Y; idy++) {
        this.HTML += `<tr id="`+this.WidgetID+`_row_`+(idy+1)+`" style="width: 100%">`;
        var border = (this.BorderColor == "") ? "" : `border: 1px solid `+this.BorderColor+`;`;
        for (var idx = 0; idx < this.X; idx++) {
            if (this.WidthCells !== null && parseInt(this.X) == this.WidthCells.length) {
                this.HTML += `<td id="`+this.WidgetID+`_`+(idy+1)+`_`+(idx+1)+`" style="width: `+this.WidthCells[idx]+`%;`+border+`"></td>`;
            } else {
                this.HTML += `<td id="`+this.WidgetID+`_`+(idy+1)+`_`+(idx+1)+`" style="width: `+100.0 / parseFloat(this.X)+`%;`+border+`"></td>`;
            }
        }
        this.HTML += `</tr>`;
    }
    this.HTML += `</tbody></table>`;
}

CoreUIMatrix.prototype.PostBuild = function () {

}

CoreUIMatrix.prototype.SetValue = function (x, y, data) {
    var id = this.WidgetID+"_"+y+"_"+x;
    var obj = document.getElementById(id);

    if (obj !== undefined || obj !== null) {
        obj.innerHTML = data;
    } else {
        console.log("CoreUIMatrix [SetValue] Cannot find object.");
    }
}

CoreUIMatrix.prototype.GetValue = function (x, y) {
    var id = this.WidgetID+"_"+y+"_"+x;
    var obj = document.getElementById(id);

    if (obj !== undefined || obj !== null) {
        return obj.innerHTML;
    } else {
        console.log("CoreUIMatrix [GetValue] Cannot find object.");
    }
}

CoreUIMatrix.prototype.GetCellId = function (x, y) {
    return this.WidgetID+"_"+y+"_"+x;
}

CoreUIMatrix.prototype.GetRowId = function (y) {
    return this.WidgetID+`_row_`+y;
}
