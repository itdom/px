
function JoinLayer() {
	this.id = null;
	this.div = null;
	this.textfield1 = null;
	this.textfield2 = null;
	this.label1 = null;
	this.label2 = null;
	this.label3 = null;
	this.text1 = null;
	this.text2 = null;
	this.button1 = null;
	this.button2 = null;
}

JoinLayer.prototype.init = function () {
	this.div = document.createElement("div");
	this.textfield1 = document.createElement("input");
	this.textfield2 = document.createElement("input");
	this.button1 = document.createElement("input");
	this.button2 = document.createElement("input");
	this.button3 = document.createElement("input");
	this.select = document.createElement("select");
	this.label1 = document.createElement("label");
	this.label2 = document.createElement("label");
	this.label3 = document.createElement("label");
	this.text1 = document.createTextNode("姓名 ");
	this.text2 = document.createTextNode("电话 ");
};

JoinLayer.prototype.create = function () {
	this.div.style.position = "absolute";
	this.div.style.width = "auto";
	this.div.style.height = "auto";
	this.div.style.backgroundColor = "#019BD3";
	this.div.style.padding = "10px";
	this.div.style.border = "1px solid #000000";

	this.textfield1.type = "text";
	this.textfield2.type = "text";
	this.button1.type = "button";
	this.button1.value = "关联";
	this.button1.className = "btn";
	this.button2.type = "button";
	this.button2.value = "确定";
	this.button2.className = "btn";
	this.button2.disabled = true;
	this.button3.type = "button";
	this.button3.value = "取消";
	this.button3.className = "btn";
	var obj = this;
	this.button1.onclick = function () {
		check(obj);
	};
	this.button3.onclick = function () {
		cancel(obj);
	};

	this.label1.style.color = "#FFFFFF";
	this.label2.style.color = "#FFFFFF";

	this.label1.appendChild(this.text1);
	this.label2.appendChild(this.text2);

	this.div.appendChild(this.label1);
	this.div.appendChild(this.textfield1);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label2);
	this.div.appendChild(this.textfield2);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.button1);
	this.div.appendChild(this.button2);
	this.div.appendChild(this.button3);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label3);
};

JoinLayer.prototype.show = function () {
	this.div.style.top = event.clientY + "px";
	this.div.style.left = event.clientX + "px";
	document.body.appendChild(this.div);
};

function check(obj) {
	var xmlHttp = getXmlHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
             var xmlDoc = xmlHttp.responseXML.documentElement;
             var name = xmlDoc.selectSingleNode("/company/name").text;
             obj.label3.innerHTML = name;
             obj.button2.disabled = false;
             obj.button2.onclick = function () {
				join(obj, xmlDoc);
			};
        }
    };
    var reqUrl = "joincompany.action";
    var reqParam = "name=" + obj.textfield1.value + "&phone=" + obj.textfield2.value;
    xmlHttp.open('POST', reqUrl, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(reqParam);
}

function cancel(obj) {
	obj.label3.innerHTML = "";
	obj.button2.disabled = true;
	obj.div.removeNode(true);
}

function join(obj, doc) {
	var id = doc.selectSingleNode("/company/id").text;
	if (id != null && id != "") {
		document.getElementById("company").value = id;
		alert(document.getElementById("company").value);
	}
	cancel(obj);
}

function getXmlHttpRequest() {
    var xmlHttp;
    if(window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if(window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0");
    } else if(window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else if(window.XMLHttpRequest) {
       xmlHttp = new XMLHttpRequest();
    }
    return xmlHttp;
}
