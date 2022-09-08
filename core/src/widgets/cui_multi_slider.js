function CoreUIMultiSlider (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_multislider";
    this.Info       = params;
    this.Content    = `
        <div class="row justify-content-xl-center">
            <div class="col-xl-2">
                <span id="[ID]_range_left">[MIN]</span>
            </div>
            <div class="col-xl-8">
                <input id="[ID]_range_object" type="text" data-slider-min="[MIN]" data-slider-max="[MAX]" data-slider-step="[STEP]" data-slider-value="[[LEFT],[RIGHT]]"/>
            </div>
            <div class="col-xl-2">
                <span id="[ID]_range_right">[MAX]</span>
            </div>
        </div>
    `;

    this.SliderObject       = null;
    this.SliderObjectLeft   = null;
    this.SliderObjectRight  = null;
    this.Slider             = null;
    this.LeftValue          = 0;
    this.RightValue         = 0;

	return this;
}

CoreUIMultiSlider.prototype              = Object.create(CoreUIObject.prototype);
CoreUIMultiSlider.prototype.constructor  = CoreUIMultiSlider;

CoreUIMultiSlider.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[ID]").join(this.WidgetID);
    this.HTML = this.HTML.split("[MIN]").join(this.Info.min);
    this.HTML = this.HTML.split("[MAX]").join(this.Info.max);
    this.HTML = this.HTML.split("[STEP]").join(this.Info.step);
    this.HTML = this.HTML.split("[LEFT]").join(this.Info.left);
    this.HTML = this.HTML.split("[RIGHT]").join(this.Info.right);
}

CoreUIMultiSlider.prototype.PostBuild = function (params) {
    this.LeftValue  = this.Info.left;
    this.RightValue = this.Info.right;

    this.SliderObjectLeft   = document.getElementById(this.WidgetID+"_range_left");
    this.SliderObject       = document.getElementById(this.WidgetID+"_range_object");
    this.SliderObjectRight  = document.getElementById(this.WidgetID+"_range_right");

    this.Slider = new Slider("#"+this.WidgetID+"_range_object", {
        tooltip: 'always'
    });

    var self = this;
    this.Slider.on("change", function(e) {
        self.SliderObjectLeft.innerHTML  = e.newValue[0];
        self.SliderObjectRight.innerHTML = e.newValue[1];
        self.LeftValue  = e.newValue[0];
        self.RightValue = e.newValue[1];
    });
}

MksMultiRangeSlider.prototype.GetValue = function () {
    var resp = [];

    resp.push(this.LeftValue);
    resp.push(this.RightValue);
    
    return resp;
}

CoreUIMultiSlider.prototype.SetValue = function (value) {
    document.getElementById(this.WidgetID).value = value;
}
