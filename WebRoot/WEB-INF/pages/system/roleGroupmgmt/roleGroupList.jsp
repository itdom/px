<%--
  Time: 8:33:08 2007-8-15
  Author: Kyll
--%>
<%@ include file="/common/taglibs.jsp"%>

<head>
	<title><s:text name="system.rolegroup.title" /></title>
	<meta name="heading"
		content="<s:text name='basemenu.rolegroup.manager' />" />
	<meta name="menu" content="OrganMenu" />
	<script type="text/javascript" language="JavaScript">
		function confirmDelete() {
			return confirm('<s:text name="common.confirm.delete"/>');
		}
	</script>
</head>
<a href='<s:url namespace="/system/rolegroupmgmt" action="formRoleGroup"/>'>
	<img src="<c:url value="/images/button/create.gif" />" alt="" align="absmiddle" style="border: none;"><s:text name="base.button.create.roleGroup" />
</a>
<%--<a href='<s:url namespace="/system/rolegroupmgmt" action="testRoleGroup"/>'>
    roleGroupTest
</a>--%>

<table class="maintable" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td class="head" width="20%">
			<s:text name="base.button.roleGroup.name" />
		</td>
		<td class="head" width="55%">
			<s:text name="system.rolegroup.role" />
		</td>
		<td class="head" width="20%">
			<s:text name="common.button.operate" />
		</td>
	</tr>
	<c:forEach items="${requestScope.roleGroupList}" var="roleGroup" varStatus="stat">

        <c:if test="${fn:indexOf(roleGroup.roles,'STUDENT_USER')==-1}">
           
		<tr>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<a href="<c:url value="/system/rolegroupmgmt/viewRoleGroup.action" />?id=<c:out value="${roleGroup.id}" />">
					<c:out value="${roleGroup.name}" />
				</a>
			</td>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<c:forEach items="${roleGroup.roleList}" var="role" varStatus="status">
					<c:out value="${role.name}" />(<c:out value="${role.fullName}"/>)&nbsp;
					<c:if test="${status.count % 2 == 0}"><br/></c:if>
				</c:forEach>
			</td>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<a href="<s:url namespace="/system/rolegroupmgmt" action="formRoleGroup"><s:param name="roleGroup.id"><c:out value="${roleGroup.id}" /></s:param></s:url>">
					<s:text name="common.button.edit" />
				</a>
				|
				<a href="<s:url namespace="/system/rolegroupmgmt" action="deleteRoleGroup"><s:param name="roleGroup.id"><c:out value="${roleGroup.id}" /></s:param></s:url>"
					onclick="return confirmDelete();">
					<s:text name="common.button.delete" />
				</a>
			</td>
		</tr>
        </c:if>
	</c:forEach>
</table>
