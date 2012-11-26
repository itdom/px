var isIe = (document.all) ? true : false;
var callBackId,callBackName;
function show(id, ev,callInId,callInName) {/*--打开--*/
    closeWindow();
    var bWidth = parseInt(document.documentElement.scrollWidth);
    var bHeight = parseInt(document.documentElement.scrollHeight) < 592 ? 592 : parseInt(document.documentElement.scrollHeight);
    if(isIe){
       setSelectState('hidden');
    }
    var o = document.getElementById(id);
    if (ev.clientX > 300) {
        o.style.left = 200 + "px";
    } else {
        o.style.left = ev.clientX + 10 + "px";
    }
    o.style.top = ev.clientY + 40 + "px";
    o.style.display = "block";
    o.style.width = "500px";
    o.style.height = "300px";
    callBackId=callInId;
    callBackName=callInName;
}
function shows(id, ev,con,callInId,callInName) {
   closeWindow();
    var bWidth = parseInt(document.documentElement.scrollWidth);
    var bHeight = parseInt(document.documentElement.scrollHeight) < 592 ? 592 : parseInt(document.documentElement.scrollHeight);
    if(con==null||con=="false"){
        if(isIe){
            setSelectState('hidden');
        }
    }
    var o = document.getElementById(id);
    if (ev.clientX > 300) {
        o.style.left = 200 + "px";
    } else {
        o.style.left = ev.clientX + 10 + "px";
    }
    o.style.top = ev.clientY + 40 + "px";
    o.style.display = "block";
    o.style.width = "500px";
    o.style.height = "300px";
    callBackId=callInId;
    callBackName=callInName;
}
var thetype = "";
var isSingle = "";
var isAll = "";
var termType = "";
var isAllBranch="";

var id="";
var name="";
var fatherId="";
var teachAreaArray = new Array();

function TeachArea(id,name,fatherId){
    this.id=id;
    this.name=name;
    this.fatherId=fatherId;
}

TeachArea.prototype.getId=function(){
    return this.id;
};

TeachArea.prototype.getName=function(){
    return this.name;
};

TeachArea.prototype.getFatherId=function(){
    return this.fatherId;
};

TeachArea.prototype.getIdAndChildIds=function(){
    var ids=null;
    for(var i=0;i<teachAreaArray.length;i++){
        if(this.id==teachAreaArray[i].id){
            ids=ids+teachAreaArray[i].id+",";
        }
        if(this.id==teachAreaArray[i].fatherId){
            ids=ids+teachAreaArray[i].id+",";
            for(var j=0;j<teachAreaArray.length;j++){
                if(teachAreaArray[i].id==teachAreaArray[j].fatherId){
                    ids=ids+teachAreaArray[j].id+",";
                }
            }
        }
    }
    return ids.substring(0,ids.length-1);
};

TeachArea.prototype.getZongTa=function(){
    for(var i=0;i<teachAreaArray.length;i++){
        if(teachAreaArray[i].fatherId==null){
            return teachAreaArray[i];
        }
    }
};



function selectClazzOrClazzInstance(type, single , isAllTeachArea,enable,isAllBranch) {
    thetype = type;
    isSingle = single;
    isAll = isAllTeachArea;
    termType = enable;
    isAllBranch = isAllBranch;
    /*选择专业*/
    if (thetype == 'clazz'){
        document.getElementById("catagorydiv").style.width = 100 + '%';
        document.getElementById("clazzInstancediv").style.display = 'none';
        document.getElementById("studentTrainingdiv").style.display = 'none';
        document.getElementById("search").style.display = 'none';
    }
    /*选择学生*/
    else if (thetype == 'studentTraining') {
        document.getElementById("catagorydiv").style.width = 45 + '%';
        document.getElementById("clazzInstancediv").style.width = 22 + '%';
        document.getElementById("studentTrainingdiv").style.width = 23 + '%';
        document.getElementById("search").style.display = 'block';
    }
    /*选择课程*/
    else if (thetype == 'termCourse') {
        document.getElementById("catagorydiv").style.width = 45 + '%';
        document.getElementById("clazzTermdiv").style.width = 22 + '%';
        document.getElementById("termCoursediv").style.width = 23 + '%';
        document.getElementById("clazzInstancediv").style.display = 'none';
        document.getElementById("studentTrainingdiv").style.display = 'none';
        document.getElementById("search").style.display = 'none';
        document.getElementById("tittleup").style.display = 'none';
    }
    /*选择班级*/
    else if (thetype == "clazzInstance") {
        document.getElementById("clazzInstancediv").style.left = 250 + 'px';
        document.getElementById("studentTrainingdiv").style.display = 'none';
        document.getElementById("search").style.display = 'none';
    }
    /*选择校区*/
    else if (thetype == "teacharea") {
        document.getElementById("branchdiv").style.display = 'block';
        document.getElementById("branchdiv").style.width = 30 + '%';
        document.getElementById("teachAreadiv").style.left = 147 + 'px';
        document.getElementById("teachAreadiv").style.width = 30 + '%';
        document.getElementById("catagorydiv").style.left = 297 + 'px';
        document.getElementById("catagorydiv").style.width = 40 + '%';
        document.getElementById("clazzInstancediv").style.display = 'none';
        document.getElementById("studentTrainingdiv").style.display = 'none';
        document.getElementById("search").style.display = 'none';
    }
    /*选择教室*/
    else if(thetype == "classroom"){
        document.getElementById("catagorydiv").style.width = 100 + '%';
        document.getElementById("clazzInstancediv").style.display = 'none';
        document.getElementById("studentTrainingdiv").style.display = 'none';
        document.getElementById("search").style.display = 'none';
        document.getElementById("clazzTermdiv").style.left=246+'px';
    }
    var params = {date:new Date()};
    if(thetype == "teacharea"){
        $.getJSON('/edu/base/teachArea/listTeachAreaToJson.action',params,function(res){
           if(res==null || res==""){
                alert("no data!");
           }else{
                teachAreaList=res.teachAreaList;
                for(var i=0;i<teachAreaList.length;i++){
                    teachAreaArray.push(new TeachArea(teachAreaList[i].id,teachAreaList[i].name,teachAreaList[i].fatherTeachAreaId));
                }
                var data = new Array();
                var data2=new Array();
                for(var i=0;i<teachAreaArray.length;i++){
                    if(teachAreaArray[i].fatherId==null){
                        data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
                        data.push('<tr>');
                        data.push('<td class="deep">');
                        data.push('<a href ="#" onclick="receiveTeachArea(\''+teachAreaArray[i].getId()+'\',\''+teachAreaArray[i].getName()+'\')">');
                        data.push(teachAreaArray[i].getName() + '</a>');
                        if(enable=='all' && teachAreaArray[i].getIdAndChildIds()!=teachAreaArray[i].id){
                            data.push('<a href ="#" onclick="receiveTeachArea(\''+teachAreaArray[i].getIdAndChildIds()+'\',\''+teachAreaArray[i].getName()+'(包含下级)\')">');
                            data.push("(包含)" + '</a>');
                        }
                        data.push('</tr>');
                        data.push('</tbody>');
                        data.push('</table>');
                    }else if(teachAreaArray[i].fatherId==teachAreaArray[i].getZongTa().getId()){
                        data2.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
                        data2.push('<tr>');
                        data2.push('<td width="50%"');
                        if (i % 2 == 0) {
                            data2.push(' class="deep"');
                        } else {
                            data2.push(' class="deep"');
                        }
                        data2.push('>');
                        data2.push('<a href ="#" onclick="receiveTeachArea(\''+teachAreaArray[i].getId()+'\',\''+teachAreaArray[i].getName()+'\')">');
                        data2.push(teachAreaArray[i].getName() + '</a>');
                        if(enable=='all' && teachAreaArray[i].getIdAndChildIds()!=teachAreaArray[i].id){
                            data2.push('<a href ="#" onclick="receiveTeachArea(\''+teachAreaArray[i].getIdAndChildIds()+'\',\''+teachAreaArray[i].getName()+'(包含下级)\')">');
                            data2.push("(包含)" + '</a>');
                        }
                        if(teachAreaArray[i].getIdAndChildIds()!=teachAreaArray[i].id){
                            data2.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href ="#" onclick="openTeachAreaArray(\''+teachAreaArray[i].getId()+'\',\''+enable+'\')">');
                            data2.push("展开" + '</a>');
                        }
                        data2.push('</tr>');
                        data2.push('</tbody>');
                        data2.push('</table>');
                    }
                }
                document.getElementById('branchdiv').innerHTML = data.join('');
                document.getElementById('teachAreadiv').innerHTML = data2.join('');
           }
        });
    }else if(thetype =="classroom"){
        $.getJSON('/edu/base/teachArea/listTeachAreaToJson.action', params, function(res) {
               if(res==null||res ==""){
                  alert("no data!");
               }else{
                  var teachAreaList = res.teachAreaList;
                  var data = new Array();
                  var allSchool="全部校区";
                  data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
                  data.push('<tr>');
                  data.push('<td class="head">');
                  data.push('');
                  data.push('</td>');
                  data.push('</tr>');
                  for (var j=0;j<teachAreaList.length;j++){
                      data.push('<tr>');
                      data.push('<td width="50%"');
                        if (j % 2 == 0) {
                            data.push(' class="deep"');
                        } else {
                            data.push(' class="tint"');
                        }
                      data.push('>');
                      data.push('<a href ="#" onclick="showClassRoom(\''+teachAreaList[j].id+'\',\''+teachAreaList[j].name+'\')">');
                      data.push(teachAreaList[j].name + '</a>');
                      data.push('</td>');
                      data.push('</tr>');
                  }
                  data.push('</tbody>');
                  data.push('</table>');
                  document.getElementById('teachAreadiv').innerHTML = data.join('');
               }
           });
    }else{
         $.getJSON('/listCategoryToJson.action', params, function(res) {
            if (res==null||res == ""){
                alert("no data!");
            } else {
                var categoryList = res.categoryList;
                var clazzList = res.clazzList;
                var teachAreaList = res.teachAreaList;
                for(var k = 0; k<teachAreaList.length; k++){
                    var selectOption = document.createElement("option");
                    selectOption.value = teachAreaList[k].id;
                    selectOption.text = teachAreaList[k].descripName;
                    document.getElementById('teachArea').add(selectOption);
                }
                //动态创建表格
                var data = new Array();
                data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
                data.push('<tr>');
                data.push('<td class="head">');
                data.push('类别');
                data.push('</td>');
                data.push('<td class="head">');
                data.push('专业');
                data.push('</td>');
                data.push('</tr>');
                for (var j = 0; j < categoryList.length; j++) {
                    data.push('<tr>');
                    data.push('<td width="50%"')
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                    data.push('>');
                    data.push(categoryList[j].fatherName + '</td>');
                    data.push('<td width="50%"');
                    data.push('>');
                    data.push('<table border="0" cellpadding="0" cellspacing="0" scroll="no" class="maintable">');
                    var temStr=0;
                    for (var i = 0; i < clazzList.length; i++) {
                        if (categoryList[j].id == clazzList[i].categoryId) {
                            temStr=temStr+1;
                            data.push('<tr><td')
                            if (temStr % 2 == 0) {
                                data.push(' class="deep"');
                            } else {
                                data.push(' class="tint"');
                            }
                            data.push('>');
                            if (thetype == 'clazz') {
                                data.push('<a href ="#" onclick="showClazz(');
                            } else
                            {
                                if (isSingle == 'false' && thetype == 'clazzInstance') {
                                    data.push('<a href ="#" onclick="showClazzInstanceForMore(\'\''+',');
                                }else if(thetype == 'termCourse'){
                                    data.push('<a href ="#" onclick="showClazzTerm(');
                                } else {
                                    data.push('<a href ="#" onclick="showClazzInstance(');
                                }
                            }
                            data.push(clazzList[i].id + ',' + '\'' + clazzList[i].name + '\'' + ')">');
                            data.push(clazzList[i].name + '</a><br/>');
                            data.push('</td>');
                            data.push('</tr>');
                        }
                    }
                    data.push('</table>');
                    data.push('</td>');
                    data.push('</tr>');
                }
                data.push('</tbody><table>');
                document.getElementById('catagorydiv').innerHTML = data.join('');
            }
        });
    }
}

function openTeachAreaArray(teachAreaId,enable){
    var data3=new Array();
    for(var i=0;i<teachAreaArray.length;i++){
        if(teachAreaArray[i].fatherId==teachAreaId){
            data3.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data3.push('<tr>');
            data3.push('<td width="50%"');
            if (i % 2 == 0) {
                data3.push(' class="deep"');
            } else {
                data3.push(' class="tint"');
            }
            data3.push('>');
            data3.push('<a href ="#" onclick="receiveTeachArea(\''+teachAreaArray[i].getId()+'\',\''+teachAreaArray[i].getName()+'\')">');
            data3.push(teachAreaArray[i].getName() + '</a>');
            if(enable=='all' && teachAreaArray[i].getIdAndChildIds()!=teachAreaArray[i].id){
                data3.push('<a href ="#" onclick="receiveTeachArea(\''+teachAreaArray[i].getIdAndChildIds()+'\',\''+teachAreaArray[i].getName()+'(包含下级)\')">');
                data3.push("(包含)" + '</a>');
            }
            if(teachAreaArray[i].getIdAndChildIds()!=teachAreaArray[i].id){
                data3.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href ="#" onclick="openTeachAreaArray(\''+teachAreaArray[i].getId()+'\',\''+enable+'\')">');
                data3.push("展开" + '</a>');
            }
            data3.push('</tr>');
            data3.push('</tbody>');
            data3.push('</table>');
        }
    }
    document.getElementById('catagorydiv').innerHTML = data3.join('');
}

function showClassRoom(teachAreaId,teachAreaName){
    var params={teachAreaId:teachAreaId,date:new Date()};
    $.getJSON('/listClassroom.action',params,function(res){
        var classroomList = res.classroomList;
        var data=new Array();
        data.push('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="maintable"><tbody>');
        data.push('<tr>');
        data.push('<td class="head">');
        data.push('教室');
        data.push('</td>');
        data.push('</tr>');
        for(var i=0;i<classroomList.length;i++){
            data.push('<tr>');
            data.push('<td ');
            if(i%2==0){
                data.push('class="deep"');
            }else{
                data.push('class="tint"');
            }
            data.push('>');
            data.push('<a href ="#" onclick="selectClassroom(');
            data.push(classroomList[i].id + ',' + '\'' + classroomList[i].name + '\'' + ')">');
            data.push(classroomList[i].name + '</a><br/>');
            data.push('</td>');
            data.push('</tr>');
        }
        data.push('</tbody><table>');
        document.getElementById('clazzTermdiv').innerHTML = data.join('');
    });
}

function selectClassroom(classRoomId,classRoomName){
    document.getElementById("classRoomName").value = classRoomName;
    document.getElementById("classRoomId").value = classRoomId;
    closeed('fd');
}

function showClazz(ids, names) {
    document.getElementById("clazzName").value = names;
    document.getElementById("clazzId").value = ids;
    closeed('fd');
}

function showClazzTerm(ids, names) {
    document.getElementById("clazzTermdiv").innerHTML = "";
    document.getElementById("termCoursediv").innerHTML = "";
//    var teachAreaId = document.getElementById("teachArea").value;
    var teachAreaId = "";
    var params = null;
    if(isAll=='true'){
        params = {teachAreaId: teachAreaId,clazzId : ids ,date:new Date(),isAll :isAll};
    }  else{
        params = {teachAreaId: teachAreaId,clazzId : ids ,date:new Date()};
    }
    $.getJSON('/listTermCourseByClazzToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var clazz = res.clazz;
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">');
            if(clazz.trainingType=='16'||clazz.trainingType=='41'){
                data.push('学期');
                data.push('</td>');
                data.push('</tr>');
                var datalist = res.termList;
                if(datalist!=null&&datalist.length>0){
                for (j = 0; j < datalist.length; j++) {
                    data.push('<tr>');
                    data.push('<td width="80%"')
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                    data.push('>');
                    data.push('<a href ="#" onclick="showTermCourse(');
                    data.push(datalist[j].id + ',' + '\'' + datalist[j].name + '\'' + ')">');
                    data.push(datalist[j].name + '</a><br/>');
                    data.push('</td>');
                    data.push('</tr>');
                }
                }
            } else {
                data.push('课程');
                data.push('</td>');
                data.push('</tr>');
                var datalist = res.termCourseList;
                if(datalist!=null&&datalist.length>0){
                    for (j = 0; j < datalist.length; j++) {
                        data.push('<tr>');
                        data.push('<td width="80%"')
                        if (j % 2 == 0) {
                            data.push(' class="deep"');
                        } else {
                            data.push(' class="tint"');
                        }
                        data.push('>');
                        data.push('<a href ="#" onclick="receiveTermCourse(');
                        data.push(datalist[j].id + ',' + '\'' + datalist[j].name + '\'' + ')">');
                        data.push(datalist[j].name + '</a><br/>');
                        data.push('</td>');
                        data.push('</tr>');
                    }
                }
            }
            data.push('</tbody><table>');
            document.getElementById('ClazzTermdiv').innerHTML = data.join('');
            document.getElementById('ClazzTermdiv').focus();
        }
    });
}
function showTermCourse(ids, names){
   document.getElementById("termCoursediv").innerHTML = "";
    var teachAreaId = "";
    var params = null;
    if(isAll=='true'){
        params = {teachAreaId: teachAreaId,clazzTermId : ids ,date:new Date(),isAll :isAll};
    }  else{
        params = {teachAreaId: teachAreaId,clazzTermId : ids ,date:new Date()};
    }
    $.getJSON('/listTermCourseByClazzTermToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">');
            data.push('课程');
            data.push('</td>');
            data.push('</tr>');
            var datalist = res.termCourseList;
            if(datalist!=null&&datalist.length>0){
            for (j = 0; j < datalist.length; j++) {
                data.push('<tr>');
                data.push('<td width="80%"')
                if (j % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                data.push('<a href ="#" onclick="receiveTermCourse(');
                data.push(datalist[j].id + ',' + '\'' + datalist[j].name + '\'' + ')">');
                data.push(datalist[j].name + '</a><br/>');
                data.push('</td>');
                data.push('</tr>');
            }
            }
            data.push('</tbody><table>');
            document.getElementById('termCoursediv').innerHTML = data.join('');
            document.getElementById('termCoursediv').focus();
        }
    });
}
function receiveTermCourse(ids,names){
    if(termType=="point"){
        document.getElementById(callBackName).value = names;
        document.getElementById(callBackId).value = ids;
    } else if(termType=="problem"){
        document.getElementById(callBackName).value = names;
        document.getElementById(callBackId).value = ids;
    }else if(termType=="paper"){
        document.getElementById(callBackName).value = names;
        document.getElementById(callBackId).value = ids;
    }
    closeed('fd');
}

function showClazzInstance(ids, names) {
    document.getElementById("studentTrainingdiv").innerHTML = "";
    var teachAreaId = document.getElementById("teachArea").value;
    var params = null;
    if(isAll=='true'){
        params = {teachAreaId: teachAreaId,clazzId : ids ,date:new Date(),isAll :isAll};
    }  else{
        params = {teachAreaId: teachAreaId,clazzId : ids ,date:new Date()};
    }

    $.getJSON('/listClazzInstanceByClazzToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">')
            data.push('班级');
            data.push('</td>')
            data.push('</tr>');
            var datalist = res.clazzInstanceList;
            for (j = 0; j < datalist.length; j++) {

                data.push('<tr>');
                data.push('<td width="80%"')
                if (j % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                if (thetype == 'clazzInstance') {
                    data.push('<a href ="#" onclick="receiveClazzInstance(');
                } else {
                    data.push('<a href ="#" onclick="showStudentTraining(');
                }
                data.push(datalist[j].id + ',' + '\'' + datalist[j].name + '\'' + ')">');
                data.push(datalist[j].name + '</a><br/>');
                data.push('</td>');
                data.push('</tr>');
            }
            data.push('</tbody><table>');
            document.getElementById('clazzInstancediv').innerHTML = data.join('');
            document.getElementById('clazzInstancediv').focus();
        }
    });
}
function receiveClazzInstance(ids, names) {
    document.getElementById(callBackName).value = names;
    document.getElementById(callBackId).value = ids;
    closeed('fd');
}
function showStudentTraining(ids, names) {
    var params = {clazzInstanceId : ids ,date:new Date()};
    $.getJSON('/listStudentTrainingByClazzInstanceToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">')
            data.push('学生');
            data.push('</td>')
            data.push('</tr>');
            var datalist = res.studentTrainingList;
            for (j = 0; j < datalist.length; j++) {
                data.push('<tr>');
                data.push('<td width="80%"')
                if (j % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                data.push('<a href ="#" onclick="receiveStudentTraining(');
                data.push(datalist[j].id + ',' + '\'' + datalist[j].studentName + '\'' + ')">');
                data.push(datalist[j].studentName + '</a><br/>');
                data.push('</td>');
                data.push('</tr>');
            }
            data.push('</tbody><table>');
            document.getElementById('studentTrainingdiv').innerHTML = data.join('');
        }
    });
}
function receiveStudentTraining(ids, names) {
    document.getElementById("studentTrainingName").value = names;
    document.getElementById("studentTrainingId").value = ids;
    closeed('fd');
}

function listTeachAreaBySchoolId(schoolId,enable){
    var params={date:new Date(),schoolId:schoolId};
    $.getJSON('/edu/base/teachArea/listTeachAreaToJson.action', params, function(res) {
           if(res==null||res ==""){
              alert("no data!");
           }else{
              var teachAreaList = res.teachAreaList;
              var data = new Array();
              var allSchool="全部校区";
              data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
              /*data.push('<tr>');
              data.push('<td class="head" colspan="2">');
              data.push('');
              data.push('</td>');
              data.push('</tr>');*/
              /*if(enable=="all"){
                  data.push('<tr>');
                  data.push('<td class="tint">');
                  data.push('<a href ="#" onclick="receiveTeachArea(-1,\''+allSchool+'\')">全部校区</a>');
                  data.push('</td>');
                  data.push('</tr>');
              }*/
              for (var j=0;j<teachAreaList.length;j++){
                  data.push('<tr>');
                  data.push('<td ');
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                  data.push('>');
                  data.push('<a href ="#" onclick="listTeachAreaBySchoolId(\''+teachAreaList[j].id+'\',\'1\')">');
                  data.push(teachAreaList[j].name + '</a>');
                  data.push('</td>');

                  data.push('<td  align="right" ');
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                  data.push('>');
                  if(teachAreaList[j].discriminator=='Z'){
                       data.push("总部");
                  }else if(teachAreaList[j].discriminator=='B'){
                       data.push("大区");
                  }else if(teachAreaList[j].discriminator=='T'){
                       data.push("校区");
                  }else if(teachAreaList[j].discriminator=='O'){
                       data.push("部门");
                  }
                  data.push('&nbsp;<input type="checkbox" style="cursor:default" onclick="receiveTeachArea(\''+teachAreaList[j].id+'\',\''+teachAreaList[j].name+'\')"></input>');
                  data.push('</td>');
                  data.push('</tr>');
              }
              data.push('</tbody>');
              data.push('</table>');
              if(enable==0){
                  document.getElementById('teachAreadiv').innerHTML = data.join('');
              }else {
                  document.getElementById('catagorydiv').innerHTML = data.join('');
              }
           }
       });
}

function receiveTeachArea(ids, names) {
    document.getElementById("otherTeachAreaName").value = names;
    document.getElementById("otherTeachAreaIds").value = ids;
    closeed('fd');
}
function searchStudent() {
    var stuName = document.getElementById("searchName").value;
    if(isEmpty(stuName)){
        alert("姓名不能为空");
        document.getElementById("searchName").focus();
        return false;
    }
    var params = {searchValue:stuName,searchBy:"byName",date:new Date()};
    $.getJSON('/listStudentTrainingByNameJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">')
            data.push('学生');
            data.push('</td>')
            data.push('</tr>');
            if (res.studentTrainingList != null && res.studentTrainingList.length > 0) {
                var datalist = res.studentTrainingList;
                for (j = 0; j < datalist.length; j++) {
                    data.push('<tr>');
                    data.push('<td width="80%"')
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                    data.push('>');
                    data.push('<a href ="#" onclick="receiveStudentTraining(');
                    data.push(datalist[j].id + ',' + '\'' + datalist[j].studentName + '\'' + ')">');
                    data.push(datalist[j].studentName + '</a><br/>');
                    data.push('</td>');
                    data.push('</tr>');
                }
            } else {
                data.push('<tr>');
                data.push('<td width="80%"')
                data.push(' class="deep"');
                data.push('>');
                data.push('找不到相关学生!');
                data.push('</td>');
                data.push('</tr>');
            }
            data.push('</tbody><table>');
            document.getElementById('studentTrainingdiv').innerHTML = data.join('');
        }
    });

}
var strId = "";
var strText = "";
function addOptionToSelect(select, option) {
    if (select.length == 0) {
        select.add(option);
    } else {
        var flag = true;
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == option.value) {
                flag = false;
                break;
            }
        }
        if (flag) {
            select.add(option);
        }
    }
}
function moveRightToLeft() {

    var rightSelect = document.getElementById("rightSelect");
    var values = new Array();
    for (var i = 0; i < rightSelect.length; i++) {
        if (rightSelect.options[i].selected) {
            values.push(rightSelect.options[i].value);
        }
    }
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < rightSelect.length; j++) {
            if (rightSelect.options[j].value == values[i]) {
                rightSelect.remove(j);
                break;
            }
        }
    }
    setttingId();
}

function moveLeftToRight() {
    var leftSelect = document.getElementById("leftSelect");
    for (var i = 0; i < leftSelect.options.length; i++) {
        if (leftSelect.options[i].selected) {
            var option = document.createElement("option");
            option.value = leftSelect.options[i].value;
            option.text = leftSelect.options[i].text;
            addOptionToSelect(rightSelect, option);
        }
    }
    setttingId();
}
function setttingId() {
    var sid = "";
    var stext = "";
    for (var i = 0; i < rightSelect.length; i++) {
        sid += rightSelect.options[i].value + ",";
        stext += rightSelect.options[i].text + ",";
    }
    if (sid.length > 0) {
        strId = sid.substring(0, sid.length - 1);
        strText = stext.substring(0, stext.length - 1);
    }
}
function showClazzInstanceForMore(teachAreaId, ids, names) {
    document.getElementById("studentTrainingdiv").innerHTML = "";
    var teachAreaId = document.getElementById("teachArea").value;
    var params = {teachAreaId: teachAreaId, clazzId : ids ,date:new Date()};
    $.getJSON('/listClazzInstanceByClazzToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            var datalist = res.clazzInstanceList;
            data.push('<tr>');
            data.push('<td width="80%" >')
            data.push('<select id="leftSelect" size="22" multiple="multiple" style="width:130px;" ondblclick="moveLeftToRight();">')
            for (j = 0; j < datalist.length; j++) {
                data.push('<option value="' + datalist[j].id + '">' + datalist[j].name + '</option>');
            }
            data.push('</select>');
            data.push('</td>');
            data.push('<td>');
            data.push('<input type="button" value="←" class="btn" onclick="moveRightToLeft();"/>');
            data.push('<br/> <br/>');
            data.push('<input type="button" value="→" class="btn" onclick="moveLeftToRight();"/>');
            data.push('</td>');
            data.push('<td>');

            data.push('<select id="rightSelect" size="22" multiple="multiple" style="width:130px;" ondblclick="moveRightToLeft();"> ');
            if (document.getElementById('rightSelect') != null) {
                data.push(document.getElementById('rightSelect').innerHTML)
            }

            data.push('</select>');
            data.push('</td>');
            data.push('</tr>');
            data.push('<tr>');
            data.push('<td>');
            data.push('<input type="button" value="确定" onclick="receiveClazzInstanceForMore();">');
            data.push('</td>');
            data.push('</tr>');

            data.push('</tbody><table>');
            document.getElementById('clazzInstancediv').innerHTML = data.join('');
            document.getElementById('clazzInstancediv').focus();
        }
    });
}

function receiveClazzInstanceForMore() {
    document.getElementById("clazzInstanceName").value = strText;
    document.getElementById("clazzInstanceIds").value = strId;
    closeed('fd');
}
function submitform() {
    document.forms[0].submit();
}
function setSelectState(state)
{
    var objl = document.getElementsByTagName('select');
    for (var i = 0; i < objl.length; i++)
    {
        objl[i].style.visibility = state;
    }
}
//关闭窗口
function closeWindow()
{
    if (document.getElementById('back') != null)
    {
        document.getElementById('back').parentNode.removeChild(document.getElementById('back'));
    }
    if (document.getElementById('mesWindow') != null)
    {
        document.getElementById('mesWindow').parentNode.removeChild(document.getElementById('mesWindow'));
    }
    if (isIe) {
        setSelectState('');
    }
}
function closeed(id) {/*--关闭--*/
    closeWindow();
    var o = document.getElementById(id);
    if (o.style.display == "block")
    {
        o.style.display = "none";
    }
}

function receiveExamPage(ids, names,examPageName,examPageId) {
    document.getElementById(examPageName).value = names;
    document.getElementById(examPageId).value = ids;
    closeed('fd');
}

