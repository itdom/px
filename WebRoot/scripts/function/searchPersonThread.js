
function JoinLayerThread() {
	this.id = null;
	this.div = null;
	this.label3 = null;
	this.button3 = null;
}

JoinLayerThread.prototype.init = function () {
	this.div = document.createElement("div");
    this.div.id ="threaddiv";
	this.button3 = document.createElement("input");
	this.label3 = document.createElement("label");
};

JoinLayerThread.prototype.create = function () {
	this.div.style.position = "absolute";
	this.div.style.width = "auto";
	this.div.style.height = "auto";
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
JoinLayerThread.prototype.show = function (infor,id) {
    var objDoc = document.getElementById(id);
    this.div.style.left = getAbsoluteLeft(objDoc)+getAbsoluteWidth(objDoc)+10;
    this.div.style.top = getAbsoluteTop(objDoc)+getAbsoluteHeight(objDoc);
    this.div.style.width = getAbsoluteWidth(objDoc)+210;
    this.label3.innerHTML = infor;
	document.body.appendChild(this.div);
};
JoinLayerThread.prototype.showRight = function (infor,id) {
    var objDoc = document.getElementById(id);
    this.div.style.left = getAbsoluteLeftAndInputLeft(objDoc);
    this.div.style.top = getAbsoluteTop(objDoc);
    this.div.style.width = getAbsoluteWidth(objDoc)+70;
    this.label3.innerHTML = infor;
	document.body.appendChild(this.div);
};
JoinLayerThread.prototype.hides = function () {
    this.label3.innerHTML = "";
	this.div.removeNode(true);
};
function cancel(obj) {
	obj.label3.innerHTML = "";
	obj.div.removeNode(true);
}
