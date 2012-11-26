function trimAllHA(avalue){
	return avalue.replace(/(\s+)|(\u3000+)|(^\ue4c6+)/g,"");
}
function isExist(value) {
	return value != undefined && value != null && value != "";
}

function isNotExist(value) {
	return value == undefined || value == null || value == "";
}

function isEmpty(value) {
	return value == undefined || value == null || value == "";
}

function isNotEmpty(value) {
	return value != undefined && value != null && value != "";
}

function contain(str1, str2) {
	return str1.indexOf(str2) != -1;
}

function isNumber(value) {
	return ("" + value).match(/^[0-9]+$/);
}

function isNotNumber(value) {
	return !isNumber(value);
}

function isFloat(value) {
	return ("" + value).match(/^[0-9]+\.[0-9]+$/);
}

function isNotFloat(value) {
	return !isFloat(value);
}

function isNotStrLength(str, min, max) {
	if (isNotEmpty(str)) {
		return str.length < min || str.length > max;
	}
	return false;
}

function isValidStr(str) {
	str = str.replace(/_|[0-9]|[a-z]|[A-Z]/g, "");
	return str.length == 0;
}

function isNotValidStr(str) {
	return !isValidStr(str);
}

function isNumberRange(value, min, max) {
	if (!isNumber(value)) {
		return false;
	}
	if (min != "" && value < min) {
		return false;
	}
	if (max != "" && value > max) {
		return false;
	}
	return true;
}

function isInteger(value) {
	var pattern = /^(\d|(-\d))\d*$/;
	if (!pattern.test(theField.value)) {
		return false;
	}
	return true;
}

function isIntegerRange(value, min, max) {
	if (!isInteger(value)) {
		return false;
	}
	if (min != "" && value < min) {
		return false;
	}
	if (max != "" && value > max) {
		return false;
	}
	return true;
}

function isPositiveNumber(value) {
	if (!isNumber(value)) {
		return false;
	}
	if (value.charAt(0) == '-') {
		return false;
	}
	return true;
}

function isMaxLength(value, maxLength) {
	if (value.length > maxLength) {
		return false;
	}
	return true;
}

function isEmail(theField) {
	var pattern = /^.+@.+\..+$/;
	if (!pattern.test(theField.value)) {
		return false;
	}
	return true;
}

function isReadField(obj) {
	var obj = eval(obj);
	obj.blur();
}
//|15[0|3|6|7|8|9]|18[8|9]\d
function isTelePhone(value){
	return /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]|15[0|3|6|7|8|9]|18[8|9]\d{8}$)/.test(value);
}

function IdCardRegCheck(obj)
{
   var str = obj.value;
   var reg = /^([0-9]{14}[\d,x]|[0-9]{17}[\d,x])$/;
   var flag = reg.test(str);
   return flag;
} 

var popup = null;

function getCookieForSubmit(name) {
				var prefix = name + "=";
				var start = document.cookie.indexOf(prefix);
				if (start == -1) {
					return null;
				}
				var end = document.cookie.indexOf(";", start + prefix.length);
				if (end == -1) {
					end = document.cookie.length;
				}
				var value = document.cookie.substring(start + prefix.length, end);
				return unescape(value);
			}
function submitProcess(form) {
	/*var img = document.createElement("img");
	img.src = "/px/images/loading.gif";
	img.align = "middle";
	var div = document.createElement("div");
	div.style.zIndex = 9999;
	div.style.position = "absolute";
	div.style.top = "100px";
	div.style.left = "300px";
	div.style.display = "block";
	div.appendChild(img);
	div.appendChild(document.createTextNode("Now loading..."));
	document.body.appendChild(div);*/
	popup = window.createPopup();
	var popBody = popup.document.body;
	popBody.style.border = "solid #FF6347 1px";
	popBody.innerHTML = "<img src=\"/images/loading.gif\" align=\"middle\"/> Processing...";

	popup.show(300, 250, 200, 40, document.body);

	for (var i = 0; i < form.elements.length; i++) {
		if ("INPUT" == form.elements[i].nodeName && "submit" == form.elements[i].type) {
			form.elements[i].disabled = true;
		}
	}
}

function getProcess() {
	popup = window.createPopup();
	var popBody = popup.document.body;
	popBody.style.border = "solid #FF6347 1px";
	popBody.innerHTML = "<img src=\"/images/loading.gif\" align=\"middle\"/> Waitting...";
	popup.show(300, 250, 200, 40, document.body);
}
