   function cascadeSelectByJson(teachArea,select, cascadeName) {
                        var cascadeSelect = document.getElementById(cascadeName);
                        var tId = document.getElementById(teachArea).value;
                        var str= "";

                        var url = "/listClazzInstanceByClazzAndTeachareaToJson.action";
                                var params = {clazzId : select.value,teachAreaId:tId };
                                $.getJSON(url, params, function(data) {
                                    if (data == "") {
                                        alert("no data");
                                    } else if(data.clazz.trainingType==16){//多期  列学期
                                        cascadeSelect.innerHTML  = "";
                                        str= "";
                                        var datalist = data.termList;
                                          for (var j = 0; j < datalist.length; j++) {
                                             var ids = datalist[j].id;
                                             var studentAmountDiv = "<div id =sDiv"+cId+" style=\"width:auto;\"></div>" ;
                                             str += "<div id =sDiv"+cId+" class=part1>";
                                             str += "<ul><input type=\"hidden\" name=\"personThreadTargetList["+cId+"].teachArea.id\" value=\""+tId+"\"/><input type=\"hidden\" name=\"personThreadTargetList["+cId+"].clazz.id\" value=\""+select.value+"\"/><input   type=\"checkbox\"   name=\"personThreadTargetList["+cId+"].clazzTerm.id\" id=\"personThreadTargetList["+cId+"].clazzTerm.id\"  value=\""+ datalist[j].id+"\"/>"+datalist[j].name;  /*onclick=\"getStudentsAmountByJson("+datalist[j].id+",sDiv"+cId+","+cascadeName+")\"*/
                                             str +="</div>";
                                             addId();
                                          }
                                    }else if(data.clazz.trainingType==41){//全日制  列年级
                                          cascadeSelect.innerHTML  = "";
                                          str= "";
                                          var datalist=data.clazz.gradeNames.split(",");
                                          for (var j = 0; j < datalist.length; j++) {
                                             var ids = datalist[j].id;
                                             var studentAmountDiv = "<div id =sDiv"+cId+" style=\"width:auto;\"></div>" ;
                                             str += "<div id =sDiv"+cId+" class=part1>";
                                             str += "<ul><input type=\"hidden\" name=\"personThreadTargetList["+cId+"].teachArea.id\" value=\""+tId+"\"/><input type=\"hidden\" name=\"personThreadTargetList["+cId+"].clazz.id\" value=\""+select.value+"\"/><input type=\"checkbox\"   name=\"personThreadTargetList["+cId+"].gradeLevel\" id=\"personThreadTargetList["+cId+"].gradeLevel\" value=\""+j+"\"/>"+datalist[j];  /*onclick=\"getStudentsAmountByJson("+datalist[j].clazzInstanceId+",sDiv"+cId+","+cascadeName+")\" */
                                             str +="</div>";
                                             addId();
                                          }
                                    }else{//单期  循环 一对一  列课程
                                        cascadeSelect.innerHTML  = "";
                                        str= "";
                                        var datalist = data.termCourseList;
                                        for (var j = 0; j < datalist.length; j++) {
                                             var ids = datalist[j].id;
                                             var studentAmountDiv = "<div id =sDiv"+cId+" style=\"width:auto;\"></div>" ;
                                             str += "<div id =sDiv"+cId+" class=part1>";
                                             str += "<ul><input type=\"hidden\" name=\"personThreadTargetList["+cId+"].teachArea.id\" value=\""+tId+"\"/><input type=\"hidden\" name=\"personThreadTargetList["+cId+"].clazz.id\" value=\""+select.value+"\"/><input   type=\"checkbox\"   name=\"personThreadTargetList["+cId+"].termCourse.id\"  id=\"personThreadTarget["+cId+"].termCourse.id\"  value=\"" + datalist[j].id + "\"   />" + datalist[j].name;   /*onclick=\"getStudentsAmountByJson("+datalist[j].id+",sDiv"+cId+","+cascadeName+");\"*/
                                             str +="</div>";
                                             addId();
                                          }
                                    }
                                    cascadeSelect.innerHTML  = str;
                                     if(datalist.length > 0){
                                          var hight=document.getElementById("countli"+cascadeName.substring(cascadeName.length-1)).offsetHeight;
                                          document.getElementById("table_"+cascadeName.substring(cascadeName.length-1)).style.height=cascadeSelect.offsetHeight;
                                          if(hight>cascadeSelect.offsetHeight)document.getElementById("table_"+cascadeName.substring(cascadeName.length-1)).style.height=hight;
                                     } else  if(datalist.length == 0){
                                         document.getElementById("table_"+cascadeName.substring(cascadeName.length-1)).style.height = document.getElementById("countli"+cascadeName.substring(cascadeName.length-1)).offsetHeight;
                                     }
                                }, 'json');
                    }
   /*function getStudentsAmountByJson(clazzInstanceId, divId,cascadeName) {
        var cascadeSelect = cascadeName.id;
        var sDiv = divId;
        var str= "";
        var url = "/getStudentsAmountByJson.action";
        var params = {clazzId : clazzInstanceId,date:new Date() };
        $.getJSON(url, params, function(data) {
            if (data == "") {
                alert("no data");
            } else {
                str= "";
                var datalist = data;
                divId.childNodes[0].childNodes[3].innerHTML  =   data.courseInstanceForJsonBean.studentCount;
                divId.childNodes[0].childNodes[4].innerHTML  =   data.courseInstanceForJsonBean.courceInstanceInfo;
                divId.childNodes[0].childNodes[0].style.height  = divId.childNodes[0].childNodes[4].offsetHeight ;
                divId.childNodes[0].childNodes[1].style.height  = divId.childNodes[0].childNodes[4].offsetHeight ;
                divId.childNodes[0].childNodes[2].style.height  = divId.childNodes[0].childNodes[4].offsetHeight ;
                divId.style.height  = divId.childNodes[0].childNodes[4].offsetHeight ;
                document.getElementById("table_"+cascadeSelect.substring(12)).style.height  = cascadeName.offsetHeight    ;
            }
        }, 'json');
   }*/
   function changeByTeachArea(teachAreaCid,selectCid,checkBoxListCid){
       var selectId =   document.getElementById(selectCid);
        if(selectId != undefined &&selectId !=null){
            cascadeSelectByJson(teachAreaCid,selectId, checkBoxListCid);
        }
   }
   var cId = 2;
   function addId(){
            cId++;
   }
   function decId(){
      cId--;
   }

    function addClazzSelect() {      //添加班级选择框
        var teachArea1=document.getElementById("teachArea1").cloneNode(true);
        var strTemp="<li id=\"countli"+cId+"\"  class=\"li11\"> <select id=\"teachArea"+cId+"\" onchange=\"changeByTeachArea('teachArea"+cId+"','select"+cId+"','checkBoxList"+cId+"');\">";
        strTemp += teachArea1.innerHTML;
        strTemp +="</select></li>";
        var select1 = document.getElementById("select1").cloneNode(true);
        var strClazz =strTemp+"<li  class=\"li12\"> <select id=\"select"+cId+"\" onchange=\"cascadeSelectByJson('teachArea"+cId+"',this, 'checkBoxList"+cId+"');\">";
        strClazz += select1.innerHTML;
        strClazz +="</select></li> <li   id=\"checkBoxList"+cId+"\" class=\"li2\"></li>";
        strClazz +="<li class=\"li3\"> <input type=\"button\" value=\"删除\" class=\"btn\" onclick=\"deleteClazzSelect(this);\"/> " +
                   "<input type=\"button\" value=\"添加\" class=\"btn\" onclick=\"addClazzSelect();\"/></li>  ";
        var table = document.getElementById("clazzListDiv1").cloneNode(true);
        table.id = "table_" +cId;
        table.className = "part1";
        table.innerHTML =  "   <ul width=100%>"+ strClazz +"</ul> " ;
        var div = document.getElementById("clazzListDiv");
        div.appendChild(table);

         addId();
   }
   function  deleteClazzSelect(input){  //删除 班级 选择框
        var div = document.getElementById("clazzListDiv");
        div.removeChild(input.parentNode.parentNode.parentNode);
   }
   function checkSelectClazzInsatance(){
       var clList ;
       var str = "";
       clList = document.all.cId;
       if(clList != null){
                 if(clList.length == null) {
                      if(clList.checked == true){
                         str += clList.value+",";
                      }
               }else {
                    for(var i =0;i < clList.length;i++){

                      if(clList[i].checked == true){
                         str += clList[i].value+",";
                      }
                   }
               }
       }
       if(str.length>=1)document.getElementById("termTargets").value = str.substring(0,str.length);
       return true;
   }