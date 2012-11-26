<%@ page import="javax.servlet.http.Cookie"%>
<%--
  User: Kyll
  Time: 2008-6-23 16:13:59
--%>
<%@ include file="/common/taglibs.jsp"%>
<html xmlns:wb="http://open.weibo.com/wb">
	<head>
		<link href="<c:url value="/images/favicon.ico" />" rel="icon" />
		<link href="<c:url value="/images/favicon.ico" />" rel="shortcut icon" />
		<link rel="stylesheet" type="text/css" media="all"
			href="<c:url value='/styles/login.css'/>" />
		<style type="text/css">
			#pas {
				margin-left: 26px;
			}
			#j_yey {
				margin-left: 13px;
			}
		</style>
		<script type="text/javascript">
			function setCookie(name, value, expires, path, domain, secure) {
				document.cookie = name + "=" + escape(value)
						+ ((expires) ? "; expires=" + expires.toGMTString() : "")
						+ ((path) ? "; path=" + path : "")
						+ ((domain) ? "; domain=" + domain : "")
						+ ((secure) ? "; secure" : "");
			}

			function getCookie(name) {
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

			function saveUsername(form) {
				var expires = new Date();
				expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
				setCookie("username", form.elements['j_username0'].value + "," + document.getElementById('j_yey').value, expires, " / ");
                var location = this.location.href.toString().substring(7);
                   location =location.substring(location.indexOf('/'))
				setCookie("location",location , expires, " / ");
			}

			function validateForm(form) {
          		saveUsername(form);
				form.elements['j_username'].value = form.elements['j_username0'].value + "," + form.elements['j_yey'].value;
				if (form.elements['j_username0'].value == "") {
					alert('<s:text name="error_login_username"/>');
					return false;
				} else if (form.elements['j_password'].value == "") {
					alert('<s:text name="error_login_password"/>');
					return false;
				} else {
					return true;
				}
             
			}
		</script>
	</head>
	<body>
		<center>
			<form method="post" id="loginForm" action="<c:url value='/j_spring_security_check'/>" 
				onsubmit="saveUsername(this);return validateForm(this);">
				<input type="hidden" name="dispatcher" value="bpm" />
				<input type="hidden" name="j_username" />
				<div id="login" align="left">
					<ul class="login_tg">
						<li id="login_left">
							<ul style="margin-left: 20px; line-height: 20px;">
								<li style="list-style: disc;">
									<s:text name="login.note"/>
								</li>
								<li style="list-style: disc;">
									<s:text name="login.note.1"/>
								</li>
								<li style="list-style: disc;">
									<s:text name="login.note.2"/>
								</li>
							</ul>
						</li>
						<li id="login_right" style="width: 155px;">
							<ul style="width: 100%;">
								<c:if test="${param.error != null}">
									<li class="error">
										<img src="<c:url value="/images/iconWarning.gif"/>" alt="warning"/>
										<s:text name="login.errors.password.mismatch"/>
									</li>
								</c:if>
								<!-- START multiple school login -->
								<li style="margin-bottom: 7px;overflow: auto;">

										<s:text name="login.label.school"/>
									
									<input type="text" name="j_yey" tabindex="1" class="input2" />
								</li>
								<!-- END multiple school login -->
								
								<!-- START single school login -->
								<%--<input type="hidden" name="j_yey" id="j_yey" tabindex="1" value="test2222"/>--%>
								<!-- END single school login -->
								<li style="margin-bottom: 7px;overflow: auto;">

										<s:text name="label.username"/>

									<input type="text" name="j_username0" tabindex="2" class="input2" />
								</li>
								<li style="margin-bottom: 7px;overflow: auto;">

										<s:text name="login.label.password"/>
									
									<input type="password" name="j_password" tabindex="3" class="input2" />
								</li>
								<s:if test='!@com.rathink.p.PConst@VALIDATE'>
									<li style="float: left; margin-right: 2px; color: #FF0000;overflow: auto;">
										<s:text name="error_version_validate"/>
									</li>
								</s:if>
								<li style="float: right;margin-right:5px;">
									<input type="submit" name="button"  value="<s:text name='button.login'/>" class="btn" />
								</li>
							</ul>
						</li>
					</ul>
					<ul style="float: right; font-size: 12px;">
						<li><span style="font-size: 12px; color: #888888;">Powered by </span><a href="http://www.ming800.com" target="_blank">ming800.com</a></li>
					</ul>
				</div>
		</form>
		<script type="text/javascript">
			if (getCookie("username") != null) {
				if (getCookie("username").indexOf(",") != -1) {
					document.getElementById("j_yey").value = getCookie("username")
							.split(",")[1];
				}
				document.getElementById("j_username0").value = getCookie("username")
						.split(",")[0];
				document.getElementById("j_password").focus();
			} else {
				document.getElementById("j_yey").focus();
			}
		</script>
		
		
		
		
		
		<script type="text/javascript">
            /* google analitics code */
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
                document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
         </script>
        <script type="text/javascript">
            try {   var pageTracker = _gat._getTracker("UA-5395883-3");
            pageTracker._trackPageview();
        } catch(err) {}</script>
	</body>
</html>