
if (getCookie("username") != null) {
	if (getCookie("username").indexOf(",") != -1) {
		$("j_yey").value = getCookie("username").split(",")[1];
	}
	$("j_username0").value = getCookie("username").split(",")[0];
	$("j_password").focus();
} else {
	$("j_yey").focus();
}
function saveUsername(theForm) {
	var expires = new Date();
	expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	setCookie("username", theForm.j_username0.value + "," + theForm.j_yey.value, expires, "<c:url value=" / "/>");
}
function validateForm(form) {
	form.elements['j_username'].value = form.elements['j_username0'].value + "," + form.elements['j_yey'].value;
	if (form.elements['j_yey'].parentNode.parentNode.style.display != "none") {
		if (form.elements['j_yey'].value == "") {
			alert("School ID could not null.");
			return false;
		}
	}
	return validateRequired(form);
}
function passwordHint() {
	if ($("j_username").value.length == 0) {
		alert("<s:text name='errors.requiredField'><s:param><s:text name='label.username'/></s:param></s:text>");
		$("j_username").focus();
	} else {
		location.href = "<c:url value='/passwordHint.action'/>?username=" + $("j_username").value;
	}
}
function required() {
	this.aa = new Array("j_username", "<s:text name='errors.requiredField'><s:param><s:text name='label.username'/></s:param></s:text>", new Function("varName", " return this[varName];"));
	this.ab = new Array("j_password", "<s:text name='errors.requiredField'><s:param><s:text name='login.label.password'/></s:param></s:text>", new Function("varName", "return this[varName];"));
}

