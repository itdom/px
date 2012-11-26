//v.1.0 build 80111
/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
function dhtmlxDblCalendarObject(contId, isAutoDraw, options) {
	this.scriptName = "dhtmlxcalendar.js";
	this.entObj = document.createElement("DIV");
	this.winHeader = null;
	this.style = "dhtmlxdblcalendar";
	this.winTitle = "dhtmlxDblCalendarObject";
	this.uid = "sc&dblCal" + Math.round(1000000 * Math.random());
	this.numLoaded = 2;
	this.options = {isWinHeader:false, headerButtons:"", isWinDrag:false, msgClose:"Close", msgMinimize:"Minimize", msgToday:"Today"};
	if (options) {
		for (x in options) {
			this.options[x] = options[x];
		}
	}
	this.entBox = document.createElement("TABLE");
	this.entBox.cellPadding = "0px";
	this.entBox.cellSpacing = "0px";
	this.entBox.className = this.style;
	this.entObj.appendChild(this.entBox);
	var entRow = this.entBox.insertRow(0);
	var calLeft = entRow.insertCell(0);
	calLeft.style.paddingRight = "2px";
	var calRight = entRow.insertCell(1);
	this.leftCalendar = new dhtmlxCalendarObject(calLeft, isAutoDraw, this.options);
	this.leftCalendar._dblC = this;
	this.leftCalendar.setOnClickHandler(this.doOnCLeftClick);
	this.rightCalendar = new dhtmlxCalendarObject(calRight, isAutoDraw, this.options);
	this.rightCalendar._dblC = this;
	this.rightCalendar.setOnClickHandler(this.doOnCRightClick);
	this.doOnClick = null;
	this.onLanguageLoaded = null;
	this.getPosition = this.leftCalendar.getPosition;
	this.startDrag = this.leftCalendar.startDrag;
	this.stopDrag = this.leftCalendar.stopDrag;
	this.onDrag = this.leftCalendar.onDrag;
	this.drawHeader = this.leftCalendar.drawHeader;
	if (typeof (contId) != "string") {
		this.con = contId;
	} else {
		this.con = document.getElementById(contId);
	}
	var self = this;
}
dhtmlxDblCalendarObject.prototype.setHeader = function (isVisible, isDrag, btnsOpt) {
	this.leftCalendar.options.isWinHeader = this.options.isWinHeader = isVisible;
	this.leftCalendar.options.isWinDrag = this.options.isWinDrag = isDrag;
	if (btnsOpt) {
		this.options.headerButtons = this.leftCalendar.options.headerButtons = btnsOpt;
	}
	if (this.isAutoDraw) {
		this.drawHeader();
	}
};
dhtmlxDblCalendarObject.prototype.setYearsRange = function (minYear, maxYear) {
	var cs = [this.leftCalendar, this.rightCalendar];
	for (ind in cs) {
		cs[ind].options.yearsRange = [parseInt(minYear), parseInt(maxYear)];
		cs[ind].allYears = [];
		for (var i = minYear; i <= maxYear; i++) {
			cs[ind].allYears.push(i);
		}
	}
};
dhtmlxDblCalendarObject.prototype.show = function () {
	this.parent.style.display = "block";
};
dhtmlxDblCalendarObject.prototype.hide = function () {
	this.parent.style.display = "none";
};
dhtmlxDblCalendarObject.prototype.createStructure = function () {
	if (this.options.isWinHeader) {
		var headerRow = this.entBox.insertRow(0).insertCell(0);
		headerRow.colSpan = 2;
		headerRow.align = "right";
		this.winHeader = document.createElement("DIV");
		headerRow.appendChild(this.winHeader);
	}
	this.setParent(this.con);
};
dhtmlxDblCalendarObject.prototype.draw = function (options) {
	if (!this.parent) {
		this.createStructure();
	}
	this.drawHeader();
	this.leftCalendar.draw(options);
	this.rightCalendar.draw(options);
	this.isAutoDraw = true;
};
dhtmlxDblCalendarObject.prototype.loadUserLanguage = function (lang, userCBfunction) {
	this.numLoaded = 0;
	if (userCBfunction) {
		this.onLanguageLoaded = userCBfunction;
	}
	this.leftCalendar.loadUserLanguage(lang, this.languageLoaded);
	this.rightCalendar.loadUserLanguage(lang, this.languageLoaded);
};
dhtmlxDblCalendarObject.prototype.languageLoaded = function (status) {
	var self = this._dblC;
	self.numLoaded++;
	if (self.numLoaded == 2) {
		for (param in this.options) {
			self.options[param] = this.options[param];
		}
		if (this.isAutoDraw) {
			self.drawHeader();
		}
		if (self.onLanguageLoaded) {
			self.onLanguageLoaded(status);
		}
	}
};
dhtmlxDblCalendarObject.prototype.setParent = function (newParent) {
	if (newParent) {
		this.parent = newParent;
		this.parent.appendChild(this.entObj);
	}
};
dhtmlxDblCalendarObject.prototype.setOnClickHandler = function (func) {
	this.attachEvent("onClick", func);
};
dhtmlxDblCalendarObject.prototype.doOnCLeftClick = function (date) {
	this._dblC.rightCalendar.setSensitive(date, null);
	if (this._dblC.doOnClick) {
		this._dblC.doOnClick(date, this);
	}
	return true;
};
dhtmlxDblCalendarObject.prototype.doOnCRightClick = function (date) {
	this._dblC.leftCalendar.setSensitive(null, date);
	if (this._dblC.doOnClick) {
		this._dblC.doOnClick(date, this);
	}
	return true;
};
dhtmlxDblCalendarObject.prototype.setSensitive = function () {
	this.leftCalendar.setSensitive(null, this.leftCalendar.date);
	this.rightCalendar.setSensitive(this.rightCalendar.date, null);
};
dhtmlxDblCalendarObject.prototype.minimize = function () {
	if (!this.winHeader) {
		return;
	}
	var tr = this.winHeader.parentNode.parentNode.nextSibling;
	tr.parentNode.parentNode.style.width = parseInt(tr.parentNode.parentNode.offsetWidth) + "px";
	if (tr) {
		tr.style.display = (tr.style.display == "none") ? "block" : "none";
	}
};
dhtmlxDblCalendarObject.prototype.setDate = function (dateFrom, dateTo) {
	this.leftCalendar.setDate(dateFrom);
	this.rightCalendar.setDate(dateTo);
	this.leftCalendar.setSensitive(null, this.rightCalendar.date);
	this.rightCalendar.setSensitive(this.leftCalendar.date, null);
};
dhtmlxDblCalendarObject.prototype.setDateFormat = function (format) {
	this.leftCalendar.setDateFormat(format);
	this.rightCalendar.setDateFormat(format);
};
function dhtmlxCalendarObject(contId, isAutoDraw, options) {
	this.isAutoDraw = isAutoDraw;
	this.contId = contId;
	this.scriptName = "dhtmlxcalendar.js";
	this.date = this.cutTime(new Date());
	this.selDate = this.cutTime(new Date());
	this.curDate = this.cutTime(new Date());
	this.entObj = document.createElement("DIV");
	this.monthPan = document.createElement("TABLE");
	this.dlabelPan = document.createElement("TABLE");
	this.daysPan = document.createElement("TABLE");
	this.parent = null;
	this.style = "dhtmlxcalendar";
	this.doOnClick = null;
	this.sensitiveFrom = null;
	this.sensitiveTo = null;
	this.activeCell = null;
	this.hotCell = null;
	this.winHeader = null;
	this.onLanguageLoaded = null;
	this.dragging = false;
	this.winTitle = "dhtmlxCalendarObject";
	this.uid = "sc&Cal" + Math.round(1000000 * Math.random());
	this.dhx_Event();
	this.options = {btnPrev:"&laquo;", btnBgPrev:null, btnNext:"&raquo;", btnBgNext:null, yearsRange:[1900, 2100], isMonthEditable:false, isYearEditable:false, isWinHeader:false, headerButtons:"TMX", isWinDrag:true};
	defLeng = {langname:"en-us", dateformat:"%Y-%m-%d", monthesFNames:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthesSNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], daysFNames:["Sunday", "Monday", "Tuesday", "Wednday", "Thursday", "Friday", "Saturday"], daysSNames:["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekend:[0, 6], weekstart:0, msgClose:"Close", msgMinimize:"Minimize", msgToday:"Today"};
	if (!window.dhtmlxCalendarLangModules) {
		window.dhtmlxCalendarLangModules = {};
	}
	window.dhtmlxCalendarLangModules["en-us"] = defLeng;
	if (window.dhtmlxCalendarObjects) {
		window.dhtmlxCalendarObjects[window.dhtmlxCalendarObjects.length] = this;
	} else {
		window.dhtmlxCalendarObjects = [this];
	}
	for (lg in defLeng) {
		this.options[lg] = defLeng[lg];
	}
	if (options) {
		for (param in options) {
			this.options[param] = options[param];
		}
	}
	this.loadUserLanguage();
	if (options) {
		for (param in options) {
			this.options[param] = options[param];
		}
	}
	this.allYears = Array();
	with (this.options) {
		for (var i = yearsRange[0]; i <= yearsRange[1]; i++) {
			this.allYears.push(i);
		}
	}
	if (isAutoDraw !== false) {
		this.draw(options);
	}
	return this;
}
dhtmlxCalendarObject.prototype.setHeader = function (isVisible, isDrag, btnsOpt) {
	with (this.options) {
		isWinHeader = isVisible;
		isWinDrag = isDrag;
		if (btnsOpt) {
			headerButtons = btnsOpt;
		}
	}
};
dhtmlxCalendarObject.prototype.setYearsRange = function (minYear, maxYear) {
	this.options.yearsRange = [parseInt(minYear), parseInt(maxYear)];
	this.allYears = [];
	for (var i = minYear; i <= maxYear; i++) {
		this.allYears.push(i);
	}
};
dhtmlxCalendarObject.prototype.createStructure = function () {
	var self = this;
	this.entObj.className = this.style;
	if (this.options.isWinHeader) {
		this.winHeader = document.createElement("DIV");
		this.entObj.appendChild(this.winHeader);
	}
	this.entBox = document.createElement("TABLE");
	this.entBox.className = "entbox";
	with (this.entBox) {
		cellPadding = "0px";
		cellSpacing = "0px";
		width = "100%";
	}
	this.entObj.appendChild(this.entBox);
	var monthBox = this.entBox.insertRow(0).insertCell(0);
	with (this.monthPan) {
		cellPadding = "1px";
		cellSpacing = "0px";
		width = "100%";
		align = "center";
	}
	this.monthPan.className = "dxcalmonth";
	monthBox.appendChild(this.monthPan);
	var dlabelBox = this.entBox.insertRow(1).insertCell(0);
	dlabelBox.appendChild(this.dlabelPan);
	with (this.dlabelPan) {
		cellPadding = "0px";
		cellSpacing = "0px";
		width = "100%";
		align = "center";
	}
	this.dlabelPan.className = "dxcaldlabel";
	var daysBox = this.entBox.insertRow(2).insertCell(0);
	daysBox.appendChild(this.daysPan);
	with (this.daysPan) {
		cellPadding = "1px";
		cellSpacing = "0px";
		width = "100%";
		align = "center";
	}
	if (_isIE || _isKHTML) {
		this.daysPan.className = "dxcaldays_ie";
	} else {
		this.daysPan.className = "dxcaldays";
	}
	this.daysPan.onmousemove = function (e) {
		self.doHotKeys(e);
	};
	this.daysPan.onmouseout = function () {
		self.endHotKeys();
	};
	if (typeof (this.contId) != "string") {
		this.con = this.contId;
	} else {
		this.con = document.getElementById(this.contId);
	}
	if (this.con.nodeName == "INPUT") {
		var div = document.createElement("DIV");
		with (div.style) {
			position = "absolute";
			display = "none";
			marginLeft = this.con.offsetWidth + "px";
		}
		this.setParent(div);
		this.con.parentNode.insertBefore(div, this.con);
		this.con.onclick = function () {
			self.show();
		};
		this.con._c = this.parent;
		this.doOnClick = function (date) {
			self.con.value = self.getFormatedDate(self.options.dateformat, date);
			self.hide();
			return true;
		};
	} else {
		this.setParent(this.con);
	}
};
dhtmlxCalendarObject.prototype.drawHeader = function () {
	if (this._dblC) {
		return;
	}
	if (!this.options.isWinHeader) {
		return;
	}
	var self = this;
	if (!this.winHeader) {
		return false;
	}
	while (this.winHeader.hasChildNodes()) {
		this.winHeader.removeChild(this.winHeader.firstChild);
	}
	this.winHeader.className = "dhtmlxcalendarHeader";
	this.winHeader.onselectstart = function () {
		return false;
	};
	if (this.options.headerButtons.indexOf("X") >= 0) {
		var btnClose = document.createElement("DIV");
		btnClose.innerHTML = "&times;";
		btnClose.className = "button_close";
		btnClose.setAttribute("title", this.options.msgClose);
		btnClose.onmousedown = function (e) {
			e = e || event;
			self.hide();
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		};
		this.winHeader.appendChild(btnClose);
	}
	if (this.options.headerButtons.indexOf("M") >= 0) {
		var btnMin = document.createElement("DIV");
		btnMin.style.backgroundColor = "#ff9";
		btnMin.className = "button";
		btnMin.setAttribute("title", this.options.msgMinimize);
		btnMin.onmousedown = function (e) {
			e = e || event;
			self.minimize();
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		};
		this.winHeader.appendChild(btnMin);
	}
	if (this.winHeader.firstChild && (this.options.headerButtons.indexOf("T") >= 0)) {
		var separator = document.createElement("DIV");
		separator.className = "separator";
		this.winHeader.appendChild(separator);
	}
	if (this.options.headerButtons.indexOf("T") >= 0) {
		var btnToday = document.createElement("DIV");
		btnToday.style.backgroundColor = "#99f";
		btnToday.className = "button";
		btnToday.setAttribute("title", this.options.msgToday);
		btnToday.onmousedown = function (e) {
			e = e || event;
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			self.setDate(new Date());
			if (self.doOnClick) {
				self.doOnClick(new Date());
			}
		};
		this.winHeader.appendChild(btnToday);
	}
	var label = document.createElement("DIV");
	label.className = "winTitle";
	label.appendChild(document.createTextNode(this.winTitle));
	label.setAttribute("title", this.winTitle);
	this.winHeader.appendChild(label);
	if (this.options.isWinDrag) {
		this.winHeader.onmousedown = function (e) {
			self.startDrag(e);
		};
	}
};
dhtmlxCalendarObject.prototype.drawMonth = function () {
	var self = this;
	if (this.monthPan.childNodes.length > 0) {
		this.monthPan.removeChild(this.monthPan.childNodes[0]);
	}
	var row = this.monthPan.insertRow(0);
	var cArLeft = row.insertCell(0);
	var cContent = row.insertCell(1);
	var cArRight = row.insertCell(2);
	cArLeft.align = "left";
	cArLeft.className = "month_btn_left";
	var btnLabel = document.createElement("SPAN");
	btnLabel.innerHTML = this.options.btnPrev;
	cArLeft.appendChild(btnLabel);
	cArLeft.onclick = function () {
		self.prevMonth();
	};
	cArRight.align = "right";
	cArRight.className = "month_btn_right";
	var btnLabel = document.createElement("SPAN");
	btnLabel.innerHTML = this.options.btnNext;
	cArRight.appendChild(btnLabel);
	cArRight.onclick = function () {
		self.nextMonth();
	};
	cContent.align = "center";
	var mHeader = document.createElement("TABLE");
	with (mHeader) {
		cellPadding = "0px";
		cellSpacing = "0px";
		align = "center";
	}
	var mRow = mHeader.insertRow(0);
	var cMonth = mRow.insertCell(0);
	var cComma = mRow.insertCell(1);
	var cYear = mRow.insertCell(2);
	cContent.appendChild(mHeader);
	this.planeMonth = document.createElement("DIV");
	this.planeMonth._c = this;
	this.planeMonth.appendChild(document.createTextNode(this.options.monthesFNames[this.date.getMonth()]));
	this.planeMonth.className = "planeMonth";
	cMonth.appendChild(this.planeMonth);
	if (this.options.isMonthEditable) {
		this.planeMonth.style.cursor = "pointer";
		this.editorMonth = new dhtmlxRichSelector({nodeBefore:this.planeMonth, valueList:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], titleList:this.options.monthesFNames, activeValue:this.options.monthesFNames[this.date.getMonth()], onSelect:this.onMonthSelect});
		this.editorMonth._c = this;
	}
	cComma.appendChild(document.createTextNode(","));
	cComma.className = "comma";
	this.planeYear = document.createElement("DIV");
	this.planeYear._c = this;
	this.planeYear.appendChild(document.createTextNode(this.date.getFullYear()));
	this.planeYear.className = "planeYear";
	cYear.appendChild(this.planeYear);
	if (this.options.isYearEditable) {
		this.planeYear.style.cursor = "pointer";
		this.editorYear = new dhtmlxRichSelector({nodeBefore:this.planeYear, valueList:this.allYears, titleList:this.allYears, activeValue:this.date.getFullYear(), onSelect:this.onYearSelect, isOrderedList:true, isNumbersList:true, isAllowUserValue:true});
		this.editorYear._c = this;
	}
};
dhtmlxCalendarObject.prototype.drawDayLabels = function () {
	var self = this;
	if (this.dlabelPan.childNodes.length > 0) {
		this.dlabelPan.removeChild(this.dlabelPan.childNodes[0]);
	}
	var row = this.dlabelPan.insertRow(-1);
	row.className = "daynames";
	for (var i = 0; i < 7; i++) {
		var cDay = row.insertCell(i);
		cDay.appendChild(document.createTextNode(this.getDayName(i)));
	}
};
dhtmlxCalendarObject.prototype.drawDays = function () {
	var self = this;
	if (this.daysPan.childNodes.length > 0) {
		this.daysPan.removeChild(this.daysPan.childNodes[0]);
	}
	var row = {}, cell = {};
	var tempDate = new Date(this.date);
	tempDate.setDate(1);
	var day1 = (tempDate.getDay() - this.options.weekstart) % 7;
	if (day1 < 0) {
		day1 += 7;
	}
	tempDate.setDate(-day1);
	tempDate.setDate(tempDate.getDate() + 1);
	if (tempDate.getDate() < tempDate.getDay()) {
		tempDate.setMonth(tempDate.getMonth() - 1);
	}
	for (var weekNumber = 0; weekNumber < 6; weekNumber++) {
		row = this.daysPan.insertRow(-1);
		for (var i = 0; i < 7; i++) {
			cell = row.insertCell(-1);
			cell.setAttribute("id", this.uid + tempDate.getFullYear() + tempDate.getMonth() + tempDate.getDate());
			cell.appendChild(document.createTextNode(tempDate.getDate()));
			cell.thisdate = tempDate.toString();
			cell.className = "thismonth";
			if (tempDate.getMonth() != this.date.getMonth()) {
				cell.className = "othermonth";
			}
			if (this.sensitiveFrom && (tempDate.valueOf() < this.sensitiveFrom.valueOf())) {
				cell.className = cell.className + " insensitive";
				tempDate.setDate(tempDate.getDate() + 1);
				continue;
			}
			if (this.sensitiveTo && (tempDate.valueOf() > this.sensitiveTo.valueOf())) {
				cell.className = cell.className + " insensitive";
				tempDate.setDate(tempDate.getDate() + 1);
				continue;
			}
			if (this.isWeekend(i) && tempDate.getMonth() == this.date.getMonth()) {
				cell.className = "weekend";
			}
			if (tempDate.toDateString() == this.curDate.toDateString()) {
				cell.className = "current";
			}
			if (tempDate.toDateString() == this.selDate.toDateString()) {
				this.activeCell = cell;
				this.addClass(cell, "selected");
			}
			cell.onclick = function () {
				if (!self.doOnClick || self.doOnClick(this.thisdate)) {
					self.setDate(this.thisdate);
					self.callEvent("onClick", [this.thisdate]);
				}
			};
			tempDate.setDate(tempDate.getDate() + 1);
		}
	}
};
dhtmlxCalendarObject.prototype.draw = function (options) {
	var self = this;
	if (this.loadingLanguage) {
		setTimeout(function () {
			self.draw(options);
			return;
		}, 20);
		return;
	} else {
		if (!this.parent) {
			this.createStructure(options);
		}
	}
	this.drawHeader();
	this.drawMonth();
	this.drawDayLabels();
	this.drawDays();
	this.isAutoDraw = true;
};
dhtmlxCalendarObject.prototype.startDrag = function (e) {
	e = e || event;
	if ((e.button === 0) || (e.button === 1)) {
		if (this.dragging) {
			this.stopDrag(e);
		}
		this.drag_mx = e.clientX;
		this.drag_my = e.clientY;
		this.drag_spos = this.getPosition(this.parent);
		document.body.appendChild(this.parent);
		with (this.parent.style) {
			left = this.drag_spos[0] + "px";
			top = this.drag_spos[1] + "px";
			margin = "0px";
			position = "absolute";
		}
		this.bu_onmousemove = document.body.onmousemove;
		var self = this;
		document.body.onmousemove = function (e) {
			self.onDrag(e);
		};
		this.bu_onmouseup = document.body.onmouseup;
		document.body.onmouseup = function (e) {
			self.stopDrag(e);
		};
		this.dragging = true;
	}
};
dhtmlxCalendarObject.prototype.onDrag = function (e) {
	e = e || event;
	if ((e.button === 0) || (e.button === 1)) {
		var delta_x = this.drag_mx - e.clientX;
		var delta_y = this.drag_my - e.clientY;
		this.parent.style.left = this.drag_spos[0] - delta_x + "px";
		this.parent.style.top = this.drag_spos[1] - delta_y + "px";
	} else {
		this.stopDrag(e);
	}
};
dhtmlxCalendarObject.prototype.stopDrag = function (e) {
	e = e || event;
	document.body.onmouseup = (this.bu_onmouseup === window.undefined) ? null : this.bu_onmouseup;
	document.body.onmousemove = (this.bu_onmousemove === window.undefined) ? null : this.bu_onmousemove;
	this.dragging = false;
};
dhtmlxCalendarObject.prototype.doHotKeys = function (e) {
	e = e || event;
	var cell = ((e.target) ? e.target : e.srcElement);
	if (cell.className.toString().indexOf("insensitive") >= 0) {
		this.endHotKeys();
	} else {
		if (this.hotCell) {
			this.resetHotClass(this.hotCell);
		}
		this.addClass(cell, "hover");
		this.hotCell = cell;
	}
};
dhtmlxCalendarObject.prototype.endHotKeys = function () {
	if (this.hotCell) {
		this.resetHotClass(this.hotCell);
		this.hotCell = null;
	}
};
dhtmlxCalendarObject.prototype.minimize = function () {
	if (!this.winHeader) {
		return;
	}
	this.entBox.style.display = (this.entBox.style.display == "none") ? "block" : "none";
};
dhtmlxCalendarObject.prototype.loadUserLanguage = function (language, userCBfunction) {
	if (userCBfunction) {
		this.onLanguageLoaded = userCBfunction;
	}
	if (!language) {
		language = "en-us";
	}
	this.loadingLanguage = language;
	if (!language) {
		this.loadUserLanguageCallback(false);
		return;
	}
	if (language == this.options.langname) {
		this.loadUserLanguageCallback(true);
		return;
	}
	var __lm = window.dhtmlxCalendarLangModules;
	if (__lm[language]) {
		for (lg in __lm[language]) {
			this.options[lg] = __lm[language][lg];
		}
		this.loadUserLanguageCallback(true);
		return;
	}
	var src, path = null;
	var scripts = document.getElementsByTagName("SCRIPT");
	for (var i = 0; i < scripts.length; i++) {
		if (src = scripts[i].getAttribute("src")) {
			if (src.indexOf(this.scriptName) >= 0) {
				path = src.substr(0, src.indexOf(this.scriptName));
				break;
			}
		}
	}
	if (path === null) {
		this.loadUserLanguageCallback(false);
		return;
	}
	this.options.langname = language;
	var langPath = path + "lang/" + language + ".js";
	for (var i = 0; i < scripts.length; i++) {
		if (src = scripts[i].getAttribute("src")) {
			if (src == langPath) {
				return;
			}
		}
	}
	var script = document.createElement("SCRIPT");
	script.setAttribute("language", "Java-Script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", langPath);
	document.body.appendChild(script);
};
dhtmlxCalendarObject.prototype.loadUserLanguageCallback = function (status) {
	this.loadingLanguage = null;
	if (this.isAutoDraw !== false) {
		this.draw();
	}
	if (this.onLanguageLoaded && (typeof (this.onLanguageLoaded) == "function")) {
		this.onLanguageLoaded(status);
	}
};
function loadLanguageModule(langModule) {
	var __c = window.dhtmlxCalendarObjects;
	for (var i = 0; i < __c.length; i++) {
		if (__c[i].loadingLanguage == langModule.langname) {
			for (lg in langModule) {
				__c[i].options[lg] = langModule[lg];
			}
			__c[i].loadUserLanguageCallback(true);
		}
	}
	window.dhtmlxCalendarLangModules[langModule.langname] = langModule;
}
dhtmlxCalendarObject.prototype.show = function () {
	this.parent.style.display = "block";
};
dhtmlxCalendarObject.prototype.hide = function () {
	this.parent.style.display = "none";
};
dhtmlxCalendarObject.prototype.setDateFormat = function (format) {
	this.options.dateformat = format;
};
dhtmlxCalendarObject.prototype.isWeekend = function (k) {
	var q = k + this.options.weekstart;
	if (q > 6) {
		q -= 7;
	}
	for (var i = 0; i < this.options.weekend.length; i++) {
		if (this.options.weekend[i] == q) {
			return true;
		}
	}
	return false;
};
dhtmlxCalendarObject.prototype.getDayName = function (k) {
	var q = k + this.options.weekstart;
	if (q > 6) {
		q = q - 7;
	}
	return this.options.daysSNames[q];
};
dhtmlxCalendarObject.prototype.cutTime = function (date) {
	date = new Date(date);
	var ndate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	return ndate;
};
dhtmlxCalendarObject.prototype.onYearSelect = function (value) {
	this._c.date = new Date(this._c.date);
	if (!isNaN(value)) {
		this._c.date = new Date(this._c.date.setFullYear(value));
	}
	this._c.draw();
	return (!isNaN(value));
};
dhtmlxCalendarObject.prototype.onMonthSelect = function (value) {
	this._c.date = new Date(this._c.date.setMonth(value));
	this._c.draw();
	return true;
};
dhtmlxCalendarObject.prototype.setParent = function (newParent) {
	if (newParent) {
		this.parent = newParent;
		this.parent.appendChild(this.entObj);
	}
};
dhtmlxCalendarObject.prototype.setDate = function (date) {
	dateTmp = this.setFormatedDate(this.options.dateformat, date);
	this.draw();
	if (isNaN(dateTmp) || dateTmp == null) {
		date = new Date(date);
	} else {
		date = dateTmp;
	}
	if ((date.getFullYear() == this.date.getFullYear()) && (date.getMonth() == this.date.getMonth())) {
		this.date = new Date(this.cutTime(date));
		this.selDate = new Date(this.cutTime(date));
		var cell = document.getElementById(this.uid + date.getFullYear() + date.getMonth() + date.getDate());
		if (cell) {
			this.resetClass(this.activeCell);
			this.addClass(cell, "selected");
			this.activeCell = cell;
		}
	} else {
		this.date = new Date(this.cutTime(date));
		this.selDate = new Date(this.cutTime(date));
		if (this.isAutoDraw) {
			this.draw();
		}
	}
};
dhtmlxCalendarObject.prototype.addClass = function (obj, styleName) {
	obj.className += " " + styleName;
};
dhtmlxCalendarObject.prototype.resetClass = function (obj) {
	obj.className = obj.className.toString().split(" ")[0];
};
dhtmlxCalendarObject.prototype.resetHotClass = function (obj) {
	obj.className = obj.className.toString().replace(/hover/, "");
};
dhtmlxCalendarObject.prototype.setSkin = function (newSkin) {
	this.entObj.className = this.style;
	if (newSkin) {
		this.addClass(this.entObj, this.style + "_" + newSkin);
	}
};
dhtmlxCalendarObject.prototype.getDate = function () {
	return this.selDate.toString();
};
dhtmlxCalendarObject.prototype.nextMonth = function () {
	this.date = new Date(this.date);
	this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
	if (this.isAutoDraw) {
		this.draw();
	}
};
dhtmlxCalendarObject.prototype.prevMonth = function () {
	this.date = new Date(this.date);
	this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
	if (this.isAutoDraw) {
		this.draw();
	}
};
dhtmlxCalendarObject.prototype.setOnClickHandler = function (func) {
	this.doOnClick = func;
};
dhtmlxCalendarObject.prototype.setPosition = function (argA, argB, argC) {
	if (typeof (argA) == "object") {
		var posAr = this.getPosition(argA);
		var left = posAr[0] + argA.offsetWidth + (argC || 0);
		var top = posAr[1] + (argB || 0);
	}
	this.entObj.style.position = "absolute";
	this.entObj.style.top = (top || argA) + "px";
	this.entObj.style.left = (left || argB) + "px";
};
dhtmlxCalendarObject.prototype.close = function (func) {
	this.entObj.parentNode.removeChild(true);
};
dhtmlxCalendarObject.prototype.getPosition = function (oNode, pNode) {
	if (!pNode) {
		var pNode = document.body;
	}
	var oCurrentNode = oNode;
	var iLeft = 0;
	var iTop = 0;
	while ((oCurrentNode) && (oCurrentNode != pNode)) {
		iLeft += oCurrentNode.offsetLeft - oCurrentNode.scrollLeft;
		iTop += oCurrentNode.offsetTop - oCurrentNode.scrollTop;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	if (pNode == document.body) {
		if (_isIE) {
			if (document.documentElement.scrollTop) {
				iTop += document.documentElement.scrollTop;
			}
			if (document.documentElement.scrollLeft) {
				iLeft += document.documentElement.scrollLeft;
			}
		} else {
			if (!_isFF) {
				iLeft += document.body.offsetLeft;
				iTop += document.body.offsetTop;
			}
		}
	}
	return new Array(iLeft, iTop);
};
dhtmlxCalendarObject.prototype.getFormatedDate = function (dateformat, date) {
	if (!dateformat) {
		dateformat = this.options.dateformat;
	}
	if (!date) {
		date = this.selDate;
	}
	date = new Date(date);
	var out = "";
	var plain = true;
	for (var i = 0; i < dateformat.length; i++) {
		var replStr = dateformat.substr(i, 1);
		if (plain) {
			if (replStr == "%") {
				plain = false;
				continue;
			}
			out += replStr;
		} else {
			switch (replStr) {
			  case "e":
				replStr = date.getDate();
				break;
			  case "d":
				replStr = date.getDate();
				if (replStr.toString().length == 1) {
					replStr = "0" + replStr;
				}
				break;
			  case "j":
				var x = new Date(date.getFullYear(), 0, 0, 0, 0, 0, 0);
				replStr = Math.ceil((date.valueOf() - x.valueOf()) / 1000 / 60 / 60 / 24 - 1);
				while (replStr.toString().length < 3) {
					replStr = "0" + replStr;
				}
				break;
			  case "a":
				replStr = this.options.daysSNames[date.getDay()];
				break;
			  case "W":
				replStr = this.options.daysFNames[date.getDay()];
				break;
			  case "c":
				replStr = 1 + date.getMonth();
				break;
			  case "m":
				replStr = 1 + date.getMonth();
				if (replStr.toString().length == 1) {
					replStr = "0" + replStr;
				}
				break;
			  case "b":
				replStr = this.options.monthesSNames[date.getMonth()];
				break;
			  case "M":
				replStr = this.options.monthesFNames[date.getMonth()];
				break;
			  case "y":
				replStr = date.getFullYear();
				replStr = replStr.toString().substr(2);
				break;
			  case "Y":
				replStr = date.getFullYear();
			}
			out += replStr;
			plain = true;
		}
	}
	return out;
};
dhtmlxCalendarObject.prototype.setFormatedDate = function (dateformatarg, date) {
	if (!date) {
		return false;
	}
	if (!dateformatarg) {
		dateformatarg = this.options.dateformat;
	}
	date = date.toString();
	function parseMonth(val) {
		var tmpAr = new Array(this.options.monthesSNames, this.options.monthesFNames);
		for (var j = 0; j < tmpAr.length; j++) {
			for (var i = 0; i < tmpAr[j].length; i++) {
				if (tmpAr[j][i].indexOf(val) == 0) {
					return i;
				}
			}
		}
		return -1;
	}
	var outputDate = new Date();
	var j = 0;
	for (var i = 0; i < dateformatarg.length; i++) {
		var _char = dateformatarg.substr(i, 1);
		if (_char == "%") {
			var _cd = dateformatarg.substr(i + 1, 1);
			var _nextpc = dateformatarg.indexOf("%", i + 1);
			var _nextDelim = dateformatarg.substr(i + 2, _nextpc - i - 1 - 1);
			var _nDelimInDatePos = date.indexOf(_nextDelim, j);
			if (_nextDelim == "") {
				_nDelimInDatePos = date.length;
			}
			if (_nDelimInDatePos == -1) {
				return null;
			}
			var value = date.substr(j, _nDelimInDatePos - j);
			j = _nDelimInDatePos + _nextDelim.length;
			switch (_cd) {
			  case "d":
				outputDate.setDate(parseInt(value));
				break;
			  case "c":
				outputDate.setMonth(value - 1);
				break;
			  case "m":
				outputDate.setMonth(value - 1);
				break;
			  case "M":
				var val = parseMonth(value);
				if (val != -1) {
					outputDate.setMonth(parseInt(val));
				} else {
					return null;
				}
				break;
			  case "b":
				var val = parseMonth(value);
				if (val != -1) {
					outputDate.setMonth(parseInt(val));
				} else {
					return null;
				}
				break;
			  case "Y":
				outputDate.setFullYear(parseInt(value));
			}
		}
	}
	this.date = outputDate;
	this.selDate = outputDate;
	return this.selDate;
};
dhtmlxCalendarObject.prototype.setSensitive = function (fromDate, toDate) {
	if (fromDate) {
		this.sensitiveFrom = this.cutTime(fromDate);
	}
	if (toDate) {
		this.sensitiveTo = this.cutTime(toDate);
	}
	if (this.isAutoDraw) {
		this.draw();
	}
};
function dhtmlxRichSelector(parametres) {
	for (x in parametres) {
		this[x] = parametres[x];
	}
	this.initValue = this.activeValue;
	if (!this.selectorSize) {
		this.selectorSize = 7;
	}
	var self = this;
	this.blurTimer = null;
	this.nodeBefore.onclick = function () {
		self.show();
	};
	this.editor = document.createElement("TEXTAREA");
	this.editor.value = this.activeValue;
	this.editor._s = this;
	this.editor.className = "dhtmlxRichSelector";
	this.editor.onfocus = this.onFocus;
	this.editor.onblur = this.onBlur;
	this.editor.onkeydown = this.onKeyDown;
	this.editor.onkeyup = this.onKeyUp;
	this.selector = document.createElement("SELECT");
	this.selector.size = this.selectorSize;
	this.selector.className = "dhtmlxRichSelector";
	if (this.valueList) {
		for (var i = 0; i < this.valueList.length; i++) {
			this.selector.options[i] = new Option(this.titleList[i], this.valueList[i], false, false);
		}
	}
	this.selector._s = this;
	this.selector.onfocus = this.onFocus;
	this.selector.onblur = this.onBlur;
	this.selector.onclick = function () {
		self.onSelect(self.selector.value);
	};
	this.selector.getIndexByValue = function (Value, isFull) {
		var Select = this;
		Value = Value.toString().toUpperCase();
		if (!isFull) {
			isFull = false;
		}
		for (var i = 0; i < Select.length; i++) {
			var i_value = Select[i].text.toUpperCase();
			if (isFull) {
				if (i_value == Value) {
					return i;
				}
			} else {
				if (i_value.indexOf(Value) == 0) {
					return i;
				}
			}
		}
		if (Select._s.isOrderedList) {
			if (Select._s.isNumbersList) {
				if (isNaN(Value)) {
					return -1;
				}
			}
			i_value = Select[0].text.substring(0, Value.length).toUpperCase();
			if (i_value > Value) {
				return 0;
			}
			i_value = Select[Select.length - 1].text.substring(0, Value.length);
			if (i_value < Value) {
				return Select.length - 1;
			}
		}
		return -1;
	};
	this.con = document.createElement("DIV");
	this.con.className = "dhtmlxRichSelector";
	with (this.con.style) {
		width = "auto";
		display = "none";
	}
	this.con.appendChild(this.editor);
	this.con.appendChild(this.selector);
	this.nodeBefore.parentNode.insertBefore(this.con, this.nodeBefore);
	return this;
}
dhtmlxRichSelector.prototype.show = function () {
	this.con.style.display = "block";
	with (this.selector.style) {
		marginTop = parseInt(this.nodeBefore.offsetHeight) + "px";
		width = "auto";
	}
	with (this.editor.style) {
		width = parseInt(this.nodeBefore.offsetWidth) + 15 + "px";
		height = parseInt(this.nodeBefore.offsetHeight) + "px";
	}
	this.selector.selectedIndex = this.selector.getIndexByValue(this.activeValue);
	this.editor.focus();
};
dhtmlxRichSelector.prototype.hide = function () {
	this.con.style.display = "none";
};
dhtmlxRichSelector.prototype.onBlur = function () {
	var self = this._s;
	self.blurTimer = setTimeout(function () {
		if (self.isAllowUserValue) {
			if (self.onSelect(self.editor.value)) {
				self.activeValue = self.editor.value;
			}
		} else {
			if (self.onSelect(self.selector.value)) {
				self.activeValue = self.selector.value;
			}
		}
	}, 10);
};
dhtmlxRichSelector.prototype.onFocus = function () {
	var self = this._s;
	if (self.blurTimer) {
		clearTimeout(self.blurTimer);
		self.blurTimer = null;
	}
	if (this === this._s.selector) {
		self.editor.focus();
	}
};
dhtmlxRichSelector.prototype.onKeyDown = function (e) {
	var self = this._s;
	var e = e || event;
	var isCase = true;
	switch (e.keyCode) {
	  case 33:
		if (self.selector.selectedIndex < self.selector.size) {
			self.selector.selectedIndex = 0;
		} else {
			self.selector.selectedIndex -= parseInt(self.selector.size) - 1;
		}
		break;
	  case 34:
		if (self.selector.length - self.selector.selectedIndex < self.selector.size) {
			self.selector.selectedIndex = self.selector.length - 1;
		} else {
			self.selector.selectedIndex += parseInt(self.selector.size) - 1;
		}
		break;
	  case 35:
		if (e.ctrlKey) {
			self.selector.selectedIndex = self.selector.length - 1;
		}
		break;
	  case 36:
		if (e.ctrlKey) {
			self.selector.selectedIndex = 0;
		}
		break;
	  case 38:
		if (self.selector.selectedIndex == 0) {
		} else {
			self.selector.selectedIndex -= 1;
		}
		break;
	  case 40:
		if (self.selector.selectedIndex == self.selector.length - 1) {
		} else {
			self.selector.selectedIndex += 1;
		}
		break;
	  default:
		isCase = false;
	}
	if (isCase) {
		self.editor.value = self.selector.options[self.selector.selectedIndex].text;
		self.editor.focus();
	}
};
dhtmlxRichSelector.prototype.onKeyUp = function (e) {
	var self = this._s;
	var e = e || event;
	switch (e.keyCode) {
	  case 13:
		self.editor.blur();
		break;
	  case 27:
		self.editor.value = self.initValue;
		self.selector.selectedIndex = self.selector.getIndexByValue(self.initValue, true);
		self.editor.blur();
		break;
	  default:
		var selectedIndex = self.selector.getIndexByValue(self.editor.value);
		if (selectedIndex >= 0) {
			self.selector.selectedIndex = selectedIndex;
		}
	}
};
dhtmlxCalendarObject.prototype.dhx_Event = function () {
	this.dhx_SeverCatcherPath = "";
	this.attachEvent = function (original, catcher, CallObj) {
		CallObj = CallObj || this;
		original = "ev_" + original;
		if ((!this[original]) || (!this[original].addEvent)) {
			var z = new this.eventCatcher(CallObj);
			z.addEvent(this[original]);
			this[original] = z;
		}
		return (original + ":" + this[original].addEvent(catcher));
	};
	this.callEvent = function (name, arg0) {
		if (this["ev_" + name]) {
			return this["ev_" + name].apply(this, arg0);
		}
		return true;
	};
	this.checkEvent = function (name) {
		if (this["ev_" + name]) {
			return true;
		}
		return false;
	};
	this.eventCatcher = function (obj) {
		var dhx_catch = new Array();
		var m_obj = obj;
		var func_server = function (catcher, rpc) {
			catcher = catcher.split(":");
			var postVar = "";
			var postVar2 = "";
			var target = catcher[1];
			if (catcher[1] == "rpc") {
				postVar = "<?xml version=\"1.0\"?><methodCall><methodName>" + catcher[2] + "</methodName><params>";
				postVar2 = "</params></methodCall>";
				target = rpc;
			}
			var z = function () {
			};
			return z;
		};
		var z = function () {
			if (dhx_catch) {
				var res = true;
			}
			for (var i = 0; i < dhx_catch.length; i++) {
				if (dhx_catch[i] != null) {
					var zr = dhx_catch[i].apply(m_obj, arguments);
					res = res && zr;
				}
			}
			return res;
		};
		z.addEvent = function (ev) {
			if (typeof (ev) != "function") {
				if (ev && ev.indexOf && ev.indexOf("server:") == 0) {
					ev = new func_server(ev, m_obj.rpcServer);
				} else {
					ev = eval(ev);
				}
			}
			if (ev) {
				return dhx_catch.push(ev) - 1;
			}
			return false;
		};
		z.removeEvent = function (id) {
			dhx_catch[id] = null;
		};
		return z;
	};
	this.detachEvent = function (id) {
		if (id != false) {
			var list = id.split(":");
			this[list[0]].removeEvent(list[1]);
		}
	};
};
//v.1.0 build 80111
/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/

