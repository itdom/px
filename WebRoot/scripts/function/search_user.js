
function SearchLayer() {
	this.id = null;
	this.div = null;
	this.textfield = null;
	this.textfield1 = null;
	this.textfield2 = null;

	this.label = null;
	this.label1 = null;
	this.label2 = null;
	this.label3 = null;
	this.text1 = null;
	this.text2 = null;
	this.text3 = null;
	this.button = null;
	this.button1 = null;
}

SearchLayer.prototype.init = function () {
	this.div = document.createElement("div");
	this.textfield = document.createElement("input");
	this.textfield1 = document.createElement("input");
	this.textfield2 = document.createElement("input");
	this.button = document.createElement("input");
	this.button1 = document.createElement("input");
	this.select = document.createElement("select");
	this.label = document.createElement("label");
	this.label1 = document.createElement("label");
	this.label2 = document.createElement("label");
	this.text = document.createTextNode("学号 ");
	this.text1 = document.createTextNode("姓名 ");
	this.text2 = document.createTextNode("电话 ");

};

SearchLayer.prototype.create = function () {
	this.div.style.position = "absolute";
	this.div.style.width = "auto";
	this.div.style.height = "auto";
	this.div.style.backgroundColor = "#019BD3";
	this.div.style.padding = "10px";
	this.div.style.border = "1px solid #000000";

	this.textfield.type = "text";
	this.textfield1.type = "text";
	this.textfield2.type = "text";
	this.button.type = "button";
	this.button.value = "查找";
	this.button.className = "btn";
	this.button1.type = "button";
	this.button1.value = "取消";
	this.button1.className = "btn";
	var obj = this;
	this.button.onclick = function () {
		search(obj);
	};
	this.button1.onclick = function () {
		cancel(obj);
	};

	this.label.style.color = "#FFFFFF";
	this.label1.style.color = "#FFFFFF";
	this.label2.style.color = "#FFFFFF";

	this.label.appendChild(this.text);
	this.label1.appendChild(this.text1);
	this.label2.appendChild(this.text2);

	this.div.appendChild(this.label);
	this.div.appendChild(this.textfield);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label1);
	this.div.appendChild(this.textfield1);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.label2);
	this.div.appendChild(this.textfield2);
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(document.createElement("br"));
	this.div.appendChild(this.button);
	this.div.appendChild(this.button1);
	this.div.appendChild(document.createElement("br"));
};

SearchLayer.prototype.show = function (name, phone) {
	this.div.style.top = event.clientY + "px";
	this.div.style.left = event.clientX + "px";
	document.body.appendChild(this.div);
};

function search(obj) {
	document.location.href = "/px/edu/student/search.action?student.serial=" + obj.textfield.value
	+ "&student.name=" + obj.textfield1.value + "&student.phone=" + obj.textfield2.value;
}

function cancel(obj) {
	obj.div.removeNode(true);
}
