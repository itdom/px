<%--
  User: Kyll
  Time: 2008-7-21 16:52:45
--%>
<%@ include file="/common/taglibs.jsp" %>
<html>
<head>
	<meta name="heading" content="<s:text name="organ.info" />"/>
	<script type="text/javascript" src="<c:url value="/scripts/form/validate.js"/>"></script>
	<script type="text/javascript">
		function validateForm(form) {
			if (isEmpty(form.elements['organ.name'].value)) {
				alert('<s:text name="error_organ_name"/>');
				return false;
			}
			submitProcess(form);
			return true;
		}
	</script>
</head>
<body>
<form id="organForm" action="<c:url value="/system/organmgmt/saveOrgan.action"/>" method="post" onsubmit="return validateForm(this);">
	<input type="hidden" name="organ.id" value="${requestScope.organ.id}"/>
	<c:choose>
		<c:when test="${empty requestScope.organ.father}">
			<input type="hidden" name="organ.teachArea.id" value="${requestScope.organ.teachArea.id}"/>
		</c:when>
		<c:otherwise>
			<input type="hidden" name="organ.teachArea.id" value="${requestScope.organ.father.teachArea.id}"/>
		</c:otherwise>
	</c:choose>
	<c:choose>
		<c:when test="${empty requestScope.father.id}">
			<c:if test="${!empty requestScope.organ.father.id}">
				<input type="hidden" name="organ.father.id" value="${requestScope.organ.father.id}"/>
			</c:if>
		</c:when>
		<c:otherwise>
			<input type="hidden" name="organ.father.id" value="${requestScope.father.id}"/>
		</c:otherwise>
	</c:choose>
	<input type="hidden" name="organ.theType" value="0"/>
	<table border="0" class="maintable" cellspacing="0" cellpadding="0">
		<tr>
			<td colspan="4" class="head"/>
		</tr>
		<tr>
			<td class="deep" width="15%">
				<s:text name="teachArea.name"/>
			</td>
			<td class="tint" width="35%">
				<c:choose>
					<c:when test="${empty requestScope.organ.father}">
						<c:out value="${requestScope.organ.teachArea.name}"/>
					</c:when>
					<c:otherwise>
						<c:out value="${requestScope.organ.father.teachArea.name}"/>
					</c:otherwise>
				</c:choose>
			</td>
			<td class="deep" width="15%">
				<s:text name="system.organ.fatherName"/>
			</td>
			<td class="tint" width="35%">
				<c:choose>
					<c:when test="${empty requestScope.father.id}">
						<c:choose>
							<c:when test="${empty requestScope.organ.father}">
								<s:text name="system.organ.noFather"/>
							</c:when>
							<c:otherwise>
								<c:out value="${requestScope.organ.father.name}"/>
							</c:otherwise>
						</c:choose>
					</c:when>
					<c:otherwise>
						<c:out value="${requestScope.father.name}"/>
					</c:otherwise>
				</c:choose>
			</td>
		</tr>
		<tr>
			<td class="required" width="15%">
				<s:text name="system.organ.name"/>*
			</td>
			<td class="tint" width="35%">
				<input type="text" name="organ.name" value="<c:out value="${requestScope.organ.name}"/>"/>
			</td>
			<td class="deep" width="15%">
				<s:text name="system.organ.serial"/>
			</td>
			<td class="tint" width="35%">
				<input type="text" name="organ.serial" value="<c:out value="${requestScope.organ.serial}"/>"/>
			</td>
		</tr>
	</table>
	<input type="submit" value="<s:text name="common.button.save"/>" class="btn"/>
	<input type="button" value="<s:text name="common.button.cancel"/>" class="btn" onclick="history.back();"/>
</form>
</body>
</html>