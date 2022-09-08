function CoreUIMatrixWidget (scope, params) {
    CoreUIObjectWidget.call(this, scope, params);
	self = this;

    this.ObjectName = "core_ui_matrix_widget";
    this.Content = `<div id="[ID]_core_ui_matrix"></div>`;
    this.X = params.x;
    this.Y = params.y;
    this.Matrix = null;

	return this;
}

CoreUIMatrixWidget.prototype              = Object.create(CoreUIObjectWidget.prototype);
CoreUIMatrixWidget.prototype.constructor  = CoreUIMatrixWidget;

CoreUIMatrixWidget.prototype.PreBuild = function (params) {
    
}

CoreUIMatrixWidget.prototype.PostBuild = function (params) {
    this.Matrix = new CoreUIMatrix({
        x: this.X,
        y: this.Y
    });
    this.Matrix.Build(this.WidgetID+"_core_ui_matrix");
}

CoreUIMatrixWidget.prototype.SetValue = function (x, y, data) {
    this.Matrix.SetValue(x, y, data);
}

CoreUIMatrixWidget.prototype.GetValue = function (x, y) {
    return this.Matrix.GetValue(x, y);
}

CoreUIMatrixWidget.prototype.GetCellId = function (x, y) {
    return this.Matrix.GetCellId(x, y);
}

CoreUIMatrixWidget.prototype.GetRowId = function (y) {
    return this.Matrix.GetRowId(y);
}
