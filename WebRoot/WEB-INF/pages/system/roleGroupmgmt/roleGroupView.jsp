<%--
  Time: 15:11:50 2007-10-11
  Author: Kyll
--%>
<%@ include file="/common/taglibs.jsp" %>
<html>
<head>
	<title><s:text name="system.rolegroup.title"/></title>
	<meta name="heading"
	      content="<s:text name="basemenu.rolegroup.manager" />"/>
	<meta name="menu" content="OrganMenu"/>
</head>
<body>
<span>
<table cellspacing="0" cellpadding="0" class="maintable" border="0">
	<tr>
		<td colspan="2" class="head">
			&nbsp;
		</td>
	</tr>
	<tr>
		<td class="deep" width="15%">
			<s:text name="base.button.roleGroup.name"/>
		</td>
		<td class="tint">
			<s:property value="roleGroup.name"/>
		</td>
	</tr>
	<tr>
		<td class="deep">
			<s:text name="system.rolegroup.role"/>
		</td>
		<td class="tint">
			<c:forEach items="${requestScope.roleGroup.roleList}" var="role">
				<c:out value="${role.name}"/>
				&nbsp;
			</c:forEach>
		</td>
	</tr>
	<tr>
		<td class="deep" width="15%">
			<s:text name="system.role.related"/>
		</td>
		<td class="tint" width="85%" colspan="3">
			<c:forTokens items="${requestScope.roleGroup.related}" delims="," var="related" varStatus="status">
				<c:choose>
					<c:when test="${related == 0}">
						<s:text name="branch.type.deployer"/>
					</c:when>
					<c:when test="${related >= 100 && related <= 199}">
						<s:text name="branch.type.training.small"/>
					</c:when>
					<c:when test="${related >= 200 && related <= 299}">
						<s:text name="branch.type.training.big"/>
					</c:when>
					<c:when test="${related >= 300 && related <= 399}">
						<s:text name="branch.type.technical"/>
					</c:when>
					<c:when test="${related >= 500 && related <= 599}">
						<s:text name="branch.type.school"/>
					</c:when>
					<c:when test="${related >= 700 && related <= 799}">
						<s:text name="branch.type.kindergarden"/>
					</c:when>
				</c:choose>
				<c:if test="${status.count % 8 == 0}"><br/></c:if>
			</c:forTokens>
		</td>
	</tr>
</table>
<input type="button" class="btn" value="<s:text name="common.button.back"/>" onclick="window.history.back();"/>
</span>
</body>
</html>