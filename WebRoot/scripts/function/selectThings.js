var isIe = (document.all) ? true : false;
function showWin(id, ev,id0,teacherArea,modType,id1,batch) {/*--打开--*/
    closeWindow();
    var bWidth = parseInt(document.documentElement.scrollWidth);
    var bHeight = parseInt(document.documentElement.scrollHeight) < 592 ? 592 : parseInt(document.documentElement.scrollHeight);
//    if(isIe){
//       setSelectState('hidden');
//    }
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
    document.getElementById("clazzInstancediv").style.display="none";
    document.getElementById("studentTrainingdiv").style.display="none";
    if(modType=='pBatch'){
        showBatch(id,id1,teacherArea,null,id0,batch)
    }else{
        selectThings(id0,"things","true","true",teacherArea,modType,id1,batch);
    }
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
var thetype = "";
var isSingle = "";
var isAll = "";
var ids= "";
function selectThings(id0,type, single , isAllTeachArea,teacherAreaId,modType,id1,batch) {
    thetype = type;
    isSingle = single;
    isAll = isAllTeachArea;
    /*选择物品*/
    if(batch == "buy"){
        document.getElementById("catagorydiv").style.width = 50 + '%';
        if (thetype == "things") {
            document.getElementById("clazzInstancediv").style.left = 249 + 'px';
            document.getElementById("clazzInstancediv").style.width=50+"%";
            document.getElementById("studentTrainingdiv").style.display = 'none';
        }
    }else if(batch == "buyFood"){
        document.getElementById("catagorydiv").style.width = 30 + '%';
        if (thetype == "things") {
            document.getElementById("clazzInstancediv").style.left = 144 + 'px';
            document.getElementById("clazzInstancediv").style.width=35+"%";
            document.getElementById("studentTrainingdiv").style.left = 311 + 'px';
            document.getElementById("studentTrainingdiv").style.width = 35+"%";
        }
        document.getElementById('clazzInstancediv').innerHTML="";
        var params = {date:new Date()};
        $.getJSON('/editDishfood.action',params,function(res){
            if(res==null || res==""){
            }else{
                var rawfoodCategoryList=res.rawfoodCategoryList;
                var data=new Array();
                data.push('<table width="100%" border=0 cellpadding="0" cellspacing="0" class="maintable"><tbody><tr><td class="head">一级分类</td></tr>');
                for(var i=0;i<rawfoodCategoryList.length;i++){
                    data.push('<tr><td width="50%"');
                    if (i % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                    data.push('>');
                    data.push('<a href="#" onclick="showSubCategory(\''+id0);
                data.push( "\',\'"+id1+"\',\'"+teacherAreaId+"\',"+rawfoodCategoryList[i].id+",\'"+   batch +'\')">');
                    data.push(rawfoodCategoryList[i].dictionaryValue+'</a></td></tr>');
                }
                data.push('</tbody></table>');
                document.getElementById("catagorydiv").innerHTML=data.join("");
            }
        });
        return;
    }else if(batch.indexOf("turnFood")!=-1){
        document.getElementById("catagorydiv").style.width = 25 + '%';
        if (thetype == "things") {
            document.getElementById("clazzInstancediv").style.left = 119 + 'px';
            document.getElementById("clazzInstancediv").style.width=25+"%";
            document.getElementById("studentTrainingdiv").style.left = 238 + 'px';
            document.getElementById("studentTrainingdiv").style.width = 25+"%";
            document.getElementById("teachAreadiv").style.left = 357 + 'px';
            document.getElementById("teachAreadiv").style.width=25+"%";
        }
        document.getElementById('clazzInstancediv').innerHTML="";
        var params = {date:new Date()};
        $.getJSON('/editDishfood.action',params,function(res){
            if(res==null || res==""){
            }else{
                var rawfoodCategoryList=res.rawfoodCategoryList;
                var data=new Array();
                data.push('<table width="100%" border=0 cellpadding="0" cellspacing="0" class="maintable"><tbody><tr><td class="head">一级分类</td></tr>');
                for(var i=0;i<rawfoodCategoryList.length;i++){
                    data.push('<tr><td width="50%"');
                    if (i % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                    data.push('>');
                    data.push('<a href="#" onclick="showSubCategory(\''+id0);
                    data.push( "\',\'"+id1+"\',\'"+teacherAreaId+"\',"+rawfoodCategoryList[i].id+",\'"+   batch +'\')">');
                    data.push(rawfoodCategoryList[i].dictionaryValue+'</a></td></tr>');
                }
                data.push('</tbody></table>');
                document.getElementById("catagorydiv").innerHTML=data.join("");
            }
        });
        return;    
    }else{
        document.getElementById("catagorydiv").style.width = 30 + '%';
        if (thetype == "things") {
            //document.getElementById("clazzInstancediv").style.left = 250 + 'px';
            document.getElementById("clazzInstancediv").style.width=35+"%";
            document.getElementById("studentTrainingdiv").style.width = 35+"%";
        }
    }
    document.getElementById('clazzInstancediv').innerHTML="";
    var params = {date:new Date(),teacherArea:teacherAreaId,modType:modType};
    $.getJSON('/getCatogryToJson.action', params, function(res) {
        if (res==null||res == ""){
        } else {
            var categoryList = res.catagoryList;
            //动态创建表格
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">')
            data.push('类别');
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
                data.push('<a href ="#" onclick="showThings(');
                data.push(categoryList[j].id +","+   teacherAreaId  +",\'"+ id0+'\''+",\'"+id1+'\''+",\'"+batch+'\')">');
                data.push(categoryList[j].name + '</a></td>');
                data.push('</tr>');
            }
            data.push('</tbody><table>');
            document.getElementById('catagorydiv').innerHTML = data.join('');
        }
    });
}

function showSubCategory(id0,id1,teachAreaId,categoryId,batch){
    document.getElementById("clazzInstancediv").style.display="block";
    var params={date:new Date,categoryId:categoryId};
    $.getJSON('/nutrition/getSubDictDataToJsonByCategory.action',params,function(res){
        if(res==null || res==""){
        }else{
            var subCategoryList=res.subCategoryList;
            var data = new Array();
            data.push('<table width="100% border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody><tr><td class="head">二级分类</td></tr>');
            for(var i=0;i<subCategoryList.length;i++){
                data.push('<tr><td width="50%"');
                if (i % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                data.push('<a href="#" onclick="showFood(\''+id0);
                data.push( "\',\'"+id1+"\',\'"+teachAreaId+"\',\'"+categoryId+"\',"+subCategoryList[i].id+",\'"+   batch +'\')">');
                data.push(subCategoryList[i].dictionaryValue+'</a></td></tr>');
            }
            data.push('</tbody></table>');
            document.getElementById("clazzInstancediv").innerHTML=data.join("");
        }
    });
}

function showFood(id0,id1,teachAreaId,categoryId,subcategory,batch){
    document.getElementById("studentTrainingdiv").style.display="block";
    var params={date:new Date,categoryId:categoryId,subcategory:subcategory};
    $.getJSON('/nutrition/getRawfoodToJsonByCategory.action',params,function(res){
        if(res==null || res==""){
        }else{
            var rawfoodBasicList=res.rawfoodBasicList;
            var data = new Array();
            data.push('<table width="100% border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody><tr><td class="head">名称</td></tr>');
            for(var i=0;i<rawfoodBasicList.length;i++){
                data.push('<tr><td width="50%"');
                if (i % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                var food=rawfoodBasicList[i].id+"-"+rawfoodBasicList[i].name;
                if(batch.indexOf("turnFood")!=-1){
                    data.push('<a href ="#" onclick="selectThingBatch(\''+id0);
                    data.push( "\',\'"+id1+"\',\'"+teachAreaId+"\',\'"+batch+"\',"+"\'"+food  +'\')">');
                }else{
                    data.push('<a href ="#" onclick="selectThing(\''+id0);
                    data.push( "\',\'"+id1+"\',"+"\'"+food  +'\')">');
                }    
                data.push(rawfoodBasicList[i].name+ '</a></td>');
            }
            data.push('</tbody></table>');
            document.getElementById("studentTrainingdiv").innerHTML=data.join("");     
        }
    });
}

function showThings(categoryId,teacherAreaId,id0,id1,batch){
   document.getElementById("clazzInstancediv").style.display="block";
   var params = {date:new Date(),categoryId:categoryId,teachAreaId:teacherAreaId};
   $.getJSON('/showLeftAmountToJson.action', params, function(res) {
            if (res==null||res == ""){
            } else {
                var thingsList = res.thingsList;
                //动态创建表格
                var data = new Array();
                data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
                data.push('<tr>');
                data.push('<td class="head">')
                data.push('名称(数量)/标准价');
                data.push('</td>')
                data.push('</tr>');
                for (var j = 0; j < thingsList.length; j++) {
                    data.push('<tr>');
                    data.push('<td width="50%"')
                    if (j % 2 == 0) {
                        data.push(' class="deep"');
                    } else {
                        data.push(' class="tint"');
                    }
                    data.push('>');
                    if(batch=="buy"){
                        var thing = thingsList[j].id+"-"+thingsList[j].name+'(' +thingsList[j].leftAmount+')'+"\/￥"+thingsList[j].price;
                        data.push('<a href ="#" onclick="selectThing(\''+id0);
                        data.push( "\',\'"+id1+"\',"+"\'"+thing  +'\')">');
                        data.push(thingsList[j].name+'(' +thingsList[j].leftAmount+')'+"\/￥"+thingsList[j].price+ '</a></td>');
                    }else{
                        var thing = thingsList[j].id+"-"+thingsList[j].name+'(' +thingsList[j].leftAmount+')'+"\/￥"+thingsList[j].price;
                        data.push('<a href ="#" onclick="showBatch(\''+id0);
                        data.push( "\',\'"+id1+"\',\'"+teacherAreaId+"\',\'"+thing  +"\',"+"\'"+thingsList[j].id  +"\',"+"\'"+batch +'\')">');
                        data.push(thingsList[j].name+'(' +thingsList[j].leftAmount+')'+"\/￥"+thingsList[j].price+ '</a></td>');
                    }
                    data.push('</td>');
                    data.push('</tr>');
                }
                data.push('</tbody><table>');
                document.getElementById('clazzInstancediv').innerHTML = data.join('');
            }
        });    
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
}
function closeed(id) {/*--关闭--*/
    closeWindow();
    var o = document.getElementById(id);
    if (o.style.display == "block")
    {
        o.style.display = "none";
    }
}
function selectThing(id,id1,thingvalue){
    document.getElementById(id).value=thingvalue.substring(thingvalue.indexOf("-")+1);
    document.getElementById(id+'s').value=thingvalue.substring(0,thingvalue.indexOf("-"));
   closeed('fd'); 
}

function selectThingBatch(id,id1,teachAreaId,batch,thingvalue){
    document.getElementById(id).value=thingvalue.substring(thingvalue.indexOf("-")+1);
    document.getElementById(id+'s').value=thingvalue.substring(0,thingvalue.indexOf("-"));
    var params={date:new Date(),teachAreaId:teachAreaId,thingsId:document.getElementById(id+'s').value,dispatcher:'food'};
    $.getJSON('/showthingsRecordBuyBatch.action',params,function(res){
        if(res ==""){
            alert("no data");
        } else {
            var thingRecordDetailsFinList = res.thingRecordDetailsFinList;
            var buyDate;
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr><td class="head">批次：日期/(数量)/进价</td></tr>');  
            for(var i=0;i<thingRecordDetailsFinList.length;i++){
                data.push('<tr>');
                data.push('<td width="50%"')
                if (i % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                var batchValue = thingRecordDetailsFinList[i].batch+"#"+thingRecordDetailsFinList[i].id;
                var position=batch.substring(batch.indexOf("turnFood")+8);
                data.push('<a href ="#" onclick="setBatch(\'batchId');
                data.push( +position+"\',\'"+batchValue +'\')">');
                data.push(thingRecordDetailsFinList[i].batch+ '</a></td>');
                data.push('</td>');
                data.push('</tr>');
            /*for(var i=0;i<thingRecordBuyList.length;i++){
                data.push('<tr>');
                data.push('<td width="50%"')
                if (i % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                buyDate = thingRecordBuyList[i].recordDate;
                var batchValue = buyDate.substring(0,buyDate.indexOf("T"))+"/("+thingRecordDetailsFinList[i].leftAmount+")/￥"+thingRecordDetailsFinList[i].unitPrice+"#"+thingRecordDetailsFinList[i].id;
                data.push('<a href ="#" onclick="setBatch(\'batchId0');
                data.push( "\',\'"+batchValue +'\')">');
                data.push(buyDate.substring(0,buyDate.indexOf("T"))+"/("+thingRecordDetailsFinList[i].leftAmount+")/￥"+thingRecordDetailsFinList[i].unitPrice+ '</a></td>');
                data.push('</td>');
                data.push('</tr>');*/
          }
          data.push('</tbody><table>');
          document.getElementById('teachAreadiv').innerHTML = data.join('');
       }
    });    
}

function showBatch(id,id1,teacherAreaId,thingvalue,thingsId,batch){
    if(thingvalue!=null){
        document.getElementById("studentTrainingdiv").style.display = 'block';
        document.getElementById(id).value=thingvalue.substring(thingvalue.indexOf("-")+1);
        document.getElementById(id+'s').value=thingvalue.substring(0,thingvalue.indexOf("-"));
    }else{
        document.getElementById("studentTrainingdiv").style.display = 'block';
        document.getElementById("studentTrainingdiv").style.left = '0px';
        document.getElementById("studentTrainingdiv").style.width = '280px';
    }
    var params = {date:new Date(),otherTeachAreaIds:teacherAreaId,thingsId:thingsId};
    $.getJSON('/showthingsRecordBuyBatch.action',params,function(res){
        if(res ==""){
            alert("no data");
        } else {
            var thingRecordDetailsFinList = res.thingRecordDetailsFinList;
            var buyDate;
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr><td class="head">批次：日期/(数量)/进价</td></tr>');
            for(var i=0;i<thingRecordDetailsFinList.length;i++){
                data.push('<tr>');
                data.push('<td width="50%"')
                if (i % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                var batchValue = thingRecordDetailsFinList[i].batch+"#"+thingRecordDetailsFinList[i].id;
                data.push('<a href ="#" onclick="setBatch(\''+batch);
                data.push( "\',\'"+batchValue +'\')">');
                data.push(thingRecordDetailsFinList[i].batch+ '</a></td>');
                data.push('</td>');
                data.push('</tr>');
          }
          data.push('</tbody><table>');
          document.getElementById('studentTrainingdiv').innerHTML = data.join('');
       }
    });
}

function setBatch(batch,batchValue){
    document.getElementById(batch).value=batchValue.substring(0,batchValue.indexOf("#"));
    document.getElementById(batch+'s').value=batchValue.substring(batchValue.indexOf("#")+1);
    closeed('fd');
}

function searchThings(name,teachAreaId,id0,id1) {
    if(name==null || name==""){
        alert("名称不能为空");
        document.getElementById("searchName").focus();
        return false;
    }
    var params = {date:new Date(),name:encodeURIComponent(name),teachAreaId:teachAreaId};
    $.getJSON('/listThingsByNameToJson.action', params, function(res) {
        if (res == "") {
            alert("no data");
        } else {
            //动态创建表格
            var thingsList = res.thingsList;
            var data = new Array();
            data.push('<table  width="100%" border="0" cellpadding="0" cellspacing="0" class="maintable"><tbody>');
            data.push('<tr>');
            data.push('<td class="head">')
            data.push('名称(数量)/标准价');
            data.push('</td>')
            data.push('</tr>');
            for (var j = 0; j < thingsList.length; j++) {
                data.push('<tr>');
                data.push('<td width="50%"')
                if (j % 2 == 0) {
                    data.push(' class="deep"');
                } else {
                    data.push(' class="tint"');
                }
                data.push('>');
                var thing = thingsList[j].id+"-"+thingsList[j].name+'(' +thingsList[j].leftAmount+')'+"\/"+thingsList[j].price;
                data.push('<a href ="#" onclick="selectThing(\''+id0);
                data.push( "\',\'"+id1+"\',"+"\'"+thing  +'\')">');
                data.push(thingsList[j].name+'(' +thingsList[j].leftAmount+')'+"\/￥"+thingsList[j].price+ '</a></td>');
                data.push('</td>');
                data.push('</tr>');
            }
            data.push('</tbody><table>');
            document.getElementById('clazzInstancediv').innerHTML = data.join('');
        }
    });
}