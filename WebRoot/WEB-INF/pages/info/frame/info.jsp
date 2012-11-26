
<%@ include file="/common/taglibs.jsp"%>
<frameset cols="165px, *" framespacing="0">
	<frame src='<c:url value="/info/menu.action" />'
		name="menu" noresize scrolling="no" marginwidth="0" marginheight="0"
		frameborder="0" />
	<frame src='<c:url value='/info/ig.action'/>'
		name="content" noresize scrolling="auto" marginwidth="0"
		marginheight="0" frameborder="0" />
</frameset>