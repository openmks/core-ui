function CoreUIIOBoxView (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_basic_io_box_view";
    this.Content    = `
        <div class="card mb-4 shadow-sm" style="margin:5px;" id="[ID]">
            <div class="card-header" style="text-align: center">
                <span id="[ID]_name" style="color: #2A7D8D; font-size: small; text-align: center">[NAME]</span>
            </div>
            <span id="[ID]_value" style="margin:5px; text-align: center">[VALUE] [UNIT]</span></strong>
        </div>
    `;
    this.Params = params;

    if (params.design !== undefined) {
        switch (params.design) {
            case "box_1":
                this.Content = `
                    <div class="card mb-4 shadow-sm" style="margin:5px; id="[ID]"">
                        <div class="card-header" style="text-align: center">
                            <span id="[ID]_name" style="color: #2A7D8D; font-size: small; text-align: center">[NAME]</span>
                        </div>
                        <span id="[ID]_value" style="margin:5px; text-align: center">[VALUE] [UNIT]</span></strong>
                    </div>
                `;
                break;
            case "box_2":
                this.Content = `
                    <ul class="list-group mb-3" id="[ID]">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0" id="[ID]_name">[NAME]</h6>
                                <small id="[ID]_additional" class="text-muted">[ADDITIONAL]</small>
                            </div>
                            <span class="text-muted" id="[ID]_value">[VALUE] [UNIT]</span>
                        </li>
                    </ul>
                `;
                break;
        }
    }

	return this;
}

CoreUIIOBoxView.prototype              = Object.create(CoreUIObject.prototype);
CoreUIIOBoxView.prototype.constructor  = CoreUIIOBoxView;

CoreUIIOBoxView.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[NAME]").join(this.Params.name);
    this.HTML = this.HTML.split("[VALUE]").join(this.Params.value);
    this.HTML = this.HTML.split("[UNIT]").join(this.Params.unit);

    if (this.Params.additional === undefined) {
        this.HTML = this.HTML.split("[ADDITIONAL]").join("");
    } else {
        this.HTML = this.HTML.split("[ADDITIONAL]").join(this.Params.additional);
    }
}

CoreUIIOBoxView.prototype.GetValueID = function () {
    return this.WidgetID + "_value";
}

CoreUIIOBoxView.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID + "_value").innerHTML = value + " " + this.Params.unit;
}

CoreUIIOBoxView.prototype.SetAdditional = function (value) {
    document.getElementById(this.WidgetID + "_additional").innerHTML = value;
}
