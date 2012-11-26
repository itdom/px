
function JoinLayer() {
	this.id = null;
	this.div = null;
	this.textfield1 = null;
	this.textfield2 = null;
    this.textfield3 = null;
	this.label1 = null;
	this.label2 = null;
    this.label4 = null;
	this.label3 = null;
	this.text1 = null;
	this.text2 = null;
    this.text3 = null;
	this.button1 = null;
	this.button2 = null;
	this.button3 = null;
}

JoinLayer.prototype.init = function () {
	this.div = document.createElement("div");
	this.textfield1 = document.createElement("input");
	this.textfield2 = document.createElement("input");
    this.textfield3 = document.createElement("input");
	this.button1 = document.createElement("input");
	this.button2 = document.createElement("input");
	this.button3 = document.createElement("input");
	this.select = document.createElement("select");
	this.label1 = document.createElement("label");
	this.label2 = document.createElement("label");
	this.label3 = document.createElement("label");
    this.label4 = document.createElement("label");
	this.text1 = document.createTextNode("姓名 ");
	this.text2 = document.createTextNode("电话 ");
    this.text3 = document.createTextNode("学号 ");
};

JoinLayer.prototype.create = function () {
	this.div.style.position = "absolute";
	this.div.style.width = "auto";
	this.div.style.height = "auto";
	this.div.style.backgroundColor = "#F6F6F6";
	this.div.style.padding = "10px";
	this.div.style.border = "1px solid #CCCCCC";

	this.textfield1.type = "text";
	this.textfield2.type = "text";
    this.textfield3.type = "text";
	this.button1.type = "button";
	this.button1.value = "查找";
	this.button1.className = "btn";
	this.button2.type = "button";
	this.button2.value = "新建";
	this.button2.className = "btn";
	this.button2.disabled = true;
	this.button3.type = "button";
	this.button3.value = "取消";
	this.button3.className = "btn";
	var obj = this;
	this.button3.onclick = function () {
		cancel(obj);
	};
	this.button1.onclick = function () {
		check(obj);
	};

	//this.label1.style.color = "#FFFFFF";
	//this.label2.style.color = "#FFFFFF";

	this.label1.appendChild(this.text1);
	this.label2.appendChild(this.text2);
    this.label4.appendChild(this.text3);
	this.div.appendChild(this.label1);
	this.div.appendChild(this.textfield1);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label2);
	this.div.appendChild(this.textfield2);
    this.div.appendChild(document.createElement("br"));
    this.div.appendChild(this.label4);
    this.div.appendChild(this.textfield3);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.button1);
	this.div.appendChild(this.button2);
	this.div.appendChild(this.button3);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label3);
};

JoinLayer.prototype.show = function (name, phone) {
	this.div.style.top = event.clientY + "px";
	this.div.style.left = event.clientX + "px";
	this.textfield1.value = name.value;
	this.textfield2.value = phone.value;
	document.body.appendChild(this.div);
};

function check(obj) {
	var xmlHttp = getXmlHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	var xmlDoc = xmlHttp.responseXML.documentElement;
            if(xmlDoc!=null&&xmlDoc.selectNodes(".//student").length>0){
            var items = xmlDoc.selectNodes(".//student");
            var infor="";
            if(items!=null&&items.length>0){
            for (var i=0 ; i<items.length ; i++){
                var item = items[i];
                var id = item.getElementsByTagName("id")[0].firstChild.nodeValue;
                var names = item.getElementsByTagName("name")[0].firstChild.nodeValue;
                if(items.length==1){
                    if(id=="0"){
                          document.getElementById("personThread.student.id").value="";
                          obj.button2.disabled = false;
                            obj.button2.onclick = function () {
                                window.location.href = "../../../edu/student/basicinfo/checkClazzForAddStudent.action";
                            };
                         obj.label3.innerHTML = names;
                         break;
                    }
                }
                var telephoneNode = item.getElementsByTagName("telephone");
                var telephone="";
                if(telephoneNode[0].firstChild!=null)telephone=telephoneNode[0].firstChild.nodeValue;
                var serialNode = item.getElementsByTagName("serial");
                var serial="";
                if(serialNode[0].firstChild!=null)serial=serialNode[0].firstChild.nodeValue;
                infor=infor+"<a onclick=javascript:document.getElementById('personThread.student.id').value="+id+";alert('已关联!');>"+names+"&nbsp;"+serial+"&nbsp;"+telephone+"</a><br/>";
            }
            }
            if(infor!=""){
                infor="请选择一个学员:<br/>"+infor;
                obj.label3.innerHTML = infor;
                obj.button2.disabled = true;
            }
        }
        }
    };
    var reqUrl = "joinstudent.action";
    var reqParam = "name=" + trimAllHA(obj.textfield1.value) ;
    if(trimAllHA(obj.textfield2.value)!="")reqParam=reqParam+"&phone=" + trimAllHA(obj.textfield2.value);
    if(trimAllHA(obj.textfield3.value)!="")reqParam=reqParam+"&serial=" + trimAllHA(obj.textfield3.value);
    xmlHttp.open('POST',reqUrl,true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(reqParam);
}
function trimAllHA(avalue){
	return avalue.replace(/(\s+)|(\u3000+)|(^\ue4c6+)/g,"");
}

function cancel(obj) {
	obj.label3.innerHTML = "";
	obj.button2.disabled = true;
	obj.div.removeNode(true);
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
