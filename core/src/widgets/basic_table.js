function MksBasicTable () {
	self = this;

    this.WorkingObject  = null;
    this.Head           = "";
    this.Body           = "";
    this.Content        = `
        <nav aria-label="Page navigation example" id="[HOST_ID]_baisc_table_listing_nav">
            <ul class="pagination justify-content-center" id="[HOST_ID]_baisc_table_listing_index_nav">
                <li class="page-item disabled"><a class="page-link" href="#" id="[HOST_ID]_baisc_table_listing_index_left"></a></li>
                <li class="page-item" id="[HOST_ID]_baisc_table_listing_first"></li>
                <li class="page-item" id="[HOST_ID]_baisc_table_listing_left"></li>
                <li class="page-item" id="[HOST_ID]_baisc_table_listing_right"></li>
                <li class="page-item" id="[HOST_ID]_baisc_table_listing_last"></li>
                <li class="page-item disabled"><a class="page-link" href="#" id="[HOST_ID]_baisc_table_listing_index_right"></a></li>
            </ul>
        </nav>
        <br>
        <div id="[HOST_ID]_baisc_table_actions"></div>
        <div class="table-responsive">
            <table class="table table-sm [STRIPED] table-hover">
                <thead>
                    <tr>
                        [HEAD]
                    </tr>
                </thead>
                <tbody id="[HOST_ID]_baisc_table_body">
                    [BODY]
                </tbody>
            </table>
        </div>
    `;
	this.Striped    = false;
    this.RowsNumber = false;
    this.HeaderShow = true;
    this.Listing    = false;
    this.Window     = 30;
    this.Slice      = 1;
    this.LastSlice  = 1;
    this.Data       = null;
    this.CountLeft  = 0;
    this.CountRight = 0;

    this.UIChangeEvent = null;
	
	return this;
}

MksBasicTable.prototype.RegisterUIChangeEvent = function(callback) {
    this.UIChangeEvent = callback;
}

MksBasicTable.prototype.EnableListing = function () {
	this.Listing = true;
}

MksBasicTable.prototype.SetListingWindowSize = function (value) {
	this.Window = value;
}

MksBasicTable.prototype.SetStriped = function () {
	this.Striped = true;
}

MksBasicTable.prototype.ShowRowNumber = function (value) {
	this.RowsNumber = value;
}

MksBasicTable.prototype.ShowHeader = function (value) {
	this.HeaderShow = value;
}

MksBasicTable.prototype.SetActions = function (html) {
    document.getElementById(this.WorkingObject.id+"_baisc_table_actions").innerHTML = html;
}

MksBasicTable.prototype.SetSchema = function (schema) {
    this.Head = "";
    for (idx = 0; idx < schema.length; idx++) {
        this.Head += "<th scope='col'>" + schema[idx] + "</th>";
    }
}

MksBasicTable.prototype.SetData = function (data) {
	this.Body = "";

    var length = data.length;
    if (this.Listing == true) {
        if (length > this.Window) {
            length = this.Window;
        }

        this.Data = data;
        this.CountLeft = 0;
        this.CountRight = length + " (" + this.Data.length + ")";
        this.LastSlice = parseInt(this.Data.length / this.Window) + 1
    } 

    for (idx = 0; idx < length; idx++) {
        if (this.RowsNumber == true) {
            this.Body += "<tr><th scope='row'>"+(idx+1)+"</th>";
        } else {
            this.Body += "<tr>";
        }
        
        for (ydx = 0; ydx < data[idx].length; ydx++) {
            this.Body += "<td>" + data[idx][ydx] + "</td>";
        }
        this.Body += "</tr>";
    }
}

MksBasicTable.prototype.AppendSummary = function (data) {
    this.Body += "<tr class='table-dark'>";
    for (idx = 0; idx < data.length; idx++) {
        this.Body += "<td>"+data[idx]+"</td>";
    } this.Body += "</tr>";
}

MksBasicTable.prototype.LeftClick = function () {
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
    document.getElementById(this.WorkingObject.id+"_baisc_table_body").innerHTML = this.Body;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

MksBasicTable.prototype.RighClick = function () {
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
    document.getElementById(this.WorkingObject.id+"_baisc_table_body").innerHTML = this.Body;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

MksBasicTable.prototype.FirstClick = function () {
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

    document.getElementById(this.WorkingObject.id+"_baisc_table_body").innerHTML = this.Body;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

MksBasicTable.prototype.LastClick = function () {
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

    document.getElementById(this.WorkingObject.id+"_baisc_table_body").innerHTML = this.Body;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_left").innerHTML  = this.CountLeft;
    document.getElementById(this.WorkingObject.id+"_baisc_table_listing_index_right").innerHTML = this.CountRight + " (" + this.Data.length + ")";

    if (this.UIChangeEvent !== undefined && this.UIChangeEvent !== null) {
        this.UIChangeEvent();
    }
}

MksBasicTable.prototype.Build = function (obj) {
    this.WorkingObject = obj;
    var html = this.Content;

    var HostingId = this.WorkingObject.id;
    html = html.split("[HOST_ID]").join(HostingId);
	
	if (this.Striped == true) {
		html = html.split("[STRIPED]").join("table-striped");
	} else {
		html = html.split("[STRIPED]").join('');
	}
	
    if (this.HeaderShow == true) {
        html = html.split("[HEAD]").join(this.Head);
    } else {
        html = html.split("[HEAD]").join("");
    }
    
    html = html.split("[BODY]").join(this.Body);
    obj.innerHTML = html;

    if (this.Listing == false) {
        document.getElementById(HostingId+"_baisc_table_listing_nav").classList.add("d-none");
    } else {
        
        this.objLeft = document.createElement("a");
        this.objLeft.style.color = "blue";
        this.objLeft.style.cursor = "pointer";
        this.objLeft.innerHTML = "Previous";
        this.objLeft.classList.add("page-link");
        this.objLeft.onclick = this.LeftClick.bind(this);

        this.objRight = document.createElement("a");
        this.objRight.style.color = "blue";
        this.objRight.style.cursor = "pointer";
        this.objRight.innerHTML = "Next";
        this.objRight.classList.add("page-link");
        this.objRight.onclick = this.RighClick.bind(this);

        this.objFirst = document.createElement("a");
        this.objFirst.style.color = "blue";
        this.objFirst.style.cursor = "pointer";
        this.objFirst.innerHTML = "First";
        this.objFirst.classList.add("page-link");
        this.objFirst.onclick = this.FirstClick.bind(this);

        this.objLast = document.createElement("a");
        this.objLast.style.color = "blue";
        this.objLast.style.cursor = "pointer";
        this.objLast.innerHTML = "Last";
        this.objLast.classList.add("page-link");
        this.objLast.onclick = this.LastClick.bind(this);

        document.getElementById(HostingId+"_baisc_table_listing_index_left").innerHTML  = this.CountLeft;
        document.getElementById(HostingId+"_baisc_table_listing_index_right").innerHTML = this.CountRight;
        document.getElementById(HostingId+"_baisc_table_listing_left").appendChild(this.objLeft);
        document.getElementById(HostingId+"_baisc_table_listing_right").appendChild(this.objRight);
        document.getElementById(HostingId+"_baisc_table_listing_first").appendChild(this.objFirst);
        document.getElementById(HostingId+"_baisc_table_listing_last").appendChild(this.objLast);
        document.getElementById(HostingId+"_baisc_table_listing_nav").classList.remove("d-none");
    }
}

MksBasicTable.prototype.Remove = function () {
    if (this.WorkingObject !== undefined && this.WorkingObject !== null) {
		this.WorkingObject.parentNode.removeChild(this.WorkingObject);
	}
}