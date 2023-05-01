function CoreUIBasicUploaderWidget (scope, params) {
    CoreUIObjectWidget.call(this, scope, params);
	self = this;

    this.ObjectName = "core_ui_basic_uploader_widget";
    this.Content = `
        <div class="card" id="[ID]">
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="[ID]_id_uploader_package_path">Please select package ([FILE_TYPE] File)</label>
                        <input type="file" class="form-control-file" id="[ID]_id_uploader_package_path">
                    </div>
                </form>
                <button type="button" id="[ID]_id_uploader_action" class="btn btn-primary" onclick="CoreUIBasicUploaderWidgetBuilder.GetInstance().Upload();">[ACTION]</button>
                <div class="d-none" id="[ID]_id_uploader_progress">
                    <br/>
                    <div class="progress">
                        <div id="[ID]_id_uploader_progress_bar" class="progress-bar progress-bar-striped" style="min-width: 20px;"></div>
                    </div>
                    <div>
                        <span class="text-muted" id="[ID]_id_uploader_progress_item">0%</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    this.Params             = params;
	this.FilePath 			= "";
    this.FileName 			= "";
	this.FileSize 			= 0;
	this.Reader 			= new FileReader();
	this.OnUploadCompete 	= null;
	this.Modal 				= null;
	this.FileType			= [];
	this.Error 				= false; 

    this.Reader.onload = function(e) {
		self = CoreUIBasicUploaderWidgetBuilder.GetInstance();
		console.log(self.FileName, self.FileSize);

		var data    		= self.Reader.result;
		var MAX_CHUNK_SIZE  = 4096;
		var buffer  		= new Uint8Array(data);
		var chunks  		= parseInt(self.FileSize / MAX_CHUNK_SIZE);

		if (self.FileSize % MAX_CHUNK_SIZE != 0) {
			// Append last chunk.
			chunks++;
		}

		start = 0;
		end   = 0;
		percCunck = parseInt(100 / chunks);
		console.log(chunks);
		for (i = 0; i < chunks; i++) {
			if ( (self.FileSize - i * MAX_CHUNK_SIZE) < MAX_CHUNK_SIZE ) {
				// We are at last packet
				start = i * MAX_CHUNK_SIZE;
				end   = self.FileSize;
			} else {
				start = i * MAX_CHUNK_SIZE;
				end   = start + MAX_CHUNK_SIZE;
			}

			if (start < end) {
				var arrayData = buffer.subarray(start, end);
				var dataToSend = [];
				for (idx = 0; idx < arrayData.length; idx++) {
					dataToSend.push(arrayData[idx]);
				}

				var payload = {
					upload: {
						action: "upload",
						file: self.FileName,
						size: self.FileSize,
						content: dataToSend,
						chunk: i+1,
						chunk_size: (end - start),
						chunks: chunks,
						file_path: self.FilePath
					}
				}

				self.Scope.Object.Application.API.UploadFileContent(payload);
			}
		}
	}

	return this;
}

CoreUIBasicUploaderWidget.prototype              = Object.create(CoreUIObjectWidget.prototype);
CoreUIBasicUploaderWidget.prototype.constructor  = CoreUIBasicUploaderWidget;

CoreUIBasicUploaderWidget.prototype.PreBuild = function () {
    this.HTML = this.HTML.split("[FILE_TYPE]").join(this.FileType);
	this.HTML = this.HTML.split("[ACTION]").join(this.Params.action_title);

    if (this.IsModal == true) {
		if (this.Modal !== null) {
			this.Modal.Remove();
		}
		this.Modal = new MksBasicModal("uploader");
		this.Modal.SetTitle("Upload File");
		this.Modal.SetContent(this.HTML);
	}
}

CoreUIBasicUploaderWidget.prototype.PostBuild = function () {
    
}

CoreUIBasicUploaderWidget.prototype.SetFileType = function (type) {
	this.FileType = type;
}

CoreUIBasicUploaderWidget.prototype.SetFilePath = function (path) {
	this.FilePath = path;
}

CoreUIBasicUploaderWidget.prototype.Upload = function () {
	var fileObj = document.getElementById(this.WidgetID+"_id_uploader_package_path");
	// Show progress bar
	document.getElementById(this.WidgetID+"_id_uploader_progress").classList.remove("d-none");
	this.ReadImage(fileObj.files[0]);
}

CoreUIBasicUploaderWidget.prototype.UpdateProgress = function (data, uploader) {
	$("#"+uploader.WidgetID+"_id_uploader_progress_bar").css("width", data.precentage).text(data.precentage);
	switch(data.status) {
		case "inprogress":
			document.getElementById(uploader.WidgetID+"_id_uploader_progress_item").innerHTML = data.message;
			break;
		case "error":
			document.getElementById(uploader.WidgetID+"_id_uploader_progress_item").innerHTML = data.message;
			uploader.Error = true;

			if (data.precentage == "100%") {
				if (uploader.OnUploadCompete !== null) {
					uploader.OnUploadCompete(data.file, uploader.Scope.Object);
				}
			}
			break;
		case "done":
			document.getElementById(uploader.WidgetID+"_id_uploader_progress_item").innerHTML = data.message;
			if (uploader.OnUploadCompete !== null) {
				uploader.OnUploadCompete(data.file, uploader.Scope.Object);
			}
			break;
	}
}

CoreUIBasicUploaderWidget.prototype.SetProgressText = function (msg) {
	document.getElementById(this.WidgetID+"_id_uploader_progress_item").innerHTML = msg;
}

/*
	.zip - application/x-zip-compressed
	.bin - application/octet-stream
	.pdf - application/pdf
	.docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document
*/
CoreUIBasicUploaderWidget.prototype.ReadImage = function (file) {
	var fileTypeCorrect = false;

	if (file === undefined || file === null) {
		return;
	}

	console.log(file.type);
	if (this.FileType === undefined || this.FileType === null) {
		fileTypeCorrect = true;
	} else if (this.FileType !== undefined && this.FileType !== null && this.FileType.length == 0) { 
		fileTypeCorrect = true;
	} else {
		// Check if the file is zip file.
		for (index in this.FileType) {
			item = this.FileType[index];
			console.log(item, file.type);
			if (file.type && file.type.indexOf(item) !== -1) {
				fileTypeCorrect = true;
			}
		}
	}

	if (fileTypeCorrect == false) {
		document.getElementById(this.WidgetID+"_id_uploader_progress_item").innerHTML = "Incorrect file type... Upload " + this.FileType + " only.";
		return;
	}

	this.FileName = file.name;
	this.FileSize = file.size;
	this.Reader.readAsArrayBuffer(file);
}

CoreUIBasicUploaderWidget.prototype.SetModal = function (enabled) {
	this.IsModal = enabled;
}

CoreUIBasicUploaderWidget.prototype.ShowModal = function () {
	this.Modal.Build("lg");
	this.Modal.Show();
}

CoreUIBasicUploaderWidget.prototype.HideModal = function () {
	this.Modal.Hide();
}

var CoreUIBasicUploaderWidgetBuilder = (function () {
	var Instance;

	function CreateInstance (scope, params) {
		var obj = new CoreUIBasicUploaderWidget(scope, params);
		return obj;
	}

	return {
		GetInstance: function (scope, params) {
			if (!Instance) {
				Instance = CreateInstance(scope, params);
			}

			return Instance;
		}
	};
})();