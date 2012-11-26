var isIe = (document.all) ? true : false;
function show(id, ev) {/*--打开--*/
    closeWindow();
    var bWidth = parseInt(document.documentElement.scrollWidth);
    var bHeight = parseInt(document.documentElement.scrollHeight) < 592 ? 592 : parseInt(document.documentElement.scrollHeight);
    if(isIe){
       setSelectState('hidden');
    }
    var o = document.getElementById(id);
    if (ev.clientX > 300) {
        o.style.left = 300 + "px";
    } else {
        o.style.left = ev.clientX + 10 + "px";
    }
    o.style.top = ev.clientY + 40 + "px";
    o.style.display = "block";
    o.style.width = "400px";
    o.style.height = "300px";
}
function showCourses(id, ev,con) {
   closeWindow();
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
    if(con=='false'){
        document.getElementById("termCoursediv").style.width="100%";
        selectTermCourses(id,ev);
    }
}
var thetype = "";
var isSingle = "";
var isAll = "";
var ids="";
var names="";
function selectTermCourse(id,name,clazzid){
    ids=id;
    names=name;
    var params = {date:new Date(),clazzid:clazzid};
    $.getJSON('/getTermCourseList.action', params, function(res) {
           if(res==null||res ==""){
              alert("no data!");
           }else{
              var termCourseList = res.termCourseList;
              var data = new Array();
              data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
              data.push('<tr>');
              data.push('<td class="head">');
              data.push('课程名称');
              data.push('</td>');
              data.push('<td class="head">');
              data.push('学时');
              data.push('</td>');
              data.push('</tr>');
              for(var j=0;j<termCourseList.length;j++){
                  data.push('<tr>');
                  data.push('<td width="50%"')
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                  data.push('>');
                  data.push('<a href ="#" onclick="receiveTermCourse(\''+termCourseList[j].id+'\',\''+termCourseList[j].courseAllName+'\')">');
                  data.push(termCourseList[j].courseAllName + '</a>');
                  data.push('</td>');
                  data.push('<td width="50%"')
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                  data.push('>');
                  data.push(termCourseList[j].learningHours);
                  data.push('</td>');
                  data.push('</tr>');
              }
              data.push('</tbody>');
              data.push('</table>');
              document.getElementById('termCoursediv').innerHTML = data.join('');

           }
   });
}
function selectTermCourses(id,ev){   
    var params={date:new Date()};
    $.getJSON("/getTermCourseListForJSON.action",params,function(res){
        if(res==null||res ==""){
          alert("no data!");
       }else{
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            var termCourseList = res.termCourseList;
            data.push('<tr>');
            data.push('<td width="80%" >')
            data.push('<select id="leftSelect" size="15" multiple="multiple" style="width:200px;" ondblclick="moveLeftToRight1();">')
            for (j = 0; j < termCourseList.length; j++) {
                data.push('<option value="' + termCourseList[j].id + '">' + termCourseList[j].name + '</option>');
            }
            data.push('</select>');
            data.push('</td>');
            data.push('<td>');
            data.push('<input type="button" value="←" class="btn" onclick="moveRightToLeft1();"/>');
            data.push('<br/> <br/>');
            data.push('<input type="button" value="→" class="btn" onclick="moveLeftToRight1();"/>');
            data.push('</td>');
            data.push('<td>');

            data.push('<select id="rightSelect" size="15" multiple="multiple" style="width:200px;" ondblclick="moveRightToLeft1();"> ');
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
            document.getElementById('termCoursediv').innerHTML = data.join('');
            document.getElementById('termCoursediv').focus();
        }
    });
}

function receiveTermCourse(ides, namees) {
    document.getElementById(ids).value = ides;
    document.getElementById(names).value = namees;
    closeed('fdCourses');
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
function moveRightToLeft1() {

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
    setttingId1();
}

function moveLeftToRight1() {
    var leftSelect = document.getElementById("leftSelect");
    var rightSelect = document.getElementById("rightSelect");
    for (var i = 0; i < leftSelect.options.length; i++) {
        if (leftSelect.options[i].selected) {
            var option = document.createElement("option");
            option.value = leftSelect.options[i].value;
            option.text = leftSelect.options[i].text;
            addOptionToSelect(rightSelect, option);
        }
    }
    setttingId1();
}
function setttingId1() {
    var rightSelect = document.getElementById("rightSelect");
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
function showClazzInstanceForMore(ids, names) {
    document.getElementById("studentTrainingdiv").innerHTML = "";
    var params = {clazzId : ids ,date:new Date()};
    $.getJSON('/listClazzInstanceByClazzToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            var datalist = res.clazzInstanceList;
            data.push('<tr>');
            data.push('<td width="80%" >')
            data.push('<select id="leftSelect" size="22" multiple="multiple" style="width:130px;" ondblclick="moveLeftToRight1();">')
            for (j = 0; j < datalist.length; j++) {
                data.push('<option value="' + datalist[j].id + '">' + datalist[j].name + '</option>');
            }
            data.push('</select>');
            data.push('</td>');
            data.push('<td>');
            data.push('<input type="button" value="←" class="btn" onclick="moveRightToLeft1();"/>');
            data.push('<br/> <br/>');
            data.push('<input type="button" value="→" class="btn" onclick="moveLeftToRight1();"/>');
            data.push('</td>');
            data.push('<td>');

            data.push('<select id="rightSelect" size="22" multiple="multiple" style="width:130px;" ondblclick="moveRightToLeft1();"> ');
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
    document.getElementById("courseTexts").value = strText;
    document.getElementById("courseIds").value = strId;
    closeed('fdCourses');
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


