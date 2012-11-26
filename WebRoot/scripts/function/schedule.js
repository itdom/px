var currentUserTeachAreaId = null;
var isMainTeachArea = null;
var clazzSelect = null;
var clazzInstanceSelect = null;
var dateDiv = null;
var defaultDiv = null;
var scheduleDiv = null;
var detailsDiv = null;
var courseDiv = null;
var yearSelect = null;
var weekSelect = null;
var monthSelect = null;
var defaultTable = null;
var weekTable = null;
var monthTable = null;
var courseTable = null;
var weekDeatilsTable = null;
var monthDeatilsTable = null;
var addChangeTable = null;
var currentClassName = "";
var addChangeButton = null;
var timeDefTable = null;
var addChangeDiv = null;
var closeChangeButton = null;

function Clazz() {
	this.id = "";
	this.name = "";
}

function ClazzInstance() {
	this.id = "";
	this.name = "";
	this.teachAreaId = "";
	this.timeDefArray = new Array();
	this.term = new Term();
	this.courseInstanceArray = new Array();
}

function CourseInstance() {
	this.id = "";
	this.name = "";
}

function Term() {
	this.id = "";
	this.name = "";
	this.gradeLevel = "";
}

function TimeDef() {
	this.id = "";
	this.order = "";
	this.startTime = "";
	this.endTime = "";
	this.teachHour = "";
}

function initClazzSelect() {
	for (var i = 0; i < clazzArray.length; i++) {
		var option = document.createElement("option");
		option.value = clazzArray[i].id;
		option.text = clazzArray[i].name;
		clazzSelect.add(option);
	}
}

function showClazzInstance() {
	clearSelect(clazzInstanceSelect, 1);
	if (clazzSelect.value == "") {
		return;
	}
	var clazzInstanceArray = clazzMap.get(clazzSelect.value);
	if (clazzInstanceArray != null) {
		for (var i = 0; i < clazzInstanceArray.length; i++) {
			var option = document.createElement("option");
			option.value = clazzInstanceArray[i].id;
			option.text = clazzInstanceArray[i].name;
			clazzInstanceSelect.add(option);
		}
	}
}

function getCurrentClazzInstance() {
	var clazzInstanceArray = clazzMap.get(clazzSelect.value);
	if (clazzInstanceArray == null) {
		return null;
	}
	for (var i = 0; i < clazzInstanceArray.length; i++) {
		if (clazzInstanceArray[i].id == clazzInstanceSelect.value) {
			return clazzInstanceArray[i];
		}
	}
	return null;
}

function settingCustom(select) {
	var sth = select.parentNode.nextSibling.childNodes[1];
	var stm = sth.nextSibling.nextSibling;
	var eth = stm.nextSibling.nextSibling;
	var etm = eth.nextSibling.nextSibling;
	var th = etm.nextSibling.nextSibling;
	if (select.value == "") {
		sth.disabled = false;
		stm.disabled = false;
		eth.disabled = false;
		etm.disabled = false;
		th.disabled = false;
	} else {
		sth.disabled = true;
		stm.disabled = true;
		eth.disabled = true;
		etm.disabled = true;
		th.disabled = true;
	}
}

function initYear() {
	var year = new Date().getYear();
	yearSelect.options[0].value = year - 1;
	yearSelect.options[1].value = year;
	yearSelect.options[2].value = 1 + parseInt(year);
	yearSelect.options[0].text = year - 1;
	yearSelect.options[1].text = year;
	yearSelect.options[2].text = 1 + parseInt(year);
	yearSelect.value = year;
}

function initMonthTable() {
	clearTable(monthTable, 1);
	var date = new Date(yearSelect.value, monthSelect.value, 1);
	var weekDay = date.getDay();
	weekDay = weekDay == 0 ? 7 : weekDay;
	var dayArray = new Array();
	for (var i = 0; i < weekDay - 1; i++) {
		dayArray.push("_");
	}
	var dayCount = getDaysOfMonth(date.getYear(), date.getMonth() + 1);
	for (var i = 1; i <= dayCount; i++) {
		dayArray.push(i);
	}
	for (var i = 0; i < dayArray.length; i++) {
		var row;
		if (i % 7 == 0) {
			row = monthTable.insertRow(monthTable.rows.length);
		} else {
			row = monthTable.rows[monthTable.rows.length - 1];
		}
		var cell = row.insertCell(row.cells.length);
		cell.className = "tint";
		if (dayArray[i] == "_") {
		} else {
			cell.vAlign = "top";
			cell.onclick = function() {
				showDetailsMonth(this);
			};
			cell.onmouseover = function() {
				this.style.cursor = "pointer";
				currentClassName = this.className;
				this.className = "hightlight";
			};
			cell.onmouseout = function() {
				this.style.cursor = "default";
				this.className = currentClassName;
			};
			var dayHidden = document.createElement("input");
			dayHidden.type = "hidden";
			dayHidden.value = dayArray[i];
			cell.appendChild(dayHidden);
			var daySpan = document.createElement("span");
			daySpan.style.color = "#0000CD";
			daySpan.appendChild(document.createTextNode(dayArray[i]));
			cell.appendChild(daySpan);
			// append a span for courses
			cell.appendChild(document.createElement("br"));
			cell.appendChild(document.createElement("span"));
		}
	}
	var lastRow = monthTable.rows[monthTable.rows.length - 1];
	var ec = 7 - lastRow.cells.length;
	for (var i = 0; i < ec; i++) {
		var cell = lastRow.insertCell(lastRow.cells.length);
		cell.className = "tint";
	}
}

function defaultTableClassName(table) {
	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[i].cells.length; j++) {
			table.rows[i].cells[j].className = "tint";
		}
	}
}

function getWeekCellByDate(date, timeDefId) {
	var m = date.split("-")[1];
	var d = date.split("-")[2];
	if (m.indexOf("0") == 0) {
		m = m.substring(1);
	}
	if (d.indexOf("0") == 0) {
		d = d.substring(1);
	}
	var col = 0;
	for (var i = 1; i < weekTable.rows[0].cells.length; i++) {
		if (weekTable.rows[0].cells[i].childNodes[0].value == m + "-" + d) {
			col = i;
			break;
		}
	}
	var row = 0;
	for (var i = 1; i < weekTable.rows.length; i++) {
		if (weekTable.rows[i].cells[0].childNodes[0].value == timeDefId) {
			row = i;
			break;
		}
	}
	if (col == 0 && row == 0) {
		return null;
	}
	return weekTable.rows[row].cells[col];
}