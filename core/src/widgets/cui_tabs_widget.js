function CoreUIBasicTabsWidget (scope, params) {
    CoreUIObjectWidget.call(this, scope, params);
	self = this;

    this.ObjectName = "core_ui_tabs";
	this.Content 		= `
		<div id="[ID]">
			<ul class="nav nav-tabs">
				[HEADERS]
			</ul>
			[TABS]
		</div>
	`;
	this.TabHeader 		= `
		<li class="nav-item">
			<a class="nav-link active" style="cursor: pointer" id="[ID]_basic_tab_header_[NUM]" onclick="`+this.Scope.Path+`.CoreUIWidgets.[ID].TabSelected('[NAME]');">[NAME]</a>
		</li>
	`;
	this.TabContent		= `
		<div class="card d-none" id="[ID]_basic_tab_content_[NUM]">
			[BODY]
		</div>
	`;

	this.Tabs 		        = {};
	this.TabCounter         = 0;
	this.SelectedTabName    = "";
	
	return this;
}

CoreUIBasicTabsWidget.prototype              = Object.create(CoreUIObjectWidget.prototype);
CoreUIBasicTabsWidget.prototype.constructor  = CoreUIBasicTabsWidget;

CoreUIBasicTabsWidget.prototype.PreBuild = function(params) {
    var tabHeader = "";
	var tabContent = "";
	for (key in this.Tabs) {
		var tabObj = this.Tabs[key];

		var tab 		= this.TabContent;
		var header 		= this.TabHeader;
		this.TabCounter += 1;

		tabObj.id = this.TabCounter;
		tab = tab.split("[ID]").join(this.WidgetID);
		tab = tab.split("[NUM]").join(this.TabCounter);
		tab = tab.split("[BODY]").join(tabObj.body);
		header = header.split("[NAME]").join(key);
		header = header.split("[ID]").join(this.WidgetID);
		header = header.split("[NUM]").join(this.TabCounter);

		tabContent 	+= tab;
		tabHeader 	+= header;
	}
	this.HTML = this.HTML.split("[TABS]").join(tabContent);
	this.HTML = this.HTML.split("[HEADERS]").join(tabHeader);
}

CoreUIBasicTabsWidget.prototype.PostBuild = function(params) {
}

CoreUIBasicTabsWidget.prototype.CreateTab = function (name, t_body) {
	this.Tabs[name] = {
		body: t_body
	};
}

CoreUIBasicTabsWidget.prototype.RemoveTab = function (name) {

}

CoreUIBasicTabsWidget.prototype.TabSelected = function (name) {
	var tab = this.Tabs[name];

	// Remove active class
	for (key in this.Tabs) {
		var curr = this.Tabs[key];
		var currTabHeader = document.getElementById(this.WidgetID+"_basic_tab_header_"+curr.id);
		var currTabContent = document.getElementById(this.WidgetID+"_basic_tab_content_"+curr.id);
		currTabHeader.classList.remove("active");
		currTabContent.classList.add("d-none");
	}

	var selectedTabHeader = document.getElementById(this.WidgetID+"_basic_tab_header_"+tab.id);
	var selectedTabContent = document.getElementById(this.WidgetID+"_basic_tab_content_"+tab.id);
	selectedTabHeader.classList.add("active");
	selectedTabContent.classList.remove("d-none");

	this.SelectedTabName = name;
}

CoreUIBasicTabsWidget.prototype.SelectTab = function (name) {
	this.TabSelected(name);
}

CoreUIBasicTabsWidget.prototype.Update = function () {
}
