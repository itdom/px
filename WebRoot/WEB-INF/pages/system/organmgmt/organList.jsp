<%--
  User: Kyll
  Time: 2008-7-21 14:44:05
--%>
<%@ include file="/common/taglibs.jsp"%>
<head>
	<meta name="heading" content="<rathink:teachAreaName/><s:text name='menu.training.organ'/>" />
	<script type="text/javascript" language="JavaScript">
		function confirmDelete() {
			return confirm('<s:text name="common.confirm.delete"/>');
		}
	</script>
</head>
<a href="<c:url value="/system/organmgmt/editOrgan.action"/>">
	<img src="<c:url value="/images/button/create.gif"/>" alt="" align="absmiddle" style="border: none;"><s:text name="teachArea.button.create.organ" />
</a>
<table class="maintable" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td class="head" width="32%">
			<s:text name="system.organ.name" />
		</td>
		<td class="head" width="31%">
			<s:text name="system.organ.fatherName" />
		</td>
		<td class="head" width="22%">
			<s:text name="system.organ.theType" />
		</td>
		<td class="head" width="15%">
			<s:text name="common.button.operate" />
		</td>
	</tr>
	<c:forEach items="${requestScope.organList}" var="organ" varStatus="stat">
		<tr>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<a href="<c:url value="/system/organmgmt/viewOrgan.action"><c:param name="organ.id" value="${organ.id}"/></c:url>">
					<c:out value="${organ.name}" />
				</a>
			</td>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<c:out value="${organ.father.name}" />
			</td>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<c:choose>
					<c:when test="${organ.theType == 0}">
						<s:text name="system.organ.theType.0"/>
					</c:when>
					<c:when test="${organ.theType == 1}">
						<s:text name="system.organ.theType.1"/>
					</c:when>
					<c:when test="${organ.theType == 2}">
						<s:text name="system.organ.theType.2"/>
					</c:when>
				</c:choose>
			</td>
			<td <c:choose>
					<c:when test="${stat.index % 2 == 0}">class="tint"</c:when>
					<c:otherwise>class="deep"</c:otherwise>
				</c:choose> >
				<a href="<c:url value="/system/organmgmt/editOrgan.action"><c:param name="organ.id" value="${organ.id}"/></c:url>">
					<s:text name="common.button.edit" />
				</a>
				|
				<a href="<c:url value="/system/organmgmt/deleteOrgan.action"><c:param name="organ.id" value="${organ.id}"/></c:url>"
					onclick="return confirmDelete();">
					<s:text name="common.button.delete" />
				</a>
			</td>
		</tr>
	</c:forEach>
</table>
