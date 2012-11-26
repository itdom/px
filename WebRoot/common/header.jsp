<%@ include file="/common/taglibs.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css"
			href="<c:url value="/styles/top.css"/>" />
		<script type="text/javascript" src="<c:url value='/scripts/top.js'/>"></script>
		<link rel="stylesheet" type="text/css"
            href="<c:url value="/popmenu/menu.css"/>" />
        <script type="text/javascript"
            src="<c:url value='/popmenu/menu.js'/>"></script>
        <script type="text/javascript">
            popMenuConfig.FolderImage="img/over.png";
            popMenuConfig.CssPrefix="#popContainer";
            <c:forEach items="${requestScope.menuList}" var="menu" varStatus="stat">
                popMenu.insert('<c:out value="${menu.id}"/>', '<c:out value="${menu.label}"/>', '<c:url value="${menu.url}"/>', 'main');
            </c:forEach>
        </script>
	</head>
	<body>
		 <div class="banner">
			<ul>
				<li class="logo">
							<img src="<c:url value="/images/header/px_logo.gif" />"  border="0" vspace="5" hspace="0" align="absmiddle" />
				</li>
	            <li class="helpbar" style="list-style-type:none">
                     <ul style="right:3px;width:1000px;text-align:right">
                       <li style="list-style-type:none;color:#999999"><s:text name="hello"/>&nbsp;<b>20294-</b></span><span style="color:#06698C"><b><s:text name="exit"/></b></span></li>
	                 </ul>
				 </li>
	          </ul>
		</div>
		<div id="popMainContainer" class="menu">
			<script>
		    	popMenuConfig.createPopMenu("popMainContainer", false);
			</script>
		</div>
	</body>
</html>