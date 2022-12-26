function CoreUIGraph (params) {
    CoreUIObject.call(this, params);
    self = this;

    this.ObjectName = "core_ui_basic_graph";
    this.Content    = `
    <div id="[ID]_container_[NAME]">
        <canvas id="[ID]_graph_[NAME]" style="height:400px"></canvas>
    </div>
    `;
    this.Params = params;

    this.Colors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    this.Config = {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: ''
            },
            tooltips: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: ''
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: ''
                    },
                    ticks: {
                        max: 1024
                    }
                }]
            },
        }
    };
	
	return this;
}

CoreUIGraph.prototype              = Object.create(CoreUIObject.prototype);
CoreUIGraph.prototype.constructor  = CoreUIGraph;

CoreUIGraph.prototype.PreBuild = function (params) {
    this.HTML = this.HTML.split("[NAME]").join(this.Params.name);
}

CoreUIGraph.prototype.PostBuild = function (params) {
    var Ctx         = document.getElementById(this.WidgetID + "_graph_" + this.Params.name).getContext('2d');
    this.Instance   = new Chart(Ctx, this.Config);
}

CoreUIGraph.prototype.Configure = function (conf) {
    this.Config.type                                            = conf.type;
    this.Config.options.title.text                              = conf.title;
    this.Config.options.scales.xAxes[0].scaleLabel.labelString  = conf.x.title;
    this.Config.options.scales.yAxes[0].scaleLabel.labelString  = conf.y.title;
    this.Config.options.scales.yAxes[0].ticks.max               = conf.y.max;
    console.log(conf)

    this.CleanConfigure();
}

CoreUIGraph.prototype.CleanConfigure = function () {
    this.Config.data.labels     = [];
    this.Config.data.datasets   = [];
}

CoreUIGraph.prototype.AddDataSet = function(data) {
    if (data.x == undefined || data.y == undefined) {
        return;
    }

    if (data.x.length == 0 || data.y.length == 0) {
        return;
    }

    var dataSet = {
        label: data.title,
        fill: false,
        backgroundColor: data.bk_color,
        borderColor: data.color,
        data: data.y,
        pointRadius: 0
    }
    if (data.dashed) {
        dataSet.borderDash = [5, 5];
    }
    this.Config.data.labels = data.x;
    this.Config.data.datasets.push(dataSet);
}

CoreUIGraph.prototype.RemoveDataSet = function(name) {
    for (key in this.Config.data.datasets) {
        if (this.Config.data.datasets[key] == name) {
            // Remove item
        }
    }
}

CoreUIGraph.prototype.Update = function (title, data) {
    if (this.Instance === null) {
        return;
    }

    var objContainer = document.getElementById(this.WidgetID + "_container_"+this.Params.name);
    var objGraph     = document.getElementById(this.WidgetID + "_graph_" + this.Params.name);

    for (key in this.Instance.data.datasets) {
        var dataset = this.Instance.data.datasets[key];
        if (dataset.label == title) {
            dataset.data = data;
            this.Instance.update('none');
            return;
        }
    }
}

function CoreUIMatlabGraph (params) {
    CoreUIObject.call(this, params);
    self = this;

    this.ObjectName = "core_ui_matlab_graph";
    this.Content    = `
        <div id="[ID]_container_[NAME]">
            <table>
                <tr>
                    <td style="height: 1px">
                        <div id="[ID]_graph_[NAME]_titles" style="display: flex; flex-direction: column; align-items: center; justify-content: space-around; height:100%"></div>
                    </td>
                    <td><div id="[ID]_graph_[NAME]" style="height:[HEIGHT], width:[WIDTH]"></div></td>
                </tr>
            </table>
        </div>
    `;
    this.Params = params;
    this.GraphData = [];

    this.Colors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    this.Layout = {
        hovermode: "x",
        height: 500,
        width: 700,
        showlegend: false
    };
    this.GraphScale         = 10;
    this.GraphGroups        = {
        groups_count: 0,
        datasets_index_map: {},
        groups: {

        }
    };
    this.GraphMap           = {};
    this.TimeLane           = {
        stream: [], 
        window: []
    };
    this.WindowSize         = 512;
    this.GroupMap           = {
        items_count: 0,
        map: []
    };
    this.HoverEventHandler      = null;
    this.UnHoverEventHandler    = null;
	
	return this;
}

CoreUIMatlabGraph.prototype              = Object.create(CoreUIObject.prototype);
CoreUIMatlabGraph.prototype.constructor  = CoreUIMatlabGraph;

CoreUIMatlabGraph.prototype.PreBuild = function () {
    this.HTML = this.HTML.split("[NAME]").join(this.Params.name);
    this.HTML = this.HTML.split("[HEIGHT]").join(this.Params.height);
    this.HTML = this.HTML.split("[WIDTH]").join(this.Params.width);
    this.Layout.height = this.Params.height;
    this.Layout.width = this.Params.width;
}

CoreUIMatlabGraph.prototype.PostBuild = function () {
    // this.Instance = Plotly.newPlot(this.WidgetID + "_graph_" + this.Params.name, this.GraphData, this.Layout);
}

CoreUIMatlabGraph.prototype.RemoveFromArrayByValue = function(array, item) {
    var index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
        return true;
    }

    return false;
}

CoreUIMatlabGraph.prototype.RemoveDataSetsFromGroup = function(group, items) {
    var removed_items = [];
    for (idx in items) {
        var item = items[idx];
        if (this.RemoveFromArrayByValue(group.items, item) == true) {
            removed_items.push(item);
        }
    }

    return removed_items;
}

CoreUIMatlabGraph.prototype.GroupDataSet = function(datasets_name) {
    var datasets_to_group = Array.from(datasets_name);
    var groupLength = this.GraphGroups.groups_count;
    // 1. Remove datasets from groups
    for (var i = 1; i <= groupLength; i++) {
        removed_items = this.RemoveDataSetsFromGroup(this.GraphGroups.groups["GR#"+i], datasets_to_group);
        if (removed_items.length > 0) {
            for (idx in removed_items) {
                this.RemoveFromArrayByValue(datasets_to_group, removed_items[idx]);
            }
        }
    }

    var groups_arr = [];
    for (var i = 1; i <= groupLength; i++) {
        items = this.GraphGroups.groups["GR#"+i].items;
        if (items.length > 0) {
            groups_arr.push(items);
        }
    }
    groups_arr.push(datasets_name);
    this.GraphGroups.groups = {};
    this.GraphGroups.groups_count = 0;

    this.GroupMap.items_count = groups_arr.length;
    this.GroupMap.map = Array.from(groups_arr);
    
    // console.log("***************************************************");
    // console.log(this.GraphGroups);
    // console.log(groups_arr);
    // console.log("***************************************************");
    this.Group();
}

CoreUIMatlabGraph.prototype.UnGroupAllDataSet = function() {
    group = [];
    for (key in this.GraphMap) {
        group.push([key]);
    }

    this.GroupMap.items_count = group.length;
    this.GroupMap.map = Array.from(group);
    this.Group();
}

CoreUIMatlabGraph.prototype.Group = function() {
    var groupLength = this.GroupMap.items_count;
    // Calculate graph height
    this.Layout.height = ((groupLength * 400) * (1-groupLength/this.GraphScale)).toString();

    var html = "";
    var start = 0.0;
    var divider = 1.0 / groupLength;
    for (var idx=0; idx<groupLength; idx++) {
        // Create new axis
        this.Layout["xaxis"+(idx+1).toString()] = {
            title: "Milliseconds",
            gridcolor: "rgba(102, 102, 102, 0.4)",
            linecolor: "#000",
            linewidth: 1,
            showticklabels: false,
            anchor: "x"+((idx+1)),
            domain: [0,1]
        }
        if (idx == 0) {
            this.Layout["yaxis"] = {
                domain: [start, start+divider], 
                anchor: "y"
            }
        } else {
            this.Layout["yaxis"+(idx+1).toString()] = {
                domain: [start, start+divider], 
                anchor: "y"+((idx+1))
            }
        }
        start += divider;
        html += "<div>GR#"+(groupLength - idx)+"</div>";

        this.GraphGroups.groups["GR#"+(idx+1)] = {
            ancore_x: "x"+(idx+1),
            ancore_y: "y"+(idx+1),
            items: []
        };

        // Update dataset with correct anchors
        for (trace_key in this.GroupMap.map[idx]) {
            var trace_item = this.GroupMap.map[idx][trace_key];
            for (key in this.GraphData) {
                if (trace_item == this.GraphData[key].name) {
                    this.GraphData[key]["xaxis"] = "x"+(idx+1).toString();
                    this.GraphData[key]["yaxis"] = "y"+(idx+1).toString();
                }
            }
            this.GraphGroups.groups["GR#"+(idx+1)].items.push(trace_item);
        }
    }
    this.GraphGroups.groups_count = groupLength;

    // console.log("-------------------------------------------------------------------");
    // console.log("GroupMap", this.GroupMap);
    // console.log("GraphGroups", this.GraphGroups);
    // console.log("Layout", this.Layout);
    // console.log("GraphData", this.GraphData);
    // console.log("-------------------------------------------------------------------");

    document.getElementById(this.WidgetID + "_graph_" + this.Params.name + "_titles").innerHTML = html;
    this.Instance = Plotly.newPlot(this.WidgetID + "_graph_" + this.Params.name, this.GraphData, this.Layout);

    document.getElementById(this.WidgetID + "_graph_" + this.Params.name).on('plotly_hover', this.HoverEvent.bind(this));
    document.getElementById(this.WidgetID + "_graph_" + this.Params.name).on('plotly_unhover', this.UnHoverEvent.bind(this));
}

CoreUIMatlabGraph.prototype.HoverEvent = function(data) {
    var self = this;
    data.points.map(function(d) {
        if (self.HoverEventHandler != null) {
            self.HoverEventHandler({x: d.x, y: d.y, idx: data.points[0].pointNumber});
        }
    });
}

CoreUIMatlabGraph.prototype.UnHoverEvent = function() {
    if (this.UnHoverEventHandler != null) {
        this.UnHoverEventHandler();
    }
}

CoreUIMatlabGraph.prototype.ShowHover = function(data) {
    Plotly.Fx.hover(this.WidgetID + "_graph_" + this.Params.name,[
        {curveNumber:0, pointNumber:data.idx}
    ]);
}

CoreUIMatlabGraph.prototype.HideHover = function(data) {
    Plotly.Fx.hover(this.WidgetID + "_graph_" + this.Params.name,[]);
}

CoreUIMatlabGraph.prototype.AddDataSet = function(data, separate) {
    if (data.x == undefined || data.y == undefined  || data.name== undefined  || data.type== undefined) {
        return;
    }

    this.GraphGroups.datasets_index_map[data.name] = this.GraphData.length;
    this.GraphMap[data.name] = {
        stream: [], 
        window: []
    };

    if (separate == false) {
        if (this.GroupMap.items_count == 0) {
            this.GroupMap.map.push([data.name]);
            this.GroupMap.items_count++;
        } else {
            this.GroupMap.map[this.GroupMap.items_count-1].push(data.name);
        }
    } else {
        this.GroupMap.map.push([data.name]);
        this.GroupMap.items_count++;
    }

    // Add data to local db
    this.GraphData.push({
        name: data.name,
        y: data.y,
        x: data.x,
        type: data.type
    });

    // Plotly.relayout(this.WidgetID + "_graph_" + this.Params.name, this.Layout);
}

/*
CoreUIMatlabGraph.prototype.AddDataSet = function(data, separate) {
    if (data.x == undefined || data.y == undefined  || data.name== undefined  || data.type== undefined) {
        return;
    }

    this.GraphGroups.datasets_index_map[data.name] = this.GraphData.length;
    this.GraphMap[data.name] = {
        stream: [], 
        window: []
    };

    if (separate == false) {
        this.GraphGroups.groups_count = (this.GraphGroups.groups_count == 0) ? (this.GraphGroups.groups_count + 1) : this.GraphGroups.groups_count;
    } else {
        this.GraphGroups.groups_count += 1;
    }

    var groupLength = this.GraphGroups.groups_count;
    // Calculate graph height
    this.Layout.height = ((groupLength * 400) * (1-groupLength/this.GraphScale)).toString();
    // Add data to local db
    this.GraphData.push({
        name: data.name,
        y: data.y,
        x: data.x,
        type: data.type,
        xaxis: "x"+groupLength,
        yaxis: "y"+groupLength
    });
    // Create new axis
    if (this.Layout.hasOwnProperty("xaxis"+groupLength.toString()) == false) {
        this.Layout["xaxis"+groupLength.toString()] = {
            title: "Milliseconds",
            gridcolor: "rgba(102, 102, 102, 0.4)",
            linecolor: "#000",
            linewidth: 1,
            showticklabels: false,
            anchor: "x"+(groupLength),
            domain: [0, 1]
        }
        this.Layout["yaxis"+groupLength.toString()] = {
            domain: [0,1], 
            anchor: "y"+(groupLength)
        }
    }
    // Update groups
    if (this.GraphGroups.groups.hasOwnProperty("GR#"+groupLength.toString()) == false) {
        this.GraphGroups.groups["GR#"+groupLength] = {
            ancore_x: "x"+groupLength,
            ancore_y: "y"+groupLength,
            items: [data.name]
        }
    } else {
        this.GraphGroups.groups["GR#"+groupLength].items.push(data.name);
    }
    // Update layout ancors
    var html = "";
    var start = 0.0;
    var divider = 1.0 / groupLength;
    // Update y domain if more then 1
    if (groupLength > 1) {
        for (idx = 1; idx <= groupLength; idx++) {
            if (idx == 1) {
                this.Layout["yaxis"].domain = [start, start+divider];
            } else {
                this.Layout["yaxis"+idx.toString()].domain = [start, start+divider];
            }
            start += divider;
            html += "<div>GR#"+idx+"</div>";
        }
    } else {
        html = "<div>GR#1</div>";
    }

    document.getElementById(this.WidgetID + "_graph_" + this.Params.name + "_titles").innerHTML = html;
    // Plotly.relayout(this.WidgetID + "_graph_" + this.Params.name, this.Layout);
    this.Instance = Plotly.newPlot(this.WidgetID + "_graph_" + this.Params.name, this.GraphData, this.Layout);

    console.log(this.GraphGroups);
}
*/

CoreUIMatlabGraph.prototype.ChangeDataSetGroup = function(dataset_name, group_id) {
    if (this.Application.DictHasKey(this.GraphGroups, dataset_name) == false || group_id < 1) {
        return;
    }

    this.GraphGroups[dataset_name] = group_id - 1;
    if (group_id == 1) {

    } else {

    }
}

CoreUIMatlabGraph.prototype.RemoveDataSet = function(name) {

}

CoreUIMatlabGraph.prototype.UpdateDataSet = function (name, data) {
    if (this.Instance === null) {
        return;
    }

    this.GraphMap[name].stream.push(data);
    if (this.GraphMap[name].stream.length > this.WindowSize) {
        this.GraphMap[name].window = this.GraphMap[name].stream.slice(0-this.WindowSize);
    } else {
        this.GraphMap[name].window = this.GraphMap[name].stream;
    }
}

CoreUIMatlabGraph.prototype.UpdateTimeLane = function (value) {
    if (this.Instance === null) {
        return;
    }

    this.TimeLane.stream.push(value);
    if (this.TimeLane.stream.length > this.WindowSize) {
        this.TimeLane.window = this.TimeLane.stream.slice(0-this.WindowSize);
    } else {
        this.TimeLane.window = this.TimeLane.stream;
    }
}

CoreUIMatlabGraph.prototype.ReDraw = function () {
    for (graphName in this.GraphMap) {
        var graphIdx = this.GraphGroups.datasets_index_map[graphName];
        this.GraphData[graphIdx].y = this.GraphMap[graphName].window;
        this.GraphData[graphIdx].x = this.TimeLane.window;
    }

    Plotly.redraw(this.WidgetID + "_graph_" + this.Params.name);
}

CoreUIMatlabGraph.prototype.ExtendDraw = function (x, y, traces) {
    dataSets = {
        x: x,
        y: y
    };

    Plotly.extendTraces(this.WidgetID + "_graph_" + this.Params.name, dataSets, traces);
}