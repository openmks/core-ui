function ViewSelector (canvas_id) {
	self = this;

    this.CanavasId   = canvas_id;
    this.Views       = {};
    this.CurrentView = null;

	return this;
}

ViewSelector.prototype.AppendView = function(view_name, view) {
    this.Views[view_name] = view;
}

ViewSelector.prototype.Switch = function(view_name, callback) {
    if (this.Views.hasOwnProperty(view_name) == false) {
        return;
    }

    var self = this;
    this.Views[view_name].Clean();
    this.Views[view_name].Build(null, function(scope) {
        self.CurrentView = view_name;
        callback(scope);
    });
}