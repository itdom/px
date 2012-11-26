var CONST_POSITION = "absolute";
var CONST_NOTEDIV_ID = "noteDiv_" + new Date().getMilliseconds();

function validateValue(value, defaultValue) {
	return (value == undefined || value == null) ? defaultValue : value;
}

function validateNumber(value, defaultValue) {
	return (value == undefined || value == null || !/^[0-9]+$/.test("" + value)) ? defaultValue : value;
}

function Structure(x, y, width, height, noteType) {
	this.x = validateNumber(x, 0);
	this.y = validateNumber(y, 0);
	this.width = validateNumber(width, 800);
	this.height = validateNumber(height, 500);
	this.noteType = validateValue(noteType, "none");
	// init
	this.structureDiv = document.createElement("div");
	this.structureDiv.style.position = CONST_POSITION;
	this.structureDiv.style.left = this.x;
	this.structureDiv.style.top = this.y;
	this.structureDiv.style.width = this.width;
	this.structureDiv.style.height = this.height;
	this.structureDiv.style.border = "1px solid #00BFFF";
	document.body.appendChild(this.structureDiv);
	if ("none" != this.noteType) {
		this.noteDiv = document.createElement("div");
		this.noteDiv.id = CONST_NOTEDIV_ID;
		this.noteDiv.style.position = CONST_POSITION;
		if ("top" == this.noteType) {
			this.noteDiv.style.left = this.x;
			this.noteDiv.style.top = this.y - 40;
			this.noteDiv.style.width = this.width;
			this.noteDiv.style.height = "20";
		} else if ("bottom" == this.noteType) {
			this.noteDiv.style.left = this.x;
			this.noteDiv.style.top = this.y + this.height;
			this.noteDiv.style.width = this.width;
			this.noteDiv.style.height = 40;
		}
		this.noteDiv.style.border = "1px solid #00BFFF";
		this.noteDiv.style.paddingLeft = "3";
		this.noteDiv.style.paddingRight = "3";
		this.noteDiv.style.paddingTop = "2";
		this.noteDiv.style.paddingBottom = "2";
		document.body.appendChild(this.noteDiv);
	}
}

function BaseBlock(name, url, note, color, x, y, width, height, hasBorder) {
	this.baseDiv = document.createElement("div");
	this.baseDiv.style.position = CONST_POSITION;
	this.baseDiv.style.left = validateNumber(x, 0);
	this.baseDiv.style.top = validateNumber(y, 0);
	this.baseDiv.style.width = validateNumber(width, 80);
	this.baseDiv.style.height = validateNumber(height, 20);
	this.baseDiv.style.backgroundColor = validateValue(color, "#FFFFFF");
	this.baseDiv.style.border = hasBorder ? "1px solid #AFEEEE" : "none";
	this.baseDiv.style.verticalAlign = "middle";
	this.baseDiv.style.paddingLeft = "3";
	this.baseDiv.style.paddingRight = "3";
	this.baseDiv.style.paddingTop = "2";
	this.baseDiv.style.paddingBottom = "2";
	this.baseDiv.style.zIndex = "10";
	this.baseDiv.appendChild(document.createTextNode(validateValue(name, "")));
	this.baseDiv.title = note;
	if (url != null && url != "") {
		this.baseDiv.onclick = function() {
			location.href = url;
		};
	}
	this.baseDiv.onmouseover = function() {
		event.srcElement.style.cursor = "pointer";
		if ("none" != this.noteType) {
			document.getElementById(CONST_NOTEDIV_ID).innerText = validateValue(note, "");
		}
	};
	this.baseDiv.onmouseout = function() {
		event.srcElement.style.cursor = "default";
		if ("none" != this.noteType) {
			document.getElementById(CONST_NOTEDIV_ID).innerText = "";
		}
	};
}

Structure.prototype.addFunctionBlock = function(name, url, note, x, y, width, height) {
	this.structureDiv.appendChild(new BaseBlock(name, url, note, "#DEEBF3", x, y, width, height, true).baseDiv);
};

Structure.prototype.addInputBlock = function(name, url, note, x, y, width, height) {
	this.structureDiv.appendChild(new BaseBlock(name, url, note, "#FFFACD", x, y, width, height, true).baseDiv);
};

Structure.prototype.addOutputBlock = function(name, url, note, x, y, width, height) {
	this.structureDiv.appendChild(new BaseBlock(name, url, note, "#98FB98", x, y, width, height, true).baseDiv);
};

Structure.prototype.addMemoBlock = function(name, x, y, width, height) {
	this.structureDiv.appendChild(new BaseBlock(name, null, "", "#F5F5F5", x, y, width, height, true).baseDiv);
};

Structure.prototype.addSettingBlock = function(name, note, x, y, width, height) {
	var baseDiv = new BaseBlock(name, null, note, "#F0FFFF", x, y, width, height, true).baseDiv;
	baseDiv.style.zIndex = "0";
	this.structureDiv.appendChild(baseDiv);
};

Structure.prototype.addArrowBlock = function(x, y) {
	this.structureDiv.appendChild((new BaseBlock("---->", null, "", "", x, y, 40, 20, false).baseDiv));
};