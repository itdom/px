<%--
  User: Kyll
  Time: 2008-7-21 14:42:04
--%>
<%@ include file="/common/taglibs.jsp"%>
<frameset cols="165px, *" framespacing="0">
	<frame src='<c:url value="/system/organmgmt/organMenu.action"/>' name="menu" noresize scrolling="no" marginwidth="0" marginheight="0" frameborder="0" />
	<frame src='<c:url value="/edu/base/teachArea/listTeachArea.action"><c:param name="pageEntity.pageIndex" value="1"/><c:param name="pageEntity.pageRecords" value="20"/></c:url>' name="content" noresize scrolling="yes" marginwidth="0" marginheight="0" frameborder="0" />
</frameset>