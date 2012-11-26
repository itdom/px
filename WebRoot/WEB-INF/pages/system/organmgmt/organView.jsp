<%--
  User: Kyll
  Time: 2008-7-21 17:11:35
--%>
<%@ include file="/common/taglibs.jsp" %>

<html>
<head>
	<meta name="heading" content="<s:text name="organ.info"/>"/>
	<script type="text/javascript">
		function confirmDelete() {
			return confirm('<s:text name="common.confirm.delete"/>');
		}
	</script>
</head>
<body>
<a href="<c:url value="/system/organmgmt/editOrgan.action"><c:param name="organ.id" value="${requestScope.organ.id}"/></c:url>">
    <img src="<c:url value="/images/button/edit.gif" />" alt="" align="absmiddle" style="border: none;"><s:text name="common.button.edit" />
</a>
<a href="<c:url value="/system/organmgmt/deleteOrgan.action"><c:param name="organ.id" value="${requestScope.organ.id}"/></c:url>"
    onclick="return confirmDelete();">
    <img src="<c:url value="/images/button/delete.gif" />" alt="" align="absmiddle" style="border: none;"><s:text name="common.button.delete" />
</a>
<a href="javascript: history.back();">
	<img src="<c:url value="/images/button/back.gif" />" alt="" align="absmiddle" style="border: none;"><s:text name="common.button.back" />
</a>
<table border="0" class="maintable" cellspacing="0" cellpadding="0">
	<tr>
		<td colspan="4" class="head"/>
	</tr>
	<tr>
		<td class="deep" width="15%">
			<s:text name="system.organ.name"/>
		</td>
		<td class="tint" width="35%">
			<c:out value="${requestScope.organ.name}"/>
		</td>
		<td class="deep" width="15%">
			<s:text name="teachArea.name"/>
		</td>
		<td class="tint" width="35%">
			<c:out value="${requestScope.organ.teachArea.name}"/>
		</td>
	</tr>
	<tr>
		<td class="deep" width="15%">
			<s:text name="system.organ.fatherName"/>
		</td>
		<td class="tint" width="35%">
			<c:choose>
				<c:when test="${empty requestScope.organ.father}">
					<s:text name="system.organ.noFather"/>
				</c:when>
				<c:otherwise>
					<c:out value="${requestScope.organ.father.name}"/>
				</c:otherwise>
			</c:choose>
		</td>
        <td class="deep" width="15%">
			<s:text name="system.organ.serial"/>
		</td>
		<td class="tint" width="35%">
			<c:out value="${requestScope.organ.serial}"/>
		</td>
	</tr>
</table>
<br/>
<a href="<c:url value="/system/organmgmt/editOrgan.action"><c:param name="father.id" value="${requestScope.organ.id}"/><c:param name="organ.teachArea.id" value="${requestScope.organ.teachArea.id}"/></c:url>">
    <img src="<c:url value="/images/button/create.gif"/>" alt="" align="absmiddle" style="border: none;"><s:text name="teachArea.button.create.organ" />
</a>
<%--<c:choose>
	<c:when test="${requestScope.userTeachArea.main}">

	</c:when>
	<c:otherwise>
		<c:if test="${!requestScope.organ.teachArea.main}">
			<a href="<c:url value="/system/organmgmt/editOrgan.action"><c:param name="father.id" value="${requestScope.organ.id}"/><c:param name="organ.teachArea.id" value="${requestScope.organ.teachArea.id}"/></c:url>">
				<img src="<c:url value="/images/button/create.gif"/>" alt="" align="absmiddle" style="border: none;"><s:text name="teachArea.button.create.organ" />
			</a>
		</c:if>
	</c:otherwise>
</c:choose>--%>
<table class="maintable" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td class="head">
			<s:text name="system.organ.name" />
		</td>
        <td class="head">
			<s:text name="system.organ.serial"/>
		</td>
		<td class="head">
			<s:text name="system.organ.fatherName" />
		</td>
		<td class="head">
			<s:text name="system.organ.theType" />
		</td>
		<c:choose>
			<c:when test="${requestScope.userTeachArea.main}">
				<td class="head">
					<s:text name="common.button.operate" />
				</td>
			</c:when>
			<c:otherwise>
				<c:if test="${!requestScope.organ.teachArea.main}">
					<td class="head">
						<s:text name="common.button.operate" />
					</td>
				</c:if>
			</c:otherwise>
		</c:choose>
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
				<c:out value="${organ.serial}" />
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
			<c:choose>
				<c:when test="${requestScope.userTeachArea.main}">
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
				</c:when>
				<c:otherwise>
					<c:if test="${!requestScope.organ.teachArea.main}">
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
					</c:if>
				</c:otherwise>
			</c:choose>
		</tr>
	</c:forEach>
</table>
</body>
</html>