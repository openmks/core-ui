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