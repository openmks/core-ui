function CoreUIBasicTabs (scope) {
	self = this;

	this.Scope 			= scope;
	this.WorkingObject  = null;
    this.WidgetID       = null;
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

	this.Tabs 		= {};
	this.TabCounter = 0;

	if (scope.Object.hasOwnProperty("CoreUIWidgets") == false) {   
		scope.Object.CoreUIWidgets = {};
	}

	this.SelectedTabName = "";
	
	return this;
}

CoreUIBasicTabs.prototype.Build = function (id) {
	this.WorkingObject  = document.getElementById(id);
	this.WidgetID  		= id+"_core_ui_tabs";
	var html 			= this.Content;

	this.Scope.Object.CoreUIWidgets[this.WidgetID] = this;

	html = html.split("[ID]").join(this.WidgetID);
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
	html = html.split("[TABS]").join(tabContent);
	html = html.split("[HEADERS]").join(tabHeader);

	// Set HTML
    this.WorkingObject.innerHTML = html;
}

CoreUIBasicTabs.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}

CoreUIBasicTabs.prototype.Show = function () {
    document.getElementById(this.WidgetID).classList.remove("d-none");
}

CoreUIBasicTabs.prototype.Hide = function () {
    document.getElementById(this.WidgetID).classList.add("d-none");
}

CoreUIBasicTabs.prototype.GetHTML = function () {
    return this.WorkingObject.innerHTML;
}

CoreUIBasicTabs.prototype.CreateTab = function (name, t_body) {
	this.Tabs[name] = {
		body: t_body
	};
}

CoreUIBasicTabs.prototype.RemoveTab = function (name) {

}

CoreUIBasicTabs.prototype.TabSelected = function (name) {
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

CoreUIBasicTabs.prototype.SelectTab = function (name) {
	this.TabSelected(name);
}

CoreUIBasicTabs.prototype.Update = function () {
}
