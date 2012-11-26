function cascadeSelectByJsonAfter(select) {
    var tId = document.getElementById("otherTeachAreaIds").value;
    var str = "";
    $.ajaxSetup({
        cache:false
    });
    var url = "/listClazzInstanceByClazzAndTeachareaToJson.action";
    var params = {clazzId : select.value,teachAreaId:tId };
    $.getJSON(url, params, function(data) {
        if (data == "") {
            alert("no data");
        } else if(data.clazz.trainingType!=20) {
            document.getElementById("waiTableID").style.display = "";
            document.getElementById("selectClass").style.display = "";
            document.getElementById("tTable").style.display="none";
            document.getElementById("clazzListDivAfter").innerHTML = "";
            document.getElementById("selectCourse").style.display = "none";
            str = "";
            var datalist = data.courseInstanceBeanList;
            for (var j = 0; j < datalist.length; j++) {
                var ids = datalist[j].id;
                str += "<div id =sDiv" + cSDivIdAfter + " class=part1After>";
                str += "<ul><li class=li21After><input type=\"checkbox\"   name=\"cId\" onclick=\"getSelectedClazzInstances(this,'" + datalist[j].clazzInstanceId + "','" + datalist[j].clazzInstanceName + "');\" id=\"cId\"  value=\"" + datalist[j].clazzInstanceId + "\"   />" + datalist[j].clazzInstanceName + "</li>";
                str += "<li class=li22After>" + datalist[j].startDate + "</li>";
                if (datalist[j].studentAmoutLow != '') {
                    if (datalist[j].studentAmoutHigh != '') {
                        str += "<li class=li23After>" + datalist[j].studentAmoutLow + "---" + datalist[j].studentAmoutHigh + "</li>";
                    } else {
                        str += "<li class=li23After>最少" + datalist[j].studentAmoutLow + "人</li>";
                    }
                } else {
                    if (datalist[j].studentAmoutHigh != '') {
                        str += "<li class=li23After>最多" + datalist[j].studentAmoutLow + "人</li>";
                    }else{
                        str += "<li class=li23After>未限制人数</li>";
                    }
                }
                str += "<li class=li24After></li>";
                str += "<li class=li25After></li>";
                str += "<li class=li26After></li></ul>";
                str += "</div>";
                addSDivIdAfter();
            }
            document.getElementById("clazzListDivAfter").insertAdjacentHTML("beforeEnd",str);
            var temInter = cSDivIdAfter - datalist.length;
            totalHeight = 0;
            for (var k = 0; k < datalist.length; k++,temInter++) {
                getStudentsAmountByJsonAfter(datalist[k].clazzInstanceId, "sDiv" + temInter);
            }
            totalHeight = totalHeight + 25;
        } else if(data.clazz.trainingType==20){
            document.getElementById("waiTableID").style.display = "none";
            document.getElementById("selectClass").style.display = "none";
            document.getElementById("selectCourse").style.display = "";
            document.getElementById("tTable").style.display="";
            document.getElementById("clazzListDivAfter").innerHTML = "";
            str = "";
            var datalist = data.termCourseList;
            for (var j = 0; j < datalist.length; j++) {
                var ids = datalist[j].id;
                var teachAreaId=document.getElementById("otherTeachAreaIds").value;
                str += "<div id =sDiv" + cSDivIdAfter + " class=part1After>";
                str += "<ul><li class=li21After><input type=\"checkbox\"   name=\"courseInstanceList["+j+"].termCourse.id\" onclick=\"getSelectedTermCourses(this,'" + ids + "','" + datalist[j].name + "','"+j+"');\" id=\"cId\"  value=\"" + ids + "\"   />" + datalist[j].name + "</li>";
                str += "<li class=li22After>" + datalist[j].serial + "</li>";
                str += "<li class=li23After>"+'<input type="text" name="courseInstanceList['+j+'].learningHours" id="learningHours'+j+'" style="width:85px;">'+"</li>"+'<input type="hidden" name="courseInstanceList['+j+'].teacher.id" id="teacherId'+j+'"/><input type="hidden" name="courseInstanceList['+j+'].choose" id="choose'+j+'" value="0"/><input type="text" id="teacherName'+j+'" name="courseInstanceList['+j+'].teacher" onclick="showUserInfoByTermCourseId('+teachAreaId+','+ids+','+j+');return false;" style="width:85px;" readonly="readonly"/>'+"</ul>";            /**/
                /*if (datalist[j].studentAmoutLow != '') {
                    if (datalist[j].studentAmoutHigh != '') {
                        str += "<li class=li23After>" + datalist[j].studentAmoutLow + "---" + datalist[j].studentAmoutHigh + "</li>";
                    } else {
                        str += "<li class=li23After>最少" + datalist[j].studentAmoutLow + "人</li>";
                    }
                } else {
                    if (datalist[j].studentAmoutHigh != '') {
                        str += "<li class=li23After>最多" + datalist[j].studentAmoutLow + "人</li>";
                    }
                }*/
                str += "</div>";
                addSDivIdAfter();
            }
            document.getElementById("clazzListDivAfter").insertAdjacentHTML("beforeEnd",str);
            /*var temInter = cSDivIdAfter - datalist.length;
            totalHeight = 0;
            for (var k = 0; k < datalist.length; k++,temInter++) {
                getStudentsAmountByJsonAfter(datalist[k].clazzInstanceId, "sDiv" + temInter);
            }
            totalHeight = totalHeight + 25;*/
        }
    }, 'json');
}
function getStudentsAmountByJsonAfter(clazzInstanceId, sDiv) {
    var divId = document.getElementById(sDiv);
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
            divId.childNodes[0].childNodes[3].innerHTML = data.courseInstanceForJsonBean.studentCount;
            divId.childNodes[0].childNodes[4].innerHTML = data.courseInstanceForJsonBean.chargeItems;
            divId.childNodes[0].childNodes[5].innerHTML = data.courseInstanceForJsonBean.courceInstanceInfo;
            divId.childNodes[0].childNodes[0].style.height = divId.childNodes[0].childNodes[5].offsetHeight;
            divId.childNodes[0].childNodes[1].style.height = divId.childNodes[0].childNodes[5].offsetHeight;
            divId.childNodes[0].childNodes[2].style.height = divId.childNodes[0].childNodes[5].offsetHeight;
            divId.childNodes[0].childNodes[3].style.height = divId.childNodes[0].childNodes[5].offsetHeight;
            divId.childNodes[0].childNodes[4].style.height = divId.childNodes[0].childNodes[5].offsetHeight;
            divId.style.height = divId.childNodes[0].childNodes[5].offsetHeight;
            totalHeight = totalHeight + divId.childNodes[0].childNodes[5].offsetHeight;
        }
    }, 'json');
}
/*function changeByTeachAreaAfter() {
    var selectId = document.getElementById("select" + 2);
    if (selectId != undefined && selectId != null) {
        cascadeSelectByJsonAfter(selectId);
    }
}*/
var cSDivIdAfter = 2;
function addSDivIdAfter() {
    cSDivIdAfter++;
}
var totalHeight = 0;