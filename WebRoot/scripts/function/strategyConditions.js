
function JoinLayerStrategy() {
	this.id = null;
	this.div = null;
	this.label3 = null;
	this.button3 = null;
}

JoinLayerStrategy.prototype.init = function () {
	this.div = document.createElement("div");
    this.div.id ="threaddiv";
	this.button3 = document.createElement("input");
	this.label3 = document.createElement("label");
};

JoinLayerStrategy.prototype.create = function () {
	this.div.style.position = "absolute";
	this.div.style.width = 100;
	this.div.style.height = 140;
	this.div.style.backgroundColor = "#F6F6F6";
	this.div.style.padding = "10px";
	this.div.style.border = "1px solid #CCCCCC";
    this.div.style.zindex = "10";
	this.button3.type = "button";
	this.button3.value = "关闭";
	this.button3.className = "btn";
	var obj = this;
	this.button3.onclick = function () {
		cancel(obj);
	};
	this.div.appendChild(this.button3);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label3);
};
function getAbsoluteTop(obj){
    var top = obj.offsetTop;
    while(obj != null && obj.offsetParent != null && obj.offsetParent.tagName != 'BODY'){
    top += obj.offsetParent.offsetTop;
    obj = obj.offsetParent;
    }
    return top;
}
function getAbsoluteLeft(obj){
    var left = obj.offsetLeft ;
    while(obj != null && obj.offsetParent != null && obj.offsetParent.tagName != 'BODY'){
    left += obj.offsetParent.offsetLeft;
    obj = obj.offsetParent;
    }
    return left;
}
function getAbsoluteLeftAndInputLeft(obj){
    var left = obj.offsetLeft+obj.offsetWidth;
    while(obj != null && obj.offsetParent != null && obj.offsetParent.tagName != 'BODY'){
    left += obj.offsetParent.offsetLeft;
    obj = obj.offsetParent;
    }
    return left;
}
function getAbsoluteWidth(obj){
    return obj.offsetWidth;
}
function getAbsoluteHeight(obj){
    return obj.offsetHeight;
}
function returnMess(id,val){
    var objDoc=document.getElementById(id);
    dealCutOff(objDoc,val);
}
JoinLayerStrategy.prototype.show = function(id,type){
    var objDoc=document.getElementById(id);
    this.div.style.left = getAbsoluteLeft(objDoc);
    this.div.style.top = getAbsoluteTop(objDoc)+getAbsoluteHeight(objDoc);
    var infor="";
    if(type=="100"){
        infor='<a onclick="javascript:returnMess(\''+id+'\',\'1\');">优惠期</a></br>' +
              '<a onclick="javascript:returnMess(\''+id+'\',\'2\');">报班数量</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'9\');">收费期期数</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'3\');">老学员优惠</a></br>'+
              /*'<a onclick="javascript:returnMess(\''+id+'\',\'4\');">优惠券</a></br>'+*/
              '<a onclick="javascript:returnMess(\''+id+'\',\'6\');">积分兑换</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'7\');">班级类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'8\');">学员类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'12\');">学员扩展类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'13\');">线索扩展类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'11\');">课次数</a>';
    }else{
        if(type=="700"){
        infor='<a onclick="javascript:returnMess(\''+id+'\',\'1\');">优惠期</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'7\');">班级类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'8\');">幼儿类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'12\');">幼儿扩展类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'13\');">线索扩展类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'10\');">天数</a>';
        }
        if(type=="500"||type=="300"){
        infor='<a onclick="javascript:returnMess(\''+id+'\',\'1\');">优惠期</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'7\');">班级类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'8\');">学生类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'12\');">学生扩展类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'13\');">线索扩展类型</a></br>'+
              '<a onclick="javascript:returnMess(\''+id+'\',\'10\');">天数</a>';
        }
    }
    this.label3.innerHTML = infor;
	document.body.appendChild(this.div);
};
JoinLayerStrategy.prototype.showRight = function (infor,id) {
    var objDoc = document.getElementById(id);
    this.div.style.left = getAbsoluteLeftAndInputLeft(objDoc);
    this.div.style.top = getAbsoluteTop(objDoc);
    this.div.style.width = getAbsoluteWidth(objDoc)+70;
    this.label3.innerHTML = infor;
	document.body.appendChild(this.div);
};
JoinLayerStrategy.prototype.hides = function () {
    this.label3.innerHTML = "";
	this.div.removeNode(true);
};
function cancel(obj) {
	obj.label3.innerHTML = "";
	obj.div.removeNode(true);
}
