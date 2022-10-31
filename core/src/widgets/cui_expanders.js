function CoreUIExpandersCircle (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_expanders_circle";
    this.Content = `
        <div data-toggle="" data-placement="" title="" id="[ID]" style="position: relative; width: [WIDTH]px; height: [HEIGHT]px;" onclick="[ONCLICK_CALLBACK]();" onmouseenter="[ONENTER_CALLBACK]();" onmouseleave="[ONLEAVE_CALLBACK]();">
            <div id="[ID]_left" style="position: absolute; width: [WIDTH]px; height: [HEIGHT]px; background-color: [BG_COLOR]; border-radius: [RADIUS]%;">
            </div>
            <div id="[ID]_right" style="position: absolute; width: [WIDTH]px; height: [HEIGHT]px; background-color: [BG_COLOR]; border-radius: [RADIUS]%;">
            </div>
            <div id="[ID]_center" style="position: absolute; width: [WIDTH]px; height: [HEIGHT]px; background-color: [BG_COLOR];">
                
            </div>
            <div id="[ID]_center_over" style="line-height: .8em; position: absolute; width: [WIDTH]px; height: [HEIGHT]px; background-color: [BG_COLOR];">
                <div id="[ID]_description" style=""></div>
            </div>
            <img src="static/images/progress_2.gif" id="[ID]_progress" style="position: absolute; width: [WIDTH]px; height: [HEIGHT]px;" />
        </div>
    `;
    this.Params = params;
    this.Description = new CoreUIWritingLabel({text: params.description, size: 12, font: "Trebuchet MS"});
    this.Enabled = false;

	return this;
}

CoreUIExpandersCircle.prototype              = Object.create(CoreUIObject.prototype);
CoreUIExpandersCircle.prototype.constructor  = CoreUIExpandersCircle;

CoreUIExpandersCircle.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[WIDTH]").join(this.Params.width);
    this.HTML = this.HTML.split("[HEIGHT]").join(this.Params.height);
    this.HTML = this.HTML.split("[BG_COLOR]").join(this.Params.bgcolor);
    this.HTML = this.HTML.split("[RADIUS]").join(this.Params.radius);
    this.HTML = this.HTML.split("[ONCLICK_CALLBACK]").join(this.Params.onclick);
    this.HTML = this.HTML.split("[ONENTER_CALLBACK]").join(this.Params.onmouseenter);
    this.HTML = this.HTML.split("[ONLEAVE_CALLBACK]").join(this.Params.onmouseleave);
}

CoreUIExpandersCircle.prototype.PostBuild = function (params) {
    document.getElementById(this.WidgetID+"_center").style.left = this.Params.width/2 + "px";
    document.getElementById(this.WidgetID+"_center_over").style.left = (this.Params.width/2-2) + "px";

    this.MoveRight(0);
    
    this.Description.Build(this.WidgetID+"_description");
    this.Description.Hide();

    document.getElementById(this.WidgetID+"_progress").style.left = "-13px";
    document.getElementById(this.WidgetID+"_progress").style.top = "-13px";
    document.getElementById(this.WidgetID+"_progress").style.width  = this.Params.width+26 + "px";
    document.getElementById(this.WidgetID+"_progress").style.height = this.Params.height+26 + "px";
    this.WorkingProgress(false);
}

CoreUIExpandersCircle.prototype.MoveRight = function (value) {
    var circle_right    = document.getElementById(this.WidgetID+"_right");
    var rec_center      = document.getElementById(this.WidgetID+"_center");
    var rec_center_over = document.getElementById(this.WidgetID+"_center_over");

    circle_right.style.left     = value+"px";
    rec_center.style.width      = value+"px";
    rec_center_over.style.width = (value+2) + "px";

    if (value) {
        this.Description.Show();
        this.WorkingProgress(true);

        
        circle_right.style.width    = (this.Params.width+4) + "px";
        circle_right.style.height   = (this.Params.height+4) + "px";
        circle_right.style.top      = "-2px";
        circle_right.style.border   = "2px solid #c3c3c3";

        rec_center.style.height = (this.Params.height+4) + "px";
        rec_center.style.top    = "-2px";
        rec_center.style.border = "2px solid #c3c3c3";
    } else {
        this.Description.Hide();
        this.WorkingProgress(false);

        circle_right.style.width    = this.Params.width + "px";
        circle_right.style.height   = this.Params.height + "px";
        circle_right.style.top      = "0px";
        circle_right.style.border   = "0px solid #c3c3c3";

        rec_center.style.height = this.Params.height + "px";
        rec_center.style.top    = "0px";
        rec_center.style.border = "0px solid #c3c3c3";
    }
}

CoreUIExpandersCircle.prototype.WorkingProgress = function (value) {
    if (value == true) {
        document.getElementById(this.WidgetID+"_progress").classList.remove("d-none");
    } else {
        document.getElementById(this.WidgetID+"_progress").classList.add("d-none");
    }
}

// Extended Methods

CoreUIExpandersCircle.prototype.SetTitle = function (name) {
    document.getElementById(this.WidgetID + "_description").innerHTML = name;
}

CoreUIExpandersCircle.prototype.SetColor = function (color) {
    document.getElementById(this.WidgetID+"_left").style.backgroundColor = color;
    document.getElementById(this.WidgetID+"_right").style.backgroundColor = color;
    document.getElementById(this.WidgetID+"_center").style.backgroundColor = color;
    document.getElementById(this.WidgetID+"_center_over").style.backgroundColor = color;
}

CoreUIExpandersCircle.prototype.Enable = function () {
    this.Enabled = true;
}

CoreUIExpandersCircle.prototype.Disable = function () {
    this.Enabled = false;
}

CoreUIExpandersCircle.prototype.SetState = function (state) {
    switch(state) {
        case "enabled":
            this.SetColor(this.Params.bgcolor);
            this.Enable();
            break;
        case "disabled":
            this.SetColor("rgb(198, 209, 219)");
            this.Disable();
            break;
        case "completed":
            this.SetColor("green");
            this.Enable();
            break;
    }
}

CoreUIExpandersCircle.prototype.SetTextColor = function (color) {
    // document.getElementById(this.WidgetID+"_canvas").style.color = color;
}

CoreUIExpandersCircle.prototype.EnableToolTip = function (text, placement) {
    document.getElementById(this.WidgetID).setAttribute("data-toggle", "tooltip");
    document.getElementById(this.WidgetID).setAttribute("data-placement", placement);
    document.getElementById(this.WidgetID).setAttribute("title", text);
}
