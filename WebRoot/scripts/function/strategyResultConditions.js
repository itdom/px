
function JoinLayerStrategyResult() {
	this.id = null;
	this.div = null;
	this.label3 = null;
	this.button3 = null;
}

JoinLayerStrategyResult.prototype.init = function () {
	this.div = document.createElement("div");
    this.div.id ="strategyResultdiv";
	this.button3 = document.createElement("input");
	this.label3 = document.createElement("label");
};

JoinLayerStrategyResult.prototype.create = function () {
	this.div.style.position = "absolute";
	this.div.style.width = 220;
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
function returnMessResult(id,val){
    var objDoc=document.getElementById(id);
    dealCutOffResult(objDoc,val);
}
JoinLayerStrategyResult.prototype.show = function(id){
    var objDoc=document.getElementById(id);
    this.div.style.left = getAbsoluteLeft(objDoc);
    this.div.style.top = getAbsoluteTop(objDoc)+getAbsoluteHeight(objDoc);
    var infor="";
    infor='<a onclick="javascript:returnMessResult(\''+id+'\',\'ChargeItemPrice\');">收费项目标准价格(ChargeItemPrice)</a></br>' +
          '<a onclick="javascript:returnMessResult(\''+id+'\',\'AttendedDays\');">出勤天数(AttendedDays)</a></br>'+
          '<a onclick="javascript:returnMessResult(\''+id+'\',\'AttendedTimes\');">出勤次数(AttendedTimes)</a></br>'+
          '<a onclick="javascript:returnMessResult(\''+id+'\',\'ChargeTermDays\');">收费期天数(ChargeTermDays)</a></br>'+
          '<a onclick="javascript:returnMessResult(\''+id+'\',\'ChargeTermTimes\');">收费期次数(ChargeTermTimes)</a></br>';
    this.label3.innerHTML = infor;
	document.body.appendChild(this.div);
};
JoinLayerStrategyResult.prototype.showRight = function (infor,id) {
    var objDoc = document.getElementById(id);
    this.div.style.left = getAbsoluteLeftAndInputLeft(objDoc);
    this.div.style.top = getAbsoluteTop(objDoc);
    this.div.style.width = getAbsoluteWidth(objDoc)+70;
    this.label3.innerHTML = infor;
	document.body.appendChild(this.div);
};
JoinLayerStrategyResult.prototype.hides = function () {
    this.label3.innerHTML = "";
	this.div.removeNode(true);
};
function cancel(obj) {
	obj.label3.innerHTML = "";
	obj.div.removeNode(true);
}
