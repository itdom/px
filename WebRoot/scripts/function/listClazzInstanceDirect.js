function cascadeSelectByJson(select, cascadeName) {
    var cascadeSelect = document.getElementById(cascadeName);
    var tId = document.getElementById("teachAreaId").value;
    var str = "";
    $.ajaxSetup({
        cache:false
    });
    var url = "/listClazzInstanceByClazzAndTeachareaToJson.action";
    var params = {clazzId : select.value,teachAreaId:tId };
    $.getJSON(url, params, function(data) {
        if (data == "") {
            alert("no data");
        } else {
            cascadeSelect.innerHTML = "";
            str = "";

            if(data.clazz.trainingType!=20) {
                document.getElementById("waiTableID").style.display = "";
                document.getElementById("selectClass").style.display = "";
                document.getElementById("tTable").style.display="none";
                document.getElementById("clazzListDivAfter").innerHTML = "";
                document.getElementById("selectCourse").style.display = "none";
                str = "";
                var datalist = data.courseInstanceBeanList;
                for (var j = 0; j < datalist.length; j++) {
                    var ids = datalist[j].id;
                    var studentAmountDiv = "<div id =sDiv" + cSDivId + " style=\"width:auto;\"></div>" ;
                    str += "<div id =sDiv" + cSDivId + " class=part1>";
                    str += "<ul><li class=li21><input type=\"checkbox\"   name=\"cId\" onclick=\"getSelectedClazzInstances(this,'" + datalist[j].clazzInstanceId + "','" + datalist[j].clazzInstanceName + "');\" id=\"cId\"  value=\"" + datalist[j].clazzInstanceId + "\"   />" + datalist[j].clazzInstanceName + "</li>";
                    str += "<li class=li22>" + datalist[j].startDate + "</li>";
                    
                    if (datalist[j].studentAmoutLow != '') {
                    if (datalist[j].studentAmoutHigh != '') {
                        str += "<li class=li23>" + datalist[j].studentAmoutLow + "---" + datalist[j].studentAmoutHigh + "</li>";
                    } else {
                        str += "<li class=li23>最少" + datalist[j].studentAmoutLow + "人</li>";
                    }
                } else {
                    if (datalist[j].studentAmoutHigh != '') {
                        str += "<li class=li23>最多" + datalist[j].studentAmoutLow + "人</li>";
                    }else{
                        str += "<li class=li23>未限制人数</li>";
                    }
                }
                    str += "<li class=li24> </li>";
                    str += "<li class=li25> </li></ul>";
                    str += "</div>";
                    addSDivId();
                }
                cascadeSelect.innerHTML = str;
                var temInter = cSDivId - datalist.length;
                totalHeight = 0;
                for (var k = 0; k < datalist.length; k++,temInter++) {
                    getStudentsAmountByJson(datalist[k].clazzInstanceId, "sDiv" + temInter, cascadeName);
                }
            }
            if(data.clazz.trainingType==20){
                document.getElementById("waiTableID").style.display = "none";
                document.getElementById("selectClass").style.display = "none";
                document.getElementById("selectCourse").style.display = "";
                document.getElementById("tTable").style.display="";
                document.getElementById("clazzListDivAfter").innerHTML = "";
                str = "";
                var datalist = data.termCourseList;
                for (var j = 0; j < datalist.length; j++) {
                    var ids = datalist[j].id;
                    var teachAreaId=document.getElementById("teachAreaId").value;
                    str += "<div id =sDiv" + cSDivIdAfter + " class=part1>";
                    str += "<ul><li class=li11After><input type=\"checkbox\"   name=\"courseInstanceList["+j+"].termCourse.id\" onclick=\"getSelectedTermCourses(this,'" + ids + "','" + datalist[j].name + "','"+j+"');\" id=\"cId\"  value=\"" + ids + "\"   />" + datalist[j].name + "</li>";
                    str += "<li class=li12After>" + datalist[j].serial + "</li>";
                    str += "<li class=li13After>"+'<input type="text" name="courseInstanceList['+j+'].learningHours" id="learningHours'+j+'" style="width:85px;">'+"</li>";
                    str += "<li class=li14After>"+'<input type="hidden" name="courseInstanceList['+j+'].teacher.id" id="teacherId'+j+'"/><input type="hidden" name="courseInstanceList['+j+'].choose" id="choose'+j+'" value="0"/><input type="text" id="teacherName'+j+'" name="courseInstanceList['+j+'].teacher" onclick="showUserInfoByTermCourseId('+teachAreaId+','+ids+','+j+');return false;" style="width:85px;" readonly="readonly"/>'+"</li>"+"</ul>";
                    str += "</div>";
                    addSDivIdAfter();
                }
                //alert(str);
                cascadeSelect.innerHTML = str;
                //document.getElementById("clazzListDivAfter").insertAdjacentHTML("beforeEnd",str);
            }
        }
    }, 'json');
}
function getStudentsAmountByJson(clazzInstanceId, sDiv, cascadeName) {
    var cascadeSelect = cascadeName.id;
    var divId = document.getElementById(sDiv);
    //alert(sDiv);
    //alert(divId.innerHTML);
    var str = "";
    $.ajaxSetup({
        cache:false
    });
    var url = "/getStudentsAmountByJson.action";
    var params = {clazzId : clazzInstanceId };
    $.getJSON(url, params, function(data) {
        if (data == "") {
            alert("no data");
        } else {
            str = "";
            var datalist = data;
            divId.childNodes[0].childNodes[2].innerHTML = divId.childNodes[0].childNodes[2].innerHTML+"/"+data.courseInstanceForJsonBean.studentCount;
            divId.childNodes[0].childNodes[3].innerHTML = data.courseInstanceForJsonBean.chargeItems;
            divId.childNodes[0].childNodes[4].innerHTML = data.courseInstanceForJsonBean.courceInstanceInfo;
            //比较收费项目列和课程信息列的高度
            if(divId.childNodes[0].childNodes[3].offsetHeight>=divId.childNodes[0].childNodes[4].offsetHeight){
                divId.childNodes[0].childNodes[0].style.height = divId.childNodes[0].childNodes[3].offsetHeight;
                divId.childNodes[0].childNodes[1].style.height = divId.childNodes[0].childNodes[3].offsetHeight;
                divId.childNodes[0].childNodes[2].style.height = divId.childNodes[0].childNodes[3].offsetHeight;
                divId.childNodes[0].childNodes[4].style.height = divId.childNodes[0].childNodes[3].offsetHeight;
                divId.style.height = divId.childNodes[0].childNodes[3].offsetHeight;
                totalHeight = totalHeight + divId.childNodes[0].childNodes[3].offsetHeight;
            }
            if(divId.childNodes[0].childNodes[3].offsetHeight<divId.childNodes[0].childNodes[4].offsetHeight){
                divId.childNodes[0].childNodes[0].style.height = divId.childNodes[0].childNodes[4].offsetHeight;
                divId.childNodes[0].childNodes[1].style.height = divId.childNodes[0].childNodes[4].offsetHeight;
                divId.childNodes[0].childNodes[2].style.height = divId.childNodes[0].childNodes[4].offsetHeight;
                divId.childNodes[0].childNodes[3].style.height = divId.childNodes[0].childNodes[4].offsetHeight;
                divId.style.height = divId.childNodes[0].childNodes[4].offsetHeight;
                totalHeight = totalHeight + divId.childNodes[0].childNodes[4].offsetHeight;
            }
        }
    }, 'json');
}
function changeByTeachArea() {

    for (var i = 2; i <= cId; i++) {
        var selectId = document.getElementById("select" + i);

        if (selectId != undefined && selectId != null) {

            cascadeSelectByJson(selectId, "checkBoxList" + i);
        }
    }
}
var cId = 2;
function addId() {
    cId++;
}
function decId() {
    cId--;
}

var cSDivId = 2;
function addSDivId() {
    cSDivId++;
}
function decSDivId() {
    cSDivId--;
}
var totalHeight = 0,leftSelectHeight=0;
function addClazzSelect() {      //添加班级选择框
    var select1 = document.getElementById("select1").cloneNode(true);
    var strClazz = "<li  class=\"li1\"> <select id=\"select" + cId + "\" onchange=\"cascadeSelectByJson(this, 'checkBoxList" + cId + "');\">";
    strClazz += select1.innerHTML;
    strClazz += "</select></li> <li   id=\"checkBoxList" + cId + "\" class=\"li2\"></li>";
    var table = document.getElementById("clazzListDiv1").cloneNode(true);
    table.id = "table_" + cId;
    table.className = "part1";
    table.innerHTML = "   <ul   width=100%>" + strClazz + "</ul> ";
    var div = document.getElementById("clazzListDiv");
    div.appendChild(table);
    addId();
}
function addClazzFirstSelect() {      //添加班级选择框
    var select1 = document.getElementById("select1").cloneNode(true);
    var strClazz = "<li id=\"liSele\"  class=\"li1\"> <select id=\"select" + cId + "\" multiple=\"multiple\" size=\""+select1.options.length+"\" onchange=\"cascadeSelectByJson(this, 'checkBoxList" + cId + "');\">";
    strClazz += select1.innerHTML;
    strClazz += "</select></li> <li   id=\"checkBoxList" + cId + "\" class=\"li2\"></li>";
    var table = document.getElementById("clazzListDiv1").cloneNode(true);
    table.id = "table_" + cId;
    table.className = "part1";
    table.innerHTML = "   <ul   width=100%>" + strClazz + "</ul> ";
    var div = document.getElementById("clazzListDiv");
    div.appendChild(table);
    leftSelectHeight=document.getElementById("liSele").offsetHeight;
    addId();
}
function deleteClazzSelect(input) {  //删除 班级 选择框
    var div = document.getElementById("clazzListDiv");
    div.removeChild(input.parentNode.parentNode.parentNode);

}
function checkSelectClazzInsatance() {
    var clList ;
    var str = "";
    clList = document.all.cId;
    if (clList == null) {
        return false;
    } else if (clList.length == null) {
        if (clList.checked == true) {
            str += clList.value + ",";
        }
    } else {
        for (var i = 0; i < clList.length; i++) {

            if (clList[i].checked == true) {
                str += clList[i].value + ",";
            }
        }
    }
    if (str == "") {

        return false;
    }

    document.getElementById("clazzInstanceId").value = str.substring(0, str.length);

    return true;
}

var cSDivIdAfter = 2;
function addSDivIdAfter() {
    cSDivIdAfter++;
}