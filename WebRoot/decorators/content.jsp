<%--
  Time: 16:25:15 2007-8-7
  Author: Kyll
--%>
<%@ include file="/common/taglibs.jsp"%>
<html xmlns:v>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><s:text name="webapp.name" /></title>
		<link rel="stylesheet" type="text/css" href="<c:url value='/styles/andreas/theme.css'/>" />
		<decorator:head />
	</head>
	<body
		<decorator:getProperty property="body.id" writeEntireProperty="true"/>
		<decorator:getProperty property="body.class" writeEntireProperty="true"/>
		<decorator:getProperty property="body.style" writeEntireProperty="true"/>
		<decorator:getProperty property="body.scroll" writeEntireProperty="true"/>
		<decorator:getProperty property="body.onunload" writeEntireProperty="true"/>
		<decorator:getProperty property="body.onload" writeEntireProperty="true"/>>
	<% if (request.getAttribute("struts.valueStack") != null) { %>
		<%-- ActionError Messages - usually set in Actions --%>
		<s:if test="hasActionErrors()">
			<div class="error" id="errorMessages">
				<s:iterator value="actionErrors">
					<img src="<c:url value="/images/iconWarning.gif"/>"
						alt="<s:text name="icon.warning"/>" class="icon" />
					<s:property escape="false" />
					<br />
				</s:iterator>
			</div>
		</s:if>

		<%-- FieldError Messages - usually set by validation rules --%>
		<s:if test="hasFieldErrors()">
			<div class="error" id="errorMessages">
				<s:iterator value="fieldErrors">
					<s:iterator value="value">
						<img src="<c:url value="/images/iconWarning.gif"/>"
							alt="<s:text name="icon.warning"/>" class="icon" />
						<s:property escape="false" />
						<br />
					</s:iterator>
				</s:iterator>
			</div>
		</s:if>
	<% } %>
		<div id="dcrtNavg">
			<span class="navgico"></span>
			<span class="navglabel">
				<decorator:getProperty property="meta.heading" />
			</span>
		</div>
		<div id="page">
			<decorator:body />
		</div>
        <br>
	</body>
</html>
