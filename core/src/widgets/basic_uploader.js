/*
	NOTE: Only one uploader per window (ids are static).
*/
function MksBasicUploader (application) {
	self 					= this;

	this.Application		= application;
	this.FileName 			= "";
	this.FileSize 			= 0;
	this.Reader 			= new FileReader();
	this.OnUploadCompete 	= null;
	this.WithModal			= false;
	this.Modal 				= null;
	this.FileType			= [];
	
	this.BasicUploaderContainer = `
		<div class="card" id="id-uploader-object">
			<div class="card-body">
				<form>
					<div class="form-group">
						<label for="id_uploader_package_path">Please select package ([FILE_TYPE] File)</label>
						<input type="file" class="form-control-file" id="id_uploader_package_path">
					</div>
				</form>
				<button type="button" id="id_uploader_action" class="btn btn-primary" onclick="MksBasicUploaderBuilder.GetInstance().Upload();">[ACTION]</button>
				<div class="d-none" id="id_uploader_progress">
					<br/>
					<div class="progress">
						<div id="id_uploader_progress_bar" class="progress-bar progress-bar-striped" style="min-width: 20px;"></div>
					</div>
					<div>
						<span class="text-muted" id="id_uploader_progress_item">0%</span>
					</div>
				</div>
			</div>
		</div>
	`;

	this.Reader.onload = function(e) {
		self = MksBasicUploaderBuilder.GetInstance();
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
						chunks: chunks
					}
				}

				application.API.UploadFileContent(payload);
			}
		}
	}
	
	return this;
}

MksBasicUploader.prototype.Show = function () {
	this.Modal.Build("lg");
	this.Modal.Show();
}

MksBasicUploader.prototype.Hide = function () {
	this.Modal.Hide();
}

MksBasicUploader.prototype.SetFileType = function (type) {
	this.FileType = type;
}

MksBasicUploader.prototype.Build = function (obj, action_title) {
	var uploaderObj = document.getElementById("id-uploader-object");
	if (uploaderObj !== undefined && uploaderObj !== null) {
		uploaderObj.parentNode.removeChild(uploaderObj);
	}

	var html = this.BasicUploaderContainer;
	html = html.split("[FILE_TYPE]").join(this.FileType);
	html = html.split("[ACTION]").join(action_title);

	if (this.WithModal == true) {
		if (this.Modal !== null) {
			this.Modal.Remove();
		}
		this.Modal = new MksBasicModal("uploader");
		this.Modal.SetTitle("Upload File");
		this.Modal.SetContent(html);
	} else {
		obj.innerHTML = html;
	}
}

MksBasicUploader.prototype.Upload = function () {
	var fileObj = document.getElementById("id_uploader_package_path");
	// Show progress bar
	document.getElementById("id_uploader_progress").classList.remove("d-none");
	this.ReadImage(fileObj.files[0]);
}

MksBasicUploader.prototype.UpdateProgress = function (data, scope) {
	$("#id_uploader_progress_bar").css("width", data.precentage).text(data.precentage);
	switch(data.status) {
		case "inprogress":
			document.getElementById("id_uploader_progress_item").innerHTML = data.message;
			break;
		case "error":
			document.getElementById("id_uploader_progress_item").innerHTML = "Error";
			break;
		case "done":
			document.getElementById("id_uploader_progress_item").innerHTML = data.message;
			if (scope.OnUploadCompete !== null) {
				scope.OnUploadCompete(data.file, scope);
			}
			break;
	}
}

MksBasicUploader.prototype.SetProgressText = function (msg) {
	document.getElementById("id_uploader_progress_item").innerHTML = msg;
}

/*
	.zip - application/x-zip-compressed
	.bin - application/octet-stream
	.pdf - application/pdf
	.docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document
*/
MksBasicUploader.prototype.ReadImage = function (file) {
	var fileTypeCorrect = false;
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
		document.getElementById("id_uploader_progress_item").innerHTML = "Incorrect file type... Upload " + this.FileType + " only.";
		return;
	}

	this.FileName = file.name;
	this.FileSize = file.size;
	this.Reader.readAsArrayBuffer(file);
}

MksBasicUploader.prototype.SetModal = function (enabled) {
	this.WithModal = enabled;
}

var MksBasicUploaderBuilder = (function () {
	var Instance;

	function CreateInstance (application) {
		var obj = new MksBasicUploader(application);
		return obj;
	}

	return {
		GetInstance: function (application) {
			if (!Instance) {
				Instance = CreateInstance(application);
			}

			return Instance;
		}
	};
})();