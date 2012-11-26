/**
 *
 */
if (null == window.random) {
	if (null == window.fe005e9f_e51b_4307_88ff_b4b150368fd4) {
		window.fe005e9f_e51b_4307_88ff_b4b150368fd4 = 0;
	}
	window.random = function () {
		var s = "RID";
		var d = new Date();
		s += d.getYear();
		s += d.getMonth();
		s += d.getDate();
		s += d.getHours();
		s += d.getMinutes();
		s += d.getSeconds();
		s += d.getMilliseconds();
		s += parseInt(Math.random() * 1000000000000);
		s += (window.fe005e9f_e51b_4307_88ff_b4b150368fd4++);
		return s;
	};
}
if (null == window.$$) {
	window.$$ = function () {
		var elements = new Array();
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if (typeof element == "string") {
				element = document.getElementById(element);
			}
			if (arguments.length == 1) {
				return element;
			}
			elements.push(element);
		}
		return elements;
	};
}
if (null == window.popMenuConfig) {
	window.popMenuConfig = function (title, url, target, img, id) {
		this.Items = new Array();//父类包含的子类
		this.title = title;
		this.url = url;
		this.img = img;
		this.target = target;
		this.id = id == null ? random() : id;
	};
	window.popMenu = new popMenuConfig();//create a new instance
	popMenuConfig.CssPrefix = "";
	popMenuConfig.CssText = null;
	window.popMenuConfig.prototype.insert = function (id, title, url, img, target) {
		if (null == title || title.length < 1) {
			return null;
		}
		var item = new popMenuConfig(title, url, img, target, id);
		this.Items.push(item);
		return item;
	};
	popMenuConfig.createPopMenu = function (control, bremove) {
		var ele = $$(control);
		if (bremove) {
			ele.innerHTML = "";
		}
		var items = popMenuConfig.getSubItems();
		var isfirst = true;
		for (var n = 0; n < items.length; n++) {
			    var item = items[n];
				var url = "javascript:{popMenuConfig.goto('" + (null == item.url || "" == item.url ? "" : item.url) + "','" + (null == item.target ? "" : item.target) + "');}";
			    var ah = document.createElement("a");
				ah.href=url;
				if(null != item.url && "" != item.url){
				    ah.onclick=function(){popMenuConfig.onSelectMenu(this);}
				}
				ah.onmouseover=function(){popMenuConfig.prototype.a = this}
				ah.innerHTML = item.title;
				if (isfirst) {
					popMenuConfig.prototype.old_ah = ah;
					ah.className = "selected";
					ah.style.color="#ffffff";
					isfirst = false;
				}
				if (null == item.url || "" == item.url) {
					ah.style.cursor = "default";
					ah.style.textDecoration = "none";
				}
				ele.appendChild(ah);
		}
	};
	popMenuConfig.getSubItems = function (pid) {
		if (null == pid) {
			return window.popMenu.Items;
		}else{
		  return null;
		}
	}
	popMenuConfig.goto = function (url, target) {
		if (null == url || url.length < 1) {
			return;
		}
		if (null == target || target.length < 1) {
			target = popMenuConfig.DefaultTarget;
		}
		if (null != target && target.length > 0 && target.toLowerCase() != "_self" && target.toLowerCase() != "self") {
			if (target.toLowerCase() == "_blank") {
				window.open(url);
			} else {
				if (window.parent == null || null == window.parent.frames[target]) {
					alert("\u8de8\u5e27\u83dc\u5355\u914d\u7f6e\u83dc\u5355\u9519\u8bef\uff0c\u627e\u4e0d\u5230\u5e27 " + target);
					return;
				} else {
					window.parent.frames[target].location = url;
				}
			}
		} else {
			window.location = url;
		}
	};
	//init styleSheet from this page
	popMenuConfig.initlize = function () {
		document.focus();
		popMenuConfig.CssText = "";
	};
	
	popMenuConfig.prototype.old_ah = null;
	popMenuConfig.prototype.a = null;
	popMenuConfig.onSelectMenu = function (a) {
		if (popMenuConfig.prototype.old_ah != null) {
			popMenuConfig.prototype.old_ah.className = "";
			popMenuConfig.prototype.old_ah.style.color="#333333";
		}
		a.className = "selected";
		a.style.color="#ffffff";
		popMenuConfig.prototype.old_ah = a;
	}
}
