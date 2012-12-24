
<%
	/** author: wyb; time: 08/06/27/ 21:04 */
%>
<%@ include file="/common/taglibs.jsp"%>

<html>
	<head>
		<link rel="stylesheet" type="text/css"
			href="<c:url value="/styles/menu/bg.css"/>" />
		<link rel="stylesheet" type="text/css"
			href="<c:url value="/styles/menu/menuTree.css"/>" />
		<script type="text/javascript" language="JavaScript"
			src="<c:url value="/scripts/tree/dhtmlXCommon.js"/>"></script>
		<script type="text/javascript" language="JavaScript"
			src="<c:url value="/scripts/tree/dhtmlXTree.js"/>"></script>
		<script type="text/javascript" language="JavaScript">
			function onNodeSelect() {
				var itemId = tree.getSelectedItemId();
				var url;
				if (itemId == "guide") {
					url = "<c:url value='/info/ig.action'/>";
				} else if (itemId == "allbbs") {
					url = "<c:url value='/info/bbs/listbulletin.action?pageEntity.pageRecords=20'/>";
				} else if (itemId == "board") {
					url = "<c:url value='/info/bbs/formboard.action?type=add'/>";
				} 
				else {
					return;
				}
				window.parent.frames[1].location.replace(url);
			}
		</script>
	</head>
	<body class="menubackground">
		<div id="treeDiv" style="width: auto; height: auto">
			<script type="text/javascript" language="JavaScript">
				var tree = new dhtmlXTreeObject(document.getElementById('treeDiv'), "auto", "auto", 0);
				tree.setImagePath("<c:url value="/images/dhtmlxTree/"/>");
				tree.setOnClickHandler(onNodeSelect);
				tree.insertNewItem(0, 'guide', 'navigation', 0, 0, 0, 0, "SELECT");
				tree.insertNewItem(0, 'bbs', 'new File', 0, 0, 0, 0);
				tree.insertNewItem('bbs', 'allbbs', 'list', 0, 0, 0, 0);
				tree.insertNewItem('bbs', 'board', 'del', 0, 0, 0, 0);
			</script>
		</div>
		<script type="text/javascript">
			if (top[1][1].refocus) {
				tree.selectItem('manager', false, false);
			}
		</script>
	</body>
</html>