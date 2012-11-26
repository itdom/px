var isIe = (document.all) ? true : false;
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
function show(id, evX,evY) {/*--打开--*/
    closeWindow();
    var bWidth = parseInt(document.documentElement.scrollWidth);
    var bHeight = parseInt(document.documentElement.scrollHeight) < 592 ? 592 : parseInt(document.documentElement.scrollHeight);
    if(isIe){
       setSelectState('hidden');
    }
    var o = document.getElementById(id);
    if (evX > 300) {
        o.style.left = 200 + "px";
    } else {
        o.style.left = evX + 10 + "px";
    }
    o.style.top = evY + 40 + "px";
    o.style.display = "block";
    o.style.width = "500px";
    o.style.height = "300px";
}
function shows(id, ev,con) {
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
}
function closeed(id) {/*--关闭--*/
    closeWindow();
    var o = document.getElementById(id);
    if (o.style.display == "block")
    {
        o.style.display = "none";
        /*  proyc = setInterval(function() {
         closey(o)
         }, 10);*/
    }
}
var thetype = "";
var isSingle = "";
var isAll = "";
function selectClazzOrClazzInstance(type, single , isAllTeachArea,dates,eveX,eveY) {
    thetype = type;
    isSingle = single;
    isAll = isAllTeachArea;
    if(thetype == "clazzInstance") {
        document.getElementById("studentTrainingdiv").style.display = 'none';
        document.getElementById("search").style.display = 'none';
    }
    var params = {queryDate:dates};
    $.getJSON('/scheduleSelectClazzInstance.action', params, function(res) {
        if(res==null||res =="") {
            alert("no data!");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="deep">')
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
            document.getElementById('clazzInstancediv').innerHTML=data.join('');
            document.getElementById("clazzInstancediv").style.display='block';
            show('fdate',eveX,eveY);
            return false;
        }
    });
}
function showClazz(ids, names) {
    document.getElementById("clazzName").value = names;
    document.getElementById("clazzId").value = ids;
    closeed('fdate');
}

function showClazzInstance(ids, names) {
    document.getElementById("studentTrainingdiv").innerHTML = "";
    var params = null;
    if(isAll=='true'){
        params = {clazzId : ids ,date:new Date(),isAll :isAll};
    }  else{
        params = {clazzId : ids ,date:new Date()};
    }

    $.getJSON('/listClazzInstanceByClazzToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="deep">')
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
        }
    });
}
function receiveClazzInstance(ids, names) {
    document.getElementById("clazzInstanceName").value = names;
    document.getElementById("clazzInstanceId").value = ids;
    closeed('fdate');
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
            data.push('<td class="deep">')
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
    closeed('fdate');
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
                if (j % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
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
        }
    });
}

function receiveClazzInstanceForMore() {
    document.getElementById("clazzInstanceName").value = strText;
    document.getElementById("clazzInstanceIds").value = strId;
    closeed('fdate');
}
function submitform() {
    document.forms[0].submit();
}