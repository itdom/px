
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
				} else if (itemId == "manager") {
					url = "<c:url value='/info/bbs/formboard.action?type=add'/>";
				} else if (itemId == "msg_1") {
					url = "<c:url value='/info/message/listreceivebox.action?pageEntity.pageRecords=20'/>";
				} else if (itemId == "msg_2") {
					url = "<c:url value='/info/message/listsendbox.action?pageEntity.pageRecords=20'/>";
				} else if (itemId == "msg_3") {
					url = "<c:url value='/info/message/formmessage.action?type=add&sendBox.theType=1'/>";
				}else if (itemId == "send_msg_3") {
					url = "<c:url value='/info/sms/smsForm.action?type=add'/>";
				}else if (itemId == "msg_4") {
					url = "<c:url value='/info/message/showOnlineUserList.action'/>";
                }else if (itemId == "inneruser") {
					url = "<c:url value='/info/addressbook/listpersonalAll.action?pageEntity.pageRecords=20'/>";
				} else if (itemId == "info") {
					url = "<c:url value='/info/setting/userinfo.action'/>";
				} else if (itemId == "pas") {
					url = "<c:url value='/info/setting/userpas.action'/>";
				} else if (itemId == "viewinfo") {
                    var date = new Date();
					url = "<c:url value='/edu/hr/personnel/viewTeacher.action'/>?dispatcher=infoview&formUser.id=${requestScope.myUser.id}&teacherId=${requestScope.myUser.id}&year=" + date.getYear() +"&month=" + (1 + date.getMonth()) ;
                }else if (itemId == "alertinfo") {
					url = '<c:url value="/info/setting/alertSettingByUser.action" />';
				}
                else if (itemId == "konwloge") {
					url = '<c:url value="/info/knowledge/listKnowledge.action?pageEntity.pageRecords=20" />';
				} else if (itemId == "orderByCatagory") {
					url = '<c:url value="/info/knowledge/listCatalogue.action?pageEntity.pageRecords=20" />';
				}
                else if (itemId == "catagory") {
					url = '<c:url value="/info/knowledge/listCatalogue.action?pageEntity.pageRecords=20" />';
				}
                else if (itemId == "switch") {
					url = '<c:url value="/info/setting/switchAccountView.action" />';
				} else if (itemId == "send") {
					url = '<c:url value="/info/sms/smsList.action" />';
				} else if (itemId == "report") {
					url = '<c:url value="/info/sms/reportList.action" />';
				}else if (itemId == "board") {
					url = "<c:url value='/info/bbs/listBoard.action'/>";
				}else if(itemId== "calendar_1"){
					url = "<c:url value='/edu/info/calendaraffair/toListCalendarAffair.action'/>";
				}else if(itemId== "calendar_2"){
					url = "<c:url value='/edu/info/calendaraffair/toCalendarAffair.action'/>";
				}else if(itemId== "viewStudentUserinfo"){
					url = "<c:url value='/system/usermgmt/studentUserView.action'/>";
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
				var tree = new dhtmlXTreeObject(document.getElementById('treeDiv'), "auto", "100%", 0);
				tree.setImagePath("<c:url value="/images/dhtmlxTree/"/>");
				tree.setOnClickHandler(onNodeSelect);
				tree.insertNewItem(0, 'guide', '<s:text name="info.tree.ig"/>', 0, 0, 0, 0, "SELECT");
				tree.insertNewItem(0, 'bbs', '<s:text name="info.bbs.tree.root"/>', 0, 0, 0, 0);
				tree.insertNewItem('bbs', 'allbbs', '<s:text name="info.news.tree.all"/>', 0, 0, 0, 0);
				tree.insertNewItem('bbs', 'board', '<s:text name="info.tree.orderby.board"/>', 0, 0, 0, 0);
				tree.insertNewItem(0, 'msg', '<s:text name="info.message.tree.root"/>', 0, 0, 0, 0);
				<c:if test="${requestScope.myUser.type == 0}">
                   tree.insertNewChild('msg', 'msg_3', '<s:text name="info.message.tree.3"/>', 0, 0, 0, 0);
                 </c:if>
                tree.insertNewChild('msg', 'msg_1', '<s:text name="info.message.tree.1"/>', 0, 0, 0, 0);
				<c:if test="${requestScope.myUser.type == 0}">
					tree.insertNewChild('msg', 'msg_2', '<s:text name="info.message.tree.2"/>', 0, 0, 0, 0);
					<%--tree.insertNewChild('msg', 'msg_3', '<s:text name="info.message.tree.3"/>', 0, 0, 0, 0);--%>
                     tree.insertNewChild('msg','msg_4','<s:text name="info.message.tree.5"/>',0,0,0,0);
                
				</c:if>
				
				<%--<rathink:auth roleName="NEWS_M">--%>
					tree.insertNewItem(0, 'doc', '<s:text name="info.bbs.tree.document.root"/>', 0, 0, 0, 0);
					tree.insertNewChild('doc', 'konwloge', '<s:text name="info.bbs.tree.document.private"/>', 0, 0, 0, 0);
					tree.insertNewChild('doc', 'orderByCatagory', '<s:text name="info.bbs.tree.knowledge.catalogue"/>', 0, 0, 0, 0);
					/*tree.insertNewChild('doc', 'catagory', '<s:text name="category.menu"/>', 0, 0, 0, 0);*/

					tree.insertNewItem(0, 'txl', '<s:text name="info.knowledge.tree.root"/>', 0, 0, 0, 0);
                    tree.insertNewChild('txl','inneruser','<s:text name="info.sms.type2"/><s:text name="info.knowledge.tree.root"/>',0,0,0,0);
				<%--</rathink:auth>--%>
					tree.insertNewChild(0, 'sms', '<s:text name="info.sms"/>', 0, 0, 0, 0);
                    tree.insertNewChild('sms', 'send_msg_3', '<s:text name="info.message.tree.3"/>', 0, 0, 0, 0);
					tree.insertNewChild('sms', 'send', '<s:text name="info.sms.sendLog"/>', 0, 0, 0, 0);
					tree.insertNewChild('sms', 'report', '<s:text name="info.sms.report"/>', 0, 0, 0, 0);
 
                tree.insertNewChild(0, 'setting', '<s:text name="info.tree.setting"/>', 0, 0, 0, 0);
               <c:if test="${requestScope.myUser.type == 0}">
                tree.insertNewChild('setting', 'viewinfo', '<s:text name="info.tree.setting.viewinfo"/>', 0, 0, 0, 0);
                tree.insertNewChild('setting', 'alertinfo', '<s:text name="info.tree.setting.alert"/>', 0, 0, 0, 0);                                                               
               </c:if>
                
			</script>
			                
		</div>
		<script type="text/javascript">
			if (top[1][1].refocus) {
				tree.selectItem('manager', false, false);
			}
		</script>
	</body>
</html>