function CoreUIImage (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_image";
    this.Content = `
        <img src="[SRC]" id="[ID]" style="width: [WIDTH]px; height: [HEIGHT]px;" />
    `;
    this.Params = params;

	return this;
}

CoreUIImage.prototype              = Object.create(CoreUIObject.prototype);
CoreUIImage.prototype.constructor  = CoreUIImage;

CoreUIImage.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[WIDTH]").join(this.Params.width);
    this.HTML = this.HTML.split("[HEIGHT]").join(this.Params.height);
    this.HTML = this.HTML.split("[SRC]").join(this.Params.src);
}

CoreUIImage.prototype.PostBuild = function (params) {
    
}

function CoreUIIcon (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_icon";
    this.Content = `
        <span class="icon_view_hover" id="[ID]" style="width: [WIDTH]px; height: [HEIGHT]px;" data-feather="[ICON]" onclick="[ONCLICK]();"></span>
    `;
    this.Params = params;

	return this;
}

CoreUIIcon.prototype              = Object.create(CoreUIObject.prototype);
CoreUIIcon.prototype.constructor  = CoreUIIcon;

CoreUIIcon.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[WIDTH]").join(this.Params.width);
    this.HTML = this.HTML.split("[HEIGHT]").join(this.Params.height);
    this.HTML = this.HTML.split("[ICON]").join(this.Params.name);
    this.HTML = this.HTML.split("[ONCLICK]").join(this.Params.onclick);
}

CoreUIIcon.prototype.PostBuild = function (params) {
    feather.replace();
}
