<%@ include file="/common/taglibs.jsp" %>

<html>
<head>
    <title>iG</title>
    <link rel="stylesheet" type="text/css" href="<s:url value="/ig/ig.css" />"/>
    <link rel="stylesheet" type="text/css" href="<s:url value="/styles/table.css" />"/>
    <script type="text/javascript" src="<s:url value="/ig/ig.js" />"></script>
     <script type="text/javascript" src="<s:url value="/scripts/jquery-1.5.1.min.js" />"></script>
    <script type="text/javascript">
        var tagss = "";
        var className = "";
        function processText(text, divContent, src) {
            tagss = "<table style='border:thin' cellpadding='0' cellspacing='0' border='0' class='maintable'><tbody>";
            if (src == "news") {
                var news = eval('(' + text + ')').list;
                for (var i = 0; i < news.length; i++) {
                    if (i % 2 == 0)className = 'tint';
                    else className = 'deep';
                    if (i <= 5) {
                        buildNews(news[i].id, news[i].userFullName, news[i].dateTime.replace("T", " ").substring(0, 16), news[i].boardName, news[i].boardId, news[i].name, className);
                    }
                }
            }
            if (src == "msgs") {
                var msgs = eval('(' + text + ')').receiveBoxList;
                for (var i = 0; i < msgs.length; i++) {
                    if (i % 2 == 0)className = 'tint';
                    else className = 'deep';
                    if (i <= 5) {
                        buildMsgs(msgs[i].id, msgs[i].sendBoxUserName, msgs[i].sendBoxCreateTime.replace("T", " ").substring(0, 16), msgs[i].sendBoxName, className);
                    }
                }
            }
            if (src == "tasks") {
                var tasks = eval('(' + text + ')').myTaskList;
                for (var i = 0; i < tasks.length; i++) {
                    if (i % 2 == 0)className = 'tint';
                    else className = 'deep';
                    if (i <= 5) {
                        buildTasks(tasks[i].id, tasks[i].title, tasks[i].createDateTime.replace("T", " ").substring(0, 16), tasks[i].importantLevel, tasks[i].userFullName, className);
                    }
                }
            }
            if (src == "Comments") {
                var Comments = eval('(' + text + ')').processActivityInstanceCommentList;
                if(Comments==null){
                    return false;
                }else{
	                for (var i = 0; i < Comments.length; i++) {
	                    if (i % 2 == 0)className = 'tint';
	                    else className = 'deep';
	                    if (i <= 5) {
	                        buildComments(Comments[i].id, Comments[i].processName, Comments[i].userFullName, Comments[i].processInstanceStartDate.replace("T", " ").substring(0, 16), Comments[i].processInstanceName, className);
	                    }
	                }
                }
            }
             if (src == "alert") {
                var alerts = eval('(' + text + ')').alertList;
	                for (var i = 0; alerts!=null&&i < alerts.length; i++) {
	                    if (i % 2 == 0)className = 'tint';
	                    else className = 'deep';
	                        if (alerts[i].alertName == 'birth') {
	                            if (alerts[i].amountCount == 0) tagss += "<tr><td width='40%' class='" + className + "'> <s:text name='info.alert.birth'/>" + alerts[i].amountCount + " <s:text name="service.unit.1"/></td></tr>";
	                            else tagss += "<tr><td width='40%' class='" + className + "'> <a href='javascript:win.show(\"<c:url value='/edu/student/basicinfo/listBirthAlert.action'/>\")' style='margin-right:10px;'> <s:text name='info.alert.birth'/><s:text name="service.unit.1"/></a></td></tr>";
	                        }
	                        if (alerts[i].alertName == 'chargeByTime') {
	                        
	                        }
	                 }
                }
            tagss += "</tbody></table>";
            divContent.insertAdjacentHTML("beforeEnd", tagss);
        }
        function buildNews(id, userFullName, dateTime, boardName, boardId, name, className) {
            tagss += "<tr><td width='40%' class='" + className + "'><a href='javascript:win.show(\"<c:url value='/info/bbs/viewnews.action?news.id="+id+"&news.board.id="+boardId+"'/>\")' style='margin-right:10px;'>" + name + "</a></td>" +
                     "<td class='" + className + "'width='20%'>" + boardName + "</td><td class='" + className + "' width='20%'>" + userFullName + "</td>" +
                     "<td class='" + className + "' width='20%'>" + dateTime + "</td></tr>";

        }

        function buildMsgs(id, sendBoxUserName, sendBoxCreateTime, sendBoxName, className) {
            tagss += "<tr><td width='40%' class='" + className + "'><a href='javascript:win.show(\"<c:url value='/info/message/viewreceive.action?receiveBox.id="+id+"'/>\")' style='margin-right:10px;'>" + sendBoxName + "</a></td>" +
                     "<td class='" + className + "' width='20%'>" + sendBoxUserName + "</td>" +
                     "<td class='" + className + "' width='20%'>" + sendBoxCreateTime + "</td></tr>";
        }
        function buildTasks(id, title, createDateTime, importantLevel, userFullName, className) {
            tagss += "<tr><td width='40%' class='" + className + "'><a href='javascript:win.show(\"<c:url value='/work/task/taskView.action?task.flag=true&task.id="+id+"'/>\")' style='margin-right:10px;'>" + title + "</a></td>" +
                     "<td class='" + className + "'width='20%'><s:if test='"+importantLevel+"==1'><s:text name="work.task.taskImportantLevel.general"/>" +
                     "</s:if><s:elseif test='"+importantLevel+"==2'><s:text name="work.task.taskImportantLevel.important"/>" +
                     "</s:elseif><s:else><s:text name="work.task.taskImportantLevel.veryImportant"/>" +
                     "</s:else></td><td class='" + className + "' width='20%'>" + userFullName + "</td>" +
                     "<td class='" + className + "' width='20%'>" + createDateTime + "</td></tr>";
        }

        function buildComments(id, processName, userFullName, processInstanceStartDate, processInstanceName, className) {
            tagss += "<tr><td width='40%' class='" + className + "'><a href='javascript:win.show(\"<c:url value='/workflow/updateProcessInstance.action?type=update&processActivityInstanceComment.id="+id+"'/>\")' style='margin-right:10px;'>" + processInstanceName + "</a></td>" +
                     "<td class='" + className + "' width='20%'>" + processName + "</td><td class='" + className + "' width='20%'>" + userFullName + "</td>" +
                     "<td class='" + className + "' width='20%'>" + processInstanceStartDate + "</td></tr>";
        }
       
    </script>
    <meta name="heading" content="<s:text name="info.tree.ig"/>"/>
</head>
<body>
<c:out value="${requestScope.myUser.id}"></c:out>
<div id="root">
    <ul class="cell" id="c_1" style="width: 75%;">
            <li class="row" id="ig_1_1">

                <div class="title">
                    <img src="<c:url value="/ig/img/ico/icoa.gif" />" width="18" height="18" border="0" hspace="0"
                         vspace="0" align="absmiddle"/>
                    <s:text name="info.news.notice.last"/>
                </div>
            </li>
            <li class="row" id="ig_1_2">
                <div class="title">
                    <img src="<c:url value="/ig/img/ico/icod.gif" />" width="18" height="18" border="0" hspace="0"
                         vspace="0" align="absmiddle"/>
                    <s:text name="info.message"/>
                </div>
            </li>
                <li class="row" id="ig_1_3">
                <div class="title">
                    <img src="<c:url value="/ig/img/ico/icod.gif" />" width="18" height="18" border="0" hspace="0"
                         vspace="0" align="absmiddle"/>
                    <s:text name="info.message"/>
                </div>
            </li>
    </ul>
    <ul class="cell" id="c_2" style="width: 21%;">
        <li class="row" id="ig_2_1">
            <div class="title">
                <img src="<c:url value="/ig/img/ico/icof.gif" />" width="18" height="18" border="0" hspace="0"
                     vspace="0" align="absmiddle"/>
                <s:text name="info.quick.show"/>
            </div>
        </li>
    </ul>
</div>

<script type="text/javascript" language="JavaScript">
   	    document.getElementById('ig_2_1').style.height = 532 + "px";
	    sendRequestd('<c:url value="/igNewsToJson.action"/>', "size=10", "ig_1_1", "news");
	    //sendRequest('<c:url value="/igMsgsToJson.action"/>', "size=10", "ig_1_2", "msgs");
	    //endRequest('<c:url value="/showAlertByUserToJson.action"/>', "size=10", "ig_2_1", "alert");

 
 </script>
<rathink:divwindow height="400" width="600" left="0" top="0" id="win"></rathink:divwindow>

</body>
</html>