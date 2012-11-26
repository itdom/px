<%--
  Time: 11:35:58 2007-8-7
  Author: Kyll
--%>
<%@ include file="/common/taglibs.jsp"%>
<head>
        <link href="<c:url value="/images/favicon.ico" />" rel="icon" />
		<link href="<c:url value="/images/favicon.ico" />" rel="shortcut icon" />
    <title>
	    <c:if test="${!empty requestScope.teachArea.name}">
		    <c:out value="${requestScope.branch.name}"/>(<c:out value="${requestScope.teachArea.name}"/>) |
	    </c:if>
	    <c:choose>
		    <c:when test="${requestScope.branch.branchLabel == 100 || requestScope.branch.branchLabel == 200}">
			    <s:text name="webapp.name.training"/>
		    </c:when>
		    <c:when test="${requestScope.branch.branchLabel == 300}">
			    <s:text name="webapp.name.technical"/>
		    </c:when>
		    <c:when test="${requestScope.branch.branchLabel == 500}">
			    <s:text name="webapp.name.school"/>
		    </c:when>
		    <c:when test="${requestScope.branch.branchLabel == 700}">
			    <s:text name="webapp.name.kindergarden"/>
		    </c:when>
		    <c:otherwise>
			    <s:text name="webapp.name"/>
		    </c:otherwise>
	    </c:choose>
    </title>
</head>
<frameset rows="90px, *" framespacing="0">
    <frame src="<c:url value="/common/schoolHeader.action"/>" name="head" noresize scrolling="no" marginwidth="0" marginheight="0" frameborder="0" />
    <frame src="<c:url value="/info/index.action" />" name="main" noresize scrolling="no" marginwidth="0" marginheight="0" frameborder="0" />
 </frameset>
