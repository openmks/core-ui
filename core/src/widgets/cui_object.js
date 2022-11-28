function CoreUIObject(params) {
    self = this;

    this.Params         = params;
    this.ObjectName     = ``;
    this.WorkingObject  = null;
    this.WidgetID       = null;
    this.Content        = ``;
    this.HTML           = ``;

    return this;
}

CoreUIObject.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIObject.prototype.Show = function () {
    var obj = document.getElementById(this.WidgetID);
    if (obj !== undefined && obj !== null) {
        document.getElementById(this.WidgetID).classList.remove("d-none");
    }
}

CoreUIObject.prototype.Hide = function () {
    var obj = document.getElementById(this.WidgetID);
    if (obj !== undefined && obj !== null) {
        document.getElementById(this.WidgetID).classList.add("d-none");
    }
}

CoreUIObject.prototype.Clean = function () {
}

CoreUIObject.prototype.GetHtml = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIObject.prototype.SetHtml = function (html) {
    this.WorkingObject.innerHTML = html;
}

CoreUIObject.prototype.PreBuild = function(params) {
}

CoreUIObject.prototype.PostBuild = function(params) {
}

CoreUIObject.prototype.SetViewType = function(type) {
    document.getElementById(this.WidgetID+`_envelop`).style.position = type;
}

CoreUIObject.prototype.SetCoordinates = function(x , y) {
    document.getElementById(this.WidgetID+`_envelop`).style.position = "absolute";
    document.getElementById(this.WidgetID+`_envelop`).style.bottom = y+"px";
    document.getElementById(this.WidgetID+`_envelop`).style.left = x+"px";
}

CoreUIObject.prototype.SetSize = function(width, height) {
    if (width !== undefined && width !== null) {
        document.getElementById(this.WidgetID).style.width = width+"px";
    }

    if (height !== undefined && height !== null) {
        document.getElementById(this.WidgetID).style.height = height+"px";
    }
}

CoreUIObject.prototype.SetWidth = function(width) {
    if (width !== undefined && width !== null) {
        document.getElementById(this.WidgetID).style.width = width+"px";
    }
}

CoreUIObject.prototype.SetHeight = function(height) {
    if (height !== undefined && height !== null) {
        document.getElementById(this.WidgetID).style.height = height+"px";
    }
}

CoreUIObject.prototype.VerticalAlign = function(alligiment) {
    this.WorkingObject.style.verticalAlign = alligiment;
}

CoreUIObject.prototype.HorizontalAlign = function(alligiment) {
    document.getElementById(this.WidgetID+`_envelop`).style.display = "flex";
    document.getElementById(this.WidgetID+`_envelop`).style.flexDirection  = "row";
    document.getElementById(this.WidgetID+`_envelop`).style.justifyContent = alligiment;
}

CoreUIObject.prototype.SetBackgroundImage = function(path) {
    document.getElementById(this.WidgetID).style.backgroundImage = "url("+path+")";
    document.getElementById(this.WidgetID).style.backgroundPosition = "center";
    document.getElementById(this.WidgetID).style.backgroundSize = "cover"; // contain
}

/*
    [none, sm, "", lg]
*/
CoreUIObject.prototype.SetShadow = function(type) {
    document.getElementById(this.WidgetID).classList.add("shadow-"+type);
}

CoreUIObject.prototype.SetRoundedCorners = function(type) {
    document.getElementById(this.WidgetID).classList.add("rounded");
}

CoreUIObject.prototype.RemoveRoundedCorners = function(type) {
    document.getElementById(this.WidgetID).classList.remove("rounded");
}

CoreUIObject.prototype.SetBorderColor = function(color) {
    document.getElementById(this.WidgetID).style.borderColor  = color;
}

CoreUIObject.prototype.SetColor = function(color) {
    document.getElementById(this.WidgetID).style.color = color;
}

CoreUIObject.prototype.SetBackgroundColor = function(color) {
    document.getElementById(this.WidgetID).style.backgroundColor = color;
}

CoreUIObject.prototype.RegisterMouseEnterCallback = function(callback) {
    document.getElementById(this.WidgetID).addEventListener("mouseenter", callback, useCapture=true);
}

CoreUIObject.prototype.RegisterMouseLeaveCallback = function(callback) {
    document.getElementById(this.WidgetID).addEventListener("mouseleave", callback, useCapture=true);
}

CoreUIObject.prototype.RegisterClickCallback = function(callback) {
    document.getElementById(this.WidgetID).addEventListener("click", callback);
}

CoreUIObject.prototype.Build = function (id) {
    this.WorkingObject  = document.getElementById(id);

    if (this.WorkingObject === null || this.WorkingObject === undefined) {
        console.log("UI Object (" + this.ObjectName + ") (" + id + ") object was not found in DOM");
        return;
    }

    this.WidgetID       = id+"_"+this.ObjectName;
    this.HTML           = `<div id="`+this.WidgetID+`_envelop">`+this.Content+`</div>`;

    this.HTML = this.HTML.split("[ID]").join(this.WidgetID);

    this.PreBuild();
    // Set HTML
    this.WorkingObject.innerHTML = this.HTML;
    this.PostBuild();
}