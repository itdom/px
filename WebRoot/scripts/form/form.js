/**
 * @author WYB
 */

var oPopup = null;
function checkReadFiled(msg) {
	oPopup = window.createPopup();
	var sPopup = '<div id="printInfo" style="background-color:#FFFABC;font-size:12px;line-height:18px;width:200px;height:20px;border:1px outset #FFC77F;top:1px;right:0px;">' + msg + '</div>';
	oPopup.document.body.innerHTML = sPopup;
	oPopup.show(event.screenX - 5, event.screenY - 5, 200, 20);
}

function alertPopup(info) {
	oPopup = window.createPopup();
	var sPopup = '<div align="center" id="printInfo" style="background-color:#FFFABC;font-size:12px;width:200px;height:50px;padding-top:16px;border:1px solid red;top:1px;right:0px;">' + info + '</div>';
	oPopup.document.body.innerHTML = sPopup;
	oPopup.show((screen.availWidth - top.screenLeft - 200) / 2, (screen.availHeight - top.screenTop - 50) / 2, 200, 50);
}

// 选中所有复选框列表
function selectAllBox(fieldName) {
	var e = document.getElementsByTagName("input");
	for(var i = 0; i < e.length; i ++) {
		if(e[i].type == 'checkbox') {
			e[i].checked = $(fieldName).checked == true ? false : true;
		}
	}
}

// 删除被选择的复选框指定的内容
function delSelectedBox(formName) {
	var b = false;
	var e = document.getElementsByTagName("input");
	for(var i = 0; i < e.length; i++) {
		if(e[i].type == 'checkbox' && e[i].checked) {
			b = true;
			break;
		}
	}
	if(!b) {
		alert('还没有选择删除对象!');
		return;
	}
	delConfirm(formName);
}

/**
 *FORM页面 离开时，提示确认
 */
function outFormConfirm(formName) {
	if (confirm("是否确定此操作?") ) {
		$(formName).submit();
	}
}

/**
 *删除确认
 */
function delConfirm(formName) {
	if (confirm("是否确定删除?") ) {
		$(formName).submit();
	}
}

function removeConfirm(obj, url) {
	if (confirm("是否确定删除?") ) {
		obj.href = url;
	}
}

function getNowSystemDate(obj) {
	var date = new Date();
	return date.getYear() + "-" + (date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
}

//
function checkEmpty(field, fieldName) {
	if (isEmpty(field.value)) {
		oPopup = window.createPopup();
		var sPopup = '<div align="center" id="printInfo" style="background-color:#FFFABC;font-size:12px;width:200px;height:50px;padding-top:16px;border:1px solid red;top:1px;right:0px;">' + fieldName + '不能为空!</div>';
		oPopup.document.body.innerHTML = sPopup;
		oPopup.show((screen.availWidth - top.screenLeft - 200) / 2, (screen.availHeight - top.screenTop - 50) / 2, 200, 50);
	}
}

function validateForm(oForm) {
	for (var i = 0; i < oForm.getElementsByTagName("table").length; i ++) {
		var oTable = oForm.getElementsByTagName("table")[i];
		if (oTable.style.display == "none") {
			continue;
		}
		for (var j = 0; j < oTable.rows.length; j ++) {
			var oRow = oTable.rows[j];
			if (oRow.style.display == "none") {
				continue;
			}
			for (var k = 0; k < oRow.cells.length; k ++) {
				var oCell = oRow.cells[k];
				if (oCell.style.display == "none") {
					continue;
				}
				var isCheck = false;
				if (oCell.innerText.split("\*").length > 1) {
					isCheck = true;
					for (var m = 0; m < oCell.childNodes.length; m++) {
						if (oCell.childNodes[m].nodeName == "INPUT" || oCell.childNodes[m].nodeName == "SELECT" || oCell.childNodes[m].nodeName == "TEXTAREA") {
							isCheck = false;
							break;
						}
					}
				}
				if (isCheck) {
					var oCellNext = oCell.nextSibling;
					var isInput = true;
					var e = oCellNext.getElementsByTagName("input");
					if (e.length == 0) {
						isInput = false;
					}
					for (var m = 0; m < e.length; m++) {
						if (e[m].type == "hidden" || e[m].type == "button") {
							isInput = false;
							break;
						}
					}
					if (!isInput) {
						e = oCellNext.getElementsByTagName("select");
						if (e.length == 0) {
							e = oCellNext.getElementsByTagName("textarea");
						}
					}
				
					if (e.length == 0) {
						alert("缺少可编辑属性");
						return false;
					} else {
						
						if (e[0].type == "radio" || e[0].type == "checkbox") {
							var b = true;
							for (var n = 0; n < e.length; n ++) {
								if (e[n].checked) {
									b = false;
									break;
								}
							}
							if (b) {
								alert(oCell.innerText.split("\*")[0] + " 不能为空");
								return false;
							}
						}
						if (e[0].type != "hidden" && (isEmpty(e[0].value) || /^\s*$/.test(e[0].value))) {
							alert(oCell.innerText.split("\*")[0] + " 不能为空");
							return false;
						}
					}
				}
			}
		}
	}
	if (popup == null) {
		submitProcess(oForm);
	}
	return true;
}
function validateForm3(oForm) {
	for (var i = 0; i < oForm.getElementsByTagName("table").length; i ++) {
		var oTable = oForm.getElementsByTagName("table")[i];
		if (oTable.style.display == "none") {
			continue;
		}
		for (var j = 0; j < oTable.rows.length; j ++) {
			var oRow = oTable.rows[j];
			if (oRow.style.display == "none") {
				continue;
			}
			for (var k = 0; k < oRow.cells.length; k ++) {
				var oCell = oRow.cells[k];
				if (oCell.style.display == "none") {
					continue;
				}
				var isCheck = false;
				if (oCell.innerText.split("\*").length > 1) {
					isCheck = true;
					for (var m = 0; m < oCell.childNodes.length; m++) {
						if (oCell.childNodes[m].nodeName == "INPUT" || oCell.childNodes[m].nodeName == "SELECT" || oCell.childNodes[m].nodeName == "TEXTAREA") {
							isCheck = false;
							break;
						}
					}
				}
				if (isCheck) {
					var oCellNext = oCell.nextSibling;
					var isInput = true;
					var e = oCellNext.getElementsByTagName("input");
					if (e.length == 0) {
						isInput = false;
					}else{
						for (var m = 0; m < e.length; m++) {
							if (e[m].type == "button") {
								isInput = false;
								break;
							}
						}
					}
					if (!isInput) {
						e = oCellNext.getElementsByTagName("select");
						if (e.length == 0) {
							e = oCellNext.getElementsByTagName("textarea");
						}
					}
					
					if (e.length == 0) {
						alert("缺少可编辑属性");
						return false;
					} else {
						
						if (e[0].type == "radio" || e[0].type == "checkbox") {
							var b = true;
							for (var n = 0; n < e.length; n ++) {
								if (e[n].checked) {
									b = false;
									break;
								}
							}
							if (b) {
								alert(oCell.innerText.split("\*")[0] + " 不能为空");
								return false;
							}
						}
						if (e[0].type != "hidden" && (isEmpty(e[0].value) || /^\s*$/.test(e[0].value))) {
							alert(oCell.innerText.split("\*")[0] + " 不能为空");
							return false;
						}
					}
				}
			}
		}
	}
	if (popup == null) {
		submitProcess(oForm);
	}
	return true;
}
function validateForm2(oForm) {
	for (var i = 0; i < oForm.getElementsByTagName("table").length; i ++) {
		var oTable = oForm.getElementsByTagName("table")[i];
		if (oTable.style.display == "none") {
			continue;
		}
		for (var j = 0; j < oTable.rows.length; j ++) {
			var oRow = oTable.rows[j];
			if (oRow.style.display == "none") {
				continue;
			}
			for (var k = 0; k < oRow.cells.length; k ++) {
				var oCell = oRow.cells[k];
				if (oCell.style.display == "none") {
					continue;
				}
				if (oCell.innerText.split("\*").length > 1) {
					var oCellNext = oCell.nextSibling;
					var e = oCellNext.getElementsByTagName("input");
					if (e.length == null) {
						e = oCellNext.getElementsByTagName("select");
						alertPopup("缺少可编辑属性");
						return false;
					}else {
						if (e[0].type == "radio" || e[0].type == "checkbox") {
							var b = true;
							for (var n = 0; n < e.length; n ++) {
								if (e[n].checked) {
									b = false;
									break;
								}
							}
							if (b) {
								alertPopup(oCell.innerText.split("\*")[0] + " 不能为空");
								return false;
							}
						}
						if (e[0].type != "hidden" && isEmpty(e[0].value)) {
							alertPopup(oCell.innerText.split("\*")[0] + " 不能为空");
							return false;
						}
					}
				}
			}
		}
	}
	return true;
}
function validateForm(oForm) {      
	for (var i = 0; i < oForm.getElementsByTagName("table").length; i ++) {
		var oTable = oForm.getElementsByTagName("table")[i];
		if (oTable.style.display == "none") {
			continue;
		}
		for (var j = 0; j < oTable.rows.length; j ++) {
			var oRow = oTable.rows[j];
			if (oRow.style.display == "none") {
				continue;
			}
			for (var k = 0; k < oRow.cells.length; k ++) {
				var oCell = oRow.cells[k];
				if (oCell.style.display == "none") {
					continue;
				}
				var isCheck = false;
				if (oCell.innerText.split("\*").length > 1) {
					isCheck = true;
					for (var m = 0; m < oCell.childNodes.length; m++) {
						if (oCell.childNodes[m].nodeName == "INPUT" || oCell.childNodes[m].nodeName == "SELECT" || oCell.childNodes[m].nodeName == "TEXTAREA") {
							isCheck = false;
							break;
						}
					}
				}
				if (isCheck) {
					var oCellNext = oCell.nextSibling;
					var isInput = true;
					var e = oCellNext.getElementsByTagName("input");
					if (e.length == 0) {
						isInput = false;
					}
					for (var m = 0; m < e.length; m++) {
						if (e[m].type == "hidden" || e[m].type == "button") {
							isInput = false;
							break;
						}
					}
					if (!isInput) {
						e = oCellNext.getElementsByTagName("select");
						if (e.length == 0) {
							e = oCellNext.getElementsByTagName("textarea");
						}
					}

					if (e.length == 0) {
						alert("缺少可编辑属性");
						return false;
					} else {

						if (e[0].type == "radio" || e[0].type == "checkbox") {
							var b = true;
							for (var n = 0; n < e.length; n ++) {
								if (e[n].checked) {
									b = false;
									break;
								}
							}
							if (b) {
								alert(oCell.innerText.split("\*")[0] + " 不能为空");
								return false;
							}
						}
						if (e[0].type != "hidden" && (isEmpty(e[0].value) || /^\s*$/.test(e[0].value))) {
							alert(oCell.innerText.split("\*")[0] + " 不能为空");
							return false;
						}
					}
				}
			}
		}
	}
	if (popup == null) {
		submitProcess(oForm);
	}
	return true;
}
function validateForm4(oForm) {
	for (var i = 0; i < oForm.getElementsByTagName("table").length; i ++) {
		var oTable = oForm.getElementsByTagName("table")[i];
		if (oTable.style.display == "none") {
			continue;
		}
		for (var j = 0; j < oTable.rows.length; j ++) {
			var oRow = oTable.rows[j];
			if (oRow.style.display == "none") {
				continue;
			}
			for (var k = 0; k < oRow.cells.length; k ++) {
				var oCell = oRow.cells[k];
				if (oCell.style.display == "none") {
					continue;
				}
				var isCheck = false;
				if (oCell.innerText.split("\*").length > 1) {
					isCheck = true;
					for (var m = 0; m < oCell.childNodes.length; m++) {
						if (oCell.childNodes[m].nodeName == "INPUT" || oCell.childNodes[m].nodeName == "SELECT" || oCell.childNodes[m].nodeName == "TEXTAREA") {
							isCheck = false;
							break;
						}
					}
				}
				if (isCheck) {
					var oCellNext = oCell.nextSibling;
					var isInput = true;
					var e = oCellNext.getElementsByTagName("input");
					if (e.length == 0) {
						isInput = false;
					}
					for (var m = 0; m < e.length; m++) {
						if (e[m].type == "hidden" || e[m].type == "button") {
							isInput = false;
							break;
						}
					}
					if (!isInput) {
						e = oCellNext.getElementsByTagName("select");
						if (e.length == 0) {
							e = oCellNext.getElementsByTagName("textarea");
						}
					}

					if (e.length == 0) {
						alert("缺少可编辑属性");
						return false;
					} else {

						if (e[0].type == "radio" || e[0].type == "checkbox") {
							var b = true;
							for (var n = 0; n < e.length; n ++) {
								if (e[n].checked) {
									b = false;
									break;
								}
							}
							if (b) {
								alert(oCell.innerText.split("\*")[0] + " 不能为空");
								return false;
							}
						}
						if (e[0].type != "hidden" && (isEmpty(e[0].value) || /^\s*$/.test(e[0].value))) {
							alert(oCell.innerText.split("\*")[0] + " 不能为空");
							return false;
						}
					}
				}
			}
		}
	}
	return true;
}
function setTimeoutAlpha(obj) {
	if (obj.filters.alpha.opacity > 0) {
		obj.filters.alpha.opacity -= 1;
		setTimeout(setTimeoutAlpha, 1);
	} else {
		clearTimeout(setTimeoutAlpha);
	}
}
