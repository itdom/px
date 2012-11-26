<%@ page language="java" pageEncoding="UTF-8"
         contentType="text/html;charset=utf-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
	<head>
		<meta http-equiv="Cache-Control" content="no-cache">
		<link rel="stylesheet" type="text/css" href="<c:url value='/styles/andreas/theme.css'/>" />
	</head>
	<body scroll="auto">
    <div id="dcrtNavg">
		<span class="navgico"></span>
		<span class="navglabel">
			<fmt:message key="common.error.info" />
		</span>
	</div>
	<a href="javascript: window.history.back();">
		<img src="<c:url value="/images/button/back.gif"/>" alt="" align="absmiddle" style="border: none;"><fmt:message key="common.button.back" />
	</a>
	<div align="left" class="errorInfo">
		<c:out value="${pageContext.exception.message}"/>
	</div>
	<div style="margin-left: 50px; color: #FFFFFF;">
		<c:forEach items="${pageContext.exception.stackTrace}" var="element">
			<c:out value="${element.className}"/>.<c:out value="${element.methodName}"/>(<c:out value="${element.lineNumber}"/>)<br/>
		</c:forEach>
	</div>
</body>
</html>
