function CoreUISwitchWidget (scope, params) {
    CoreUIObjectWidget.call(this, scope, params);
	self = this;

    this.ObjectName = "switch_widget";
    this.Content        = `
                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between bg-light">
                        <div>
                            <h6 class="my-0" style="color: #2A7D8D; cursor: pointer;">[NAME]</h6>
                            <small class="text-muted">[DESCRIPTION]</small>
                        </div>
                        <div id="[ID]_basic_switch_button"></div>
                    </li>
                </ul>
    `;
    this.SwitchButton   = null;
    this.Info           = null;
    this.SelectedValue  = null;

    if (scope.Object.hasOwnProperty("CoreUIWidgets") == false) {   
		scope.Object.CoreUIWidgets = {};
	}
    this.MyPath = this.Scope.Path+`.CoreUIWidgets.[ID]`;

	return this;
}

CoreUISwitchWidget.prototype              = Object.create(CoreUIObjectWidget.prototype);
CoreUISwitchWidget.prototype.constructor  = CoreUISwitchWidget;

CoreUISwitchWidget.prototype.Build = function (id, info) {
    this.WorkingObject  = document.getElementById(id);
    this.WidgetID       = id+"switch_button_widget";
    var html            = this.Content;

    this.Scope.Object.CoreUIWidgets[id] = this;
    this.MyPath = this.MyPath.split("[ID]").join(id);
    this.Info = info;

    // Update content with user info
    html = html.split("[ID]").join(this.WidgetID);
    html = html.split("[NAME]").join(info.name);
    html = html.split("[DESCRIPTION]").join(info.description);
    // Set HTML
    this.WorkingObject.innerHTML = html;
    // Build basic switch button
    this.SwitchButton = new CoreUIBasicSwitchButton();
    this.SwitchButton.Build(this.WidgetID+"_basic_switch_button", {
        name: info.name,
        state: (info.state) ? "checked": "",
        onclick_callback: this.MyPath+".OnClickCallback"
    });
}

CoreUISwitchWidget.prototype.PostBuild = function (params) {
    this.SwitchButton = new CoreUISwitch({
        name: info.name,
        state: (info.state) ? "checked": "",
        onclick_callback: this.MyPath+".OnClickCallback"
    });
    this.SwitchButton.Build(this.WidgetID+"_basic_switch_button");
}

CoreUISwitchWidget.prototype.GetValue = function () {
    return this.SwitchButton.GetValue();
}

CoreUISwitchWidget.prototype.SetValue = function (value) {
    this.SwitchButton.SetValue(value);
}

CoreUISwitchWidget.prototype.OnClickCallback = function(obj, id, name) {
    this.Info.onclick_callback(this.Scope.Object, obj, id, name);
}