function CoreUIMatrix () {
	self = this;

    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = "";
	this.Slider         = null;
    this.Devider        = 0;
    this.X              = 0;
    this.Y              = 0;

	return this;
}

CoreUIMatrix.prototype.Build = function (id, x, y) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"_core_ui_matrix";
    var html            = this.Content;

    this.X = x;
    this.Y = y;
    this.Devider = 12 / x;
    for (var idy = 0; idy < y; idy++) {
        html += `<div class="row" id="`+this.WidgetID+`_row_`+(idy+1)+`">`
        for (var idx = 0; idx < x; idx++) {
            html += `<div class="col-xl-`+this.Devider+`" id="`+this.WidgetID+`_`+(idy+1)+`_`+(idx+1)+`"></div>`
        }
        html += `</div>`;
    }
    
    // Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIMatrix.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIMatrix.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIMatrix.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
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

CoreUIMatrix.prototype.GetCellId = function (x, y) {
    return this.WidgetID+"_"+y+"_"+x;
}

CoreUIMatrix.prototype.GetRowId = function (y) {
    return this.WidgetID+`_row_`+y;
}

CoreUIMatrix.prototype.AppendRow = function () {
    this.Y += 1;
    html = `<div class="row" id="`+this.WidgetID+`_row_`+this.Y+`">`
    for (var idx = 0; idx < this.X; idx++) {
        html += `<div class="col-xl-`+this.Devider+`" id="`+this.WidgetID+`_`+this.Y+`_`+(idx+1)+`"></div>`
    }
    html += `</div>`;
    // Set HTML
    this.WorkingObject.innerHTML += html;
}