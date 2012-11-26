
//创建类
var Class = {
    create:function () {
	    return function () {
	        this.initialize.apply(this, arguments);
	    };
    }
};

//转换数组
var $A = function (a) {
    return a ? Array.apply(null, a) : new Array;
};

//获取对象
var $ = function (id) {
    return document.getElementById(id);
};

//追加方法
Object.extend = function (a, b) {
    for (var i in b) {
        a[i] = b[i];
    }
    return a;
};

//添加函数
Object.extend(Object, {
    addEvent:function (a, b, c, d) {
	    if (a.attachEvent) {
	        a.attachEvent(b[0], c);
	    } else {
	        a.addEventListener(b[1] || b[0].replace(/^on/, ""), c, d || false);
	    }
	    return c;
	}, 
	delEvent:function (a, b, c, d) { 
	    if (a.detachEvent) {
	        a.detachEvent(b[0], c);
	    } else {
	        a.removeEventListener(b[1] || b[0].replace(/^on/, ""), c, d || false);
	    }
	    return c;
	}, 
	//获取Event
	reEvent:function () {
	    return window.event ? window.event : (function (o) {
	        do {
	            o = o.caller;
	        } while (o && !/^\[object[ A-Za-z]*Event\]$/.test(o.arguments[0]));
	        return o.arguments[0];
	    })(this.reEvent);
	}
});

//绑定事件
Function.prototype.bind = function () {
    var wc = this, a = $A(arguments), o = a.shift();
    return function () {
        wc.apply(o, a.concat($A(arguments)));
    };
};

var Table = Class.create();

//初始化
Table.prototype = {
    initialize:function () {
	    var wc = this;
	    //创建列
	    wc.cols = new Array;
	}, 
	//添加列
	addCols:function (o) {
	    var wc = this, cols = wc.cols, i = cols.length;
	    //创建行
	    return cols[i] = {id:i, div:o, rows:new Array, addRow:wc.addRow, chRow:wc.chRow, inRow:wc.inRow, delRow:wc.delRow};
	}, 
	//添加行
	addRow:function (o) {
	    var wc = this, rows = wc.rows, i = rows.length;
	    return rows[i] = {id:i, div:o, cols:wc};
	}, 
	//插入行
	inRow:function (a, b) {
	    var wc = b.cols = this, rows = wc.rows, i;
	    if (a < rows.length) {
	        for (i = a; i < rows.length; i++) {
	            rows[i].id++;
	        }
	        rows.splice(a, 0, b);
	        b.id = a;
	        return b;
	    } else {
	        b.id = rows.length;
	        return rows[b.id] = b;
	    }
	}, 
	//删除列
	delRow:function (a) {
	    var wc = this, rows = wc.rows, i, r;
	    if (a >= rows.length) {
	        return;
	    }
	    r = rows[a];
	    rows.splice(a, 1);
	    for (i = a; i < rows.length; i++) {
	        rows[i].id = i;
	    }
	    return r;
	}
};

var CDrag = Class.create();

CDrag.IE = /MSIE/.test(window.navigator.userAgent);

CDrag.prototype = {
    initialize:function () {
	    //初始化成员
	    var wc = this;
	    //建立表格对象
	    wc.table = new Table;
	    wc.iFunc = wc.eFunc = null;
	    wc.obj = {on:{a:null, b:""}, row:null, left:0, top:0};
	    wc.temp = {row:null, div:document.createElement("div")};
	    wc.temp.div.setAttribute(CDrag.IE ? "className" : "class", "drag_temp_div");
	}, 
	reMouse:function (a) {
	    //获取鼠标位置
	    var e = Object.reEvent();
	    return {x:document.documentElement.scrollLeft + e.clientX, y:document.documentElement.scrollTop + e.clientY};
	}, 
	//获取元素绝对位置
	rePosition:function (o) {
	    var $x = $y = 0;
	    do {
	        $x += o.offsetLeft;
	        $y += o.offsetTop;
	    } while ((o = o.offsetParent) && o.tagName != "BODY");
	    return {x:$x, y:$y};
	}, 
	//当拖动开始时设置参数
	sMove:function (o) {
	    var wc = this;
	    if (wc.iFunc || wc.eFinc) {
	        return;
	    }
	    var mouse = wc.reMouse(), obj = wc.obj, temp = wc.temp, div = o.div, position = wc.rePosition(div);
	    obj.row = o;
	    obj.on.b = "me";
	    obj.left = mouse.x - position.x;
	    obj.top = mouse.y - position.y;
	    temp.row = document.body.appendChild(div.cloneNode(true));
	    //设置复制对象
	    with (temp.row.style) {
	        position = "absolute";
	        left = mouse.x - obj.left + "px";
	        top = mouse.y - obj.top + "px";
	        zIndex = 100;
	        opacity = "0.3";
	        filter = "alpha(opacity:30)";
	        width = div.clientWidth + "px";
	    }
	    //设置站位对象
	    with (temp.div.style) {
	        height = div.clientHeight + "px";
	        width = div.clientWidth + "px";
	    }
	    div.parentNode.replaceChild(temp.div, div);
	    wc.iFunc = Object.addEvent(document, ["onmousemove"], wc.iMove.bind(wc));
	    wc.eFunc = Object.addEvent(document, ["onmouseup"], wc.eMove.bind(wc));
	    document.onselectstart = new Function("return false");
	}, 
	//当鼠标移动时设置参数
	iMove:function () {
	    var wc = this, cols = wc.table.cols, mouse = wc.reMouse(), obj = wc.obj, temp = wc.temp, row = obj.row, div = temp.row, t_position, t_cols, t_rows, i, j;
	    with (div.style) {
	        left = mouse.x - obj.left + "px";
	        top = mouse.y - obj.top + "px";
	    }
	    for (i = 0; i < cols.length; i++) {
	        t_cols = cols[i];
	        t_position = wc.rePosition(t_cols.div);
	        if (t_position.x < mouse.x && t_position.x + t_cols.div.offsetWidth > mouse.x) {
	            //如果此列行数大于0
	            if (t_cols.rows.length > 0) {
	                //如果鼠标位置大于第一行的位置即是最上
	                //向上
	                if (wc.rePosition(t_cols.rows[0].div).y /*+ 20*/ > mouse.y) {
	                    obj.on.a = t_cols.rows[0];
	                    obj.on.b = "up";
	                    obj.on.a.div.parentNode.insertBefore(temp.div, obj.on.a.div);
	                    //t_cols.rows[0].div.parentNode.insertBefore(temp.div, t_cols.rows[0].div);
	                } else {
	                    //如果第一行是拖拽对象而第鼠标大于第二行位置则，没有动
	                    //向上
	                    if (t_cols.rows.length > 1 && t_cols.rows[0] == row && wc.rePosition(t_cols.rows[1].div).y + 20 > mouse.y) {
	                        obj.on.b = "me";
	                        t_cols.rows[1].div.parentNode.insertBefore(temp.div, t_cols.rows[1].div);
	                    } else {
	                        //从最下行向上查询
	                        for (j = t_cols.rows.length - 1; j > -1; j--) {
	                            t_rows = t_cols.rows[j];
	                            if (t_rows == obj.row) {
	                                continue;
	                            }
	                            //如果鼠标大于这行则在这行下面
	                            if (wc.rePosition(t_rows.div).y < mouse.y) {
	                                //如果这行有下一行则重这行下一行的上面插入
	                                if (t_rows.id + 1 < t_cols.rows.length && t_cols.rows[t_rows.id + 1] != obj.row) {
	                                    t_cols.rows[t_rows.id + 1].div.parentNode.insertBefore(temp.div, t_cols.rows[t_rows.id + 1].div);
	                                    obj.on.a = t_rows;
	                                    obj.on.b = "down";
	                                } else {
	                                    //如果这行下一行是拖拽对象则插入到下两行，即拖拽对象返回原位
	                                    if (t_rows.id + 2 < t_cols.rows.length) {
	                                        t_cols.rows[t_rows.id + 2].div.parentNode.insertBefore(temp.div, t_cols.rows[t_rows.id + 2].div);
	                                        obj.on.b = "me";
	                                    } else {
	                                        //前面都没有满足则放在最低行
	                                        t_rows.div.parentNode.appendChild(temp.div);
	                                        obj.on.a = t_rows;
	                                        obj.on.b = "down";
	                                    }
	                                }
	                                return;
	                            }
	                        }
	                    }
	                }
	            } else {
	                //此列无内容添加新行
	                t_cols.div.appendChild(temp.div);
	                obj.on.a = t_cols;
	                obj.on.b = "new";
	            }
	        }
	    }
	}, 
	//当鼠标释放时设置参数
	eMove:function () {
	    var wc = this, obj = wc.obj, temp = wc.temp, row = obj.row, div = row.div, o_cols, n_cols;
	    //向最上添加
	    if (obj.on.b == "up") {
	        o_cols = obj.row.cols;
	        n_cols = obj.on.a.cols;
	        n_cols.inRow(0, o_cols.delRow(obj.row.id));
	    } else {
	        //相对向下添加
	        if (obj.on.b == "down") {
	            o_cols = obj.row.cols;
	            n_cols = obj.on.a.cols;
	            n_cols.inRow(obj.on.a.id + 1, o_cols.delRow(obj.row.id));
	        } else {
	            //向无内容列添加
	            if (obj.on.b == "new") {
	                o_cols = obj.row.cols;
	                n_cols = obj.on.a;
	                n_cols.inRow(0, o_cols.delRow(obj.row.id));
	            }
	        }
	    }
	    temp.div.parentNode.replaceChild(div, temp.div);
	    temp.row.parentNode.removeChild(temp.row);
	    delete temp.row;
	    Object.delEvent(document, ["onmousemove"], wc.iFunc);
	    Object.delEvent(document, ["onmouseup"], wc.eFunc);
	    document.onselectstart = wc.iFunc = wc.eFunc = null;
	}, 
	//添加对象
	add:function (o) {
	    var wc = this;
	    Object.addEvent(o.div.childNodes[CDrag.IE ? 0 : 1], ["onmousedown"], wc.sMove.bind(wc, o));
	}, 
	//初始化成员
	parse:function (o) {
	    var wc = this, table = wc.table, cols, i, j;
	    for (i = 0; i < o.length; i++) {
	        cols = table.addCols(o[i].cols);
	        for (j = 0; j < o[i].rows.length; j++) {
	            wc.add(cols.addRow(o[i].rows[j]));
	        }
	    }
	}
};

Object.addEvent(window, ["onload"], function () {
    var wc = new CDrag;
    wc.parse([{cols:$("c_1"), rows:[$("ig_1_1"), $("ig_1_2"),$("ig_2_1")]}]);
});

