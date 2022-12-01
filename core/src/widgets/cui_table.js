function CoreUITable (params) {
    CoreUIObject.call(this, params);
	self = this;

    this.ObjectName = "core_ui_basic_table";
    this.Content    = `
        <div id="[ID]">
            <nav aria-label="Page navigation example" id="[ID]_basic_table_listing_nav">
                <ul class="pagination justify-content-center" id="[ID]_basic_table_listing_index_nav">
                    <li class="page-item disabled"><small class="page-link" href="#" id="[ID]_basic_table_listing_index_left"></small></li>
                    <li class="page-item" id="[ID]_basic_table_listing_first"></li>
                    <li class="page-item" id="[ID]_basic_table_listing_left"></li>
                    <li class="page-item" id="[ID]_basic_table_listing_right"></li>
                    <li class="page-item" id="[ID]_basic_table_listing_last"></li>
                    <li class="page-item disabled"><small class="page-link" href="#" id="[ID]_basic_table_listing_index_right"></small></li>
                </ul>
            </nav>
            <br>
            <div id="[ID]_basic_table_actions"></div>
            <div class="table-responsive">
                <table class="table table-sm [STRIPED] table-hover">
                    <thead>
                        <tr>
                            [HEAD]
                        </tr>
                    </thead>
                    <tbody id="[ID]_basic_table_body">
                        [BODY]
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    this.Type = {
        "type_basic": {
            css: ``,
            content: `
            <div id="[ID]">
                <nav aria-label="Page navigation example" id="[ID]_basic_table_listing_nav">
                    <ul class="pagination justify-content-center" id="[ID]_basic_table_listing_index_nav">
                        <li class="page-item disabled"><small class="page-link" href="#" id="[ID]_basic_table_listing_index_left"></small></li>
                        <li class="page-item" id="[ID]_basic_table_listing_first"></li>
                        <li class="page-item" id="[ID]_basic_table_listing_left"></li>
                        <li class="page-item" id="[ID]_basic_table_listing_right"></li>
                        <li class="page-item" id="[ID]_basic_table_listing_last"></li>
                        <li class="page-item disabled"><small class="page-link" href="#" id="[ID]_basic_table_listing_index_right"></small></li>
                    </ul>
                </nav>
                <br>
                <div id="[ID]_basic_table_actions"></div>
                <div class="table-responsive">
                    <table class="table table-sm [STRIPED] table-hover">
                        <thead>
                            <tr>
                                [HEAD]
                            </tr>
                        </thead>
                        <tbody id="[ID]_basic_table_body">
                            [BODY]
                        </tbody>
                    </table>
                </div>
            </div>
            `
        },
        "type_owl": {
            css: `a{-webkit-transition:.3s all ease;-o-transition:.3s all ease;transition:.3s all ease}a,a:hover{text-decoration:none!important}.content{padding:7rem 0}.custom-table{min-width:900px}.custom-table thead th,.custom-table thead tr{border-top:none;border-bottom:none!important}.custom-table tbody td,.custom-table tbody th{color:#777;font-weight:400;padding-bottom:20px;padding-top:20px;font-weight:300}.custom-table tbody td small,.custom-table tbody th small{color:#b3b3b3;font-weight:300}.custom-table tbody .persons{padding:0;margin:0}.custom-table tbody .persons li{padding:0;margin:0 0 0 -15px;list-style:none;display:inline-block}.custom-table tbody .persons li a{display:inline-block;width:36px}.custom-table tbody .persons li a img{border-radius:50%;max-width:100%}.custom-table tbody tr td,.custom-table tbody tr th{position:relative;-webkit-transition:.3s all ease;-o-transition:.3s all ease;transition:.3s all ease}.custom-table tbody tr td:after,.custom-table tbody tr td:before,.custom-table tbody tr th:after,.custom-table tbody tr th:before{-webkit-transition:.3s all ease;-o-transition:.3s all ease;transition:.3s all ease;content:"";left:0;right:0;position:absolute;height:1px;background:#bfbfbf;width:100%;opacity:0;visibility:hidden}.custom-table tbody tr td:before,.custom-table tbody tr th:before{top:-1px}.custom-table tbody tr td:after,.custom-table tbody tr th:after{bottom:-1px}.custom-table tbody tr:hover td,.custom-table tbody tr:hover th{background:rgba(0,0,0,.03)}.custom-table tbody tr:hover td:after,.custom-table tbody tr:hover td:before,.custom-table tbody tr:hover th:after,.custom-table tbody tr:hover th:before{opacity:1;visibility:visible}.custom-table tbody tr.active td,.custom-table tbody tr.active th{background:rgba(0,0,0,.03)}.custom-table tbody tr.active td:after,.custom-table tbody tr.active td:before,.custom-table tbody tr.active th:after,.custom-table tbody tr.active th:before{opacity:1;visibility:visible}.control{display:block;position:relative;margin-bottom:25px;cursor:pointer;font-size:18px}.control input{position:absolute;z-index:-1;opacity:0}.control__indicator{position:absolute;top:2px;left:0;height:20px;width:20px;border-radius:4px;border:2px solid #ccc;background:0 0}.control--radio .control__indicator{border-radius:50%}.control input:focus~.control__indicator,.control:hover input~.control__indicator{border:2px solid #007bff}.control input:checked~.control__indicator{border:2px solid #007bff;background:#007bff}.control input:disabled~.control__indicator{background:#e6e6e6;opacity:.6;pointer-events:none;border:2px solid #ccc}.control__indicator:after{font-family:icomoon;content:'\e5ca';position:absolute;display:none}.control input:checked~.control__indicator:after{display:block;color:#fff}.control--checkbox .control__indicator:after{top:50%;left:50%;-webkit-transform:translate(-50%,-52%);-ms-transform:translate(-50%,-52%);transform:translate(-50%,-52%)}.control--checkbox input:disabled~.control__indicator:after{border-color:#7b7b7b}.control--checkbox input:disabled:checked~.control__indicator{background-color:#007bff;opacity:.2;border:2px solid #007bff}`,
            content: `
            <div id="[ID]">
                <nav aria-label="Page navigation example" id="[ID]_basic_table_listing_nav">
                    <ul class="pagination justify-content-center" id="[ID]_basic_table_listing_index_nav">
                        <li class="page-item disabled"><small class="page-link" href="#" id="[ID]_basic_table_listing_index_left"></small></li>
                        <li class="page-item" id="[ID]_basic_table_listing_first"></li>
                        <li class="page-item" id="[ID]_basic_table_listing_left"></li>
                        <li class="page-item" id="[ID]_basic_table_listing_right"></li>
                        <li class="page-item" id="[ID]_basic_table_listing_last"></li>
                        <li class="page-item disabled"><small class="page-link" href="#" id="[ID]_basic_table_listing_index_right"></small></li>
                    </ul>
                </nav>
                <br>
                <div id="[ID]_basic_table_actions"></div>
                <div class="table-responsive">
                    <table class="table custom-table">
                        <thead>
                            <tr>
                                [HEAD]
                            </tr>
                        </thead>
                        <tbody id="[ID]_basic_table_body">
                            [BODY]
                        </tbody>
                    </table>
                </div>
            </div>
            `
        }
    }

    this.Params         = params;
    this.Head           = "";
    this.Body           = "";
    this.Striped        = false;
    this.RowsNumber     = false;
    this.HeaderShow     = true;
    this.Listing        = false;
    this.Window         = 30;
    this.Slice          = 1;
    this.LastSlice      = 1;
    this.Data           = [];
    this.CountLeft      = 0;
    this.CountRight     = 0;

	return this;
}

CoreUITable.prototype              = Object.create(CoreUIObject.prototype);
CoreUITable.prototype.constructor  = CoreUITable;

CoreUITable.prototype.PreBuild = function () {
    if (this.Striped == true) {
		this.HTML = this.HTML.split("[STRIPED]").join("table-striped");
	} else {
		this.HTML = this.HTML.split("[STRIPED]").join('');
	}
	
    if (this.HeaderShow == true) {
        this.HTML = this.HTML.split("[HEAD]").join(this.Head);
    } else {
        this.HTML = this.HTML.split("[HEAD]").join("");
    }

    // Build body table
    var length = this.Data.length;

    if (this.Listing == true) {
        if (this.Window < length) {
            length = this.Window;
        }
    }
    
    for (idx = 0; idx < length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr id='"+this.WidgetID+"_row_"+(idx+1)+"'><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr id='"+this.WidgetID+"_row_"+(idx+1)+"'>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
    
    this.HTML = this.HTML.split("[BODY]").join(this.Body);
}

CoreUITable.prototype.PostBuild = function () {
    if (this.Listing == false) {
        document.getElementById(this.WidgetID+"_basic_table_listing_nav").classList.add("d-none");
    } else {
        this.objLeft = document.createElement("small");
        this.objLeft.style.color = "blue";
        this.objLeft.style.cursor = "pointer";
        this.objLeft.innerHTML = "Previous";
        this.objLeft.classList.add("page-link");
        this.objLeft.classList.add("text-muted");
        this.objLeft.onclick = this.LeftClick.bind(this);

        this.objRight = document.createElement("small");
        this.objRight.style.color = "blue";
        this.objRight.style.cursor = "pointer";
        this.objRight.innerHTML = "Next";
        this.objRight.classList.add("page-link");
        this.objRight.classList.add("text-muted");
        this.objRight.onclick = this.RighClick.bind(this);

        this.objFirst = document.createElement("small");
        this.objFirst.style.color = "blue";
        this.objFirst.style.cursor = "pointer";
        this.objFirst.innerHTML = "First";
        this.objFirst.classList.add("page-link");
        this.objFirst.classList.add("text-muted");
        this.objFirst.onclick = this.FirstClick.bind(this);

        this.objLast = document.createElement("small");
        this.objLast.style.color = "blue";
        this.objLast.style.cursor = "pointer";
        this.objLast.innerHTML = "Last";
        this.objLast.classList.add("page-link");
        this.objLast.classList.add("text-muted");
        this.objLast.onclick = this.LastClick.bind(this);

        document.getElementById(this.WidgetID+"_basic_table_listing_index_left").innerHTML  = this.CountLeft;
        document.getElementById(this.WidgetID+"_basic_table_listing_index_right").innerHTML = this.CountRight;
        document.getElementById(this.WidgetID+"_basic_table_listing_left").appendChild(this.objLeft);
        document.getElementById(this.WidgetID+"_basic_table_listing_right").appendChild(this.objRight);
        document.getElementById(this.WidgetID+"_basic_table_listing_first").appendChild(this.objFirst);
        document.getElementById(this.WidgetID+"_basic_table_listing_last").appendChild(this.objLast);

        if (this.Data.length > this.Window) {
            document.getElementById(this.WidgetID+"_basic_table_listing_nav").classList.remove("d-none");
        } else {
            document.getElementById(this.WidgetID+"_basic_table_listing_nav").classList.add("d-none");
        }
    }
}

CoreUITable.prototype.ApplyType = function(type) {
    this.Content = this.Type[type].content;

    if (this.Type[type].css != "") {
        window.MKS.MicroServices.Main.API.AppendCSS(this.Type[type].css);
    }
}

CoreUITable.prototype.RegisterUIChangeEvent = function(callback) {
    this.UIChangeEvent = callback;
}

CoreUITable.prototype.EnableListing = function () {
	this.Listing = true;
}

CoreUITable.prototype.SetListingWindowSize = function (value) {
	this.Window = value;
}

CoreUITable.prototype.SetStriped = function () {
	this.Striped = true;
}

CoreUITable.prototype.ShowRowNumber = function (value) {
	this.RowsNumber = value;
}

CoreUITable.prototype.ShowHeader = function (value) {
	this.HeaderShow = value;
}

CoreUITable.prototype.SetActions = function (html) {
    document.getElementById(this.WorkingObject+"_basic_table_actions").innerHTML = html;
}

CoreUITable.prototype.SetSchema = function (schema) {
    this.Head = "";
    for (idx = 0; idx < schema.length; idx++) {
        this.Head += "<th scope='col'>" + schema[idx] + "</th>";
    }
}

CoreUITable.prototype.RemoveRow = function (row_index) {
    var row_id = this.WidgetID+"_row_"+row_index;
    var obj = document.getElementById(row_id);
    obj.parentElement.removeChild(obj);
    this.Data.splice(row_index-1, 1);
}

CoreUITable.prototype.SetData = function (data) {
    this.Data = data;

    var length = data.length;
    if (this.Listing == true) {
        if (length > this.Window) {
            length = this.Window;
        }

        this.CountLeft = 0;
        this.CountRight = length + " (" + this.Data.length + ")";
        this.LastSlice = parseInt(this.Data.length / this.Window) + 1
    }
}

CoreUITable.prototype.AppendSummary = function (data) {
    this.Body += "<tr class='table-dark'>";
    for (idx = 0; idx < data.length; idx++) {
        this.Body += "<td>"+data[idx]+"</td>";
    } this.Body += "</tr>";
}

CoreUITable.prototype.AddRow = function (row) {
    var idx = this.Data.length + 1;
    this.Data.push(row);

    // Build body table
    this.Body = "";
    var length = this.Data.length;
    for (idx = 0; idx < length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr id='"+this.WidgetID+"_row_"+(idx+1)+"'><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr id='"+this.WidgetID+"_row_"+(idx+1)+"'>";
        }
        
        for (ydx = 0; ydx < row.length; ydx++) {
            this.Body += "<td>" + row[ydx] + "</td>";
        }
        this.Body += "</tr>";
    }

    document.getElementById(this.WidgetID+"_basic_table_body").innerHTML = this.Body;

    return idx;
}

CoreUITable.prototype.LeftClick = function () {
    this.Body = "";

    if (this.Data === undefined || this.Data === null) {
        return;
    }

    var start_length    = 0;
    var end_length      = 0;
    var prev_slice      = this.Slice - 1;

    if (this.Slice == 1) {
        start_length = 0;
        end_length   = this.Window;

        if (this.Data.length < this.Window) {
            end_length = this.Data.length;
        }
    } else {
        start_length = (prev_slice - 1) * this.Window;
        end_length   = prev_slice * this.Window;

        if (this.Slice > 1) {
            this.Slice = prev_slice;
        }

        if (this.Data.length < (this.Slice - 1) * this.Window) {
            end_length = (this.Slice - 1) * this.Window;
        }
    }

    this.CountLeft  = start_length;
    this.CountRight = end_length;

    for (idx = start_length; idx < end_length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
    document.getElementById(this.WidgetID+"_basic_table_body").innerHTML = this.Body;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

CoreUITable.prototype.RighClick = function () {
    this.Body = "";

    if (this.Data === undefined || this.Data === null) {
        return;
    }

    var start_length    = 0;
    var end_length      = 0;
    var next_slice      = this.Slice + 1;
    
    if (next_slice * this.Window < this.Data.length) {
        start_length    = this.Slice * this.Window;
        end_length      = next_slice * this.Window;
        this.Slice      = next_slice;
    } else {
        start_length    = this.Slice * this.Window;
        end_length      = this.Data.length;
        this.Slice      = this.LastSlice;
    }

    if (this.Data.length < this.Window) {
        start_length = 0;
    } else if (this.Data.length < start_length) {
        start_length = (this.Slice - 1) * this.Window;
    }

    this.CountLeft  = start_length;
    this.CountRight = end_length;

    for (idx = start_length; idx < end_length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
    document.getElementById(this.WidgetID+"_basic_table_body").innerHTML = this.Body;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

CoreUITable.prototype.FirstClick = function () {
    this.Body = "";

    if (this.Data === undefined || this.Data === null) {
        return;
    }

    var start_length = 0;
    var end_length   = this.Window;
    this.Slice       = 1;

    if (this.Data.length < this.Window) {
        end_length = this.Data.length;
    }

    this.CountLeft  = start_length;
    this.CountRight = end_length;

    for (idx = start_length; idx < end_length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }

    document.getElementById(this.WidgetID+"_basic_table_body").innerHTML = this.Body;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

CoreUITable.prototype.LastClick = function () {
    this.Body = "";

    if (this.Data === undefined || this.Data === null) {
        return;
    }

    this.Slice = (parseInt(this.Data.length / this.Window) > 0) ? this.LastSlice : 0;
    if (this.Slice == 0) {
        this.Slice = 1;
    }
    var start_length = this.Slice * this.Window;
    var end_length   = this.Data.length;

    if (this.Data.length < this.Window) {
        start_length = 0;
    } else if (this.Data.length < start_length) {
        start_length = (this.Slice - 1) * this.Window;
    }

    this.CountLeft  = start_length;
    this.CountRight = end_length;

    for (idx = start_length; idx < end_length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < this.Data[idx].length; ydx++) {
            this.Body += "<td>" + this.Data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }

    document.getElementById(this.WidgetID+"_basic_table_body").innerHTML = this.Body;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WidgetID+"_basic_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}
