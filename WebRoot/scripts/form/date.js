/**-------------------------------------------------------------------**/
// 日历控件
// JavaScript Document
// 设置日历是否可以拖动
var bMoveable = true;
var _VersionInfo = "Version:1.0"
// 存放日历层的HTML代码
var strFrame;
document.writeln('<iframe id=meizzDateLayer frameborder=0 style="position: absolute; width: 10px; height: 10px; z-index: 9998; display: none;"></iframe>');
strFrame  = '<style>';
strFrame += 'INPUT.button {';
strFrame += '    BORDER-RIGHT: #3864a5 1px solid;';
strFrame += '    BORDER-TOP: #3864a5 1px solid;';
strFrame += '    BORDER-LEFT: #3864a5 1px solid;';
strFrame += '    BORDER-BOTTOM: #3864a5 1px solid;';
strFrame += '    BACKGROUND-COLOR: #fff8ec;';
strFrame += '    font-family:宋体;';
strFrame += '}';
strFrame += 'TD {';
strFrame += '    FONT-SIZE: 9pt;';
strFrame += '    font-family:宋体;';
strFrame += '}';
strFrame += '</style>';
strFrame += '<script>';
strFrame += 'var datelayerx, datelayery; /*存放日历控件的鼠标位置*/';
strFrame += 'var bDrag; /*标记是否开始拖动*/';
strFrame += 'function document.onmousemove() { /*在鼠标移动事件中，如果开始拖动日历，则移动日历*/';
strFrame += '    if(bDrag && window.event.button == 1) {';
strFrame += '        var DateLayer = parent.document.all.meizzDateLayer.style;';
strFrame += '        DateLayer.posLeft += window.event.clientX - datelayerx; /*由于每次移动以后鼠标位置都恢复为初始的位置，因此写法与div中不同*/';
strFrame += '        DateLayer.posTop += window.event.clientY - datelayery;';
strFrame += '    }';
strFrame += '}';
strFrame += 'function DragStart() { /*开始日历拖动*/';
strFrame += '    var DateLayer = parent.document.all.meizzDateLayer.style;';
strFrame += '    datelayerx = window.event.clientX;';
strFrame += '    datelayery = window.event.clientY;';
strFrame += '    bDrag=true;';
strFrame += '}';
strFrame += 'function DragEnd() { /*结束日历拖动*/';
strFrame += '    bDrag = false;';
strFrame += '}';
strFrame += '</script>';
strFrame += '<div style="z-index:9999;position: absolute; left:0; top:0;" onselectstart="return false">';
strFrame += '  <span id=tmpSelectYearLayer Author=wayx style="z-index: 9999;position: absolute;top: 3px; left: 19px;display: none"></span>';
strFrame += '  <span id=tmpSelectMonthLayer Author=wayx style="z-index: 9999;position: absolute;top: 3px; left: 78px;display: none"></span>';
strFrame += '  <table border=1 cellspacing=0 cellpadding=0 width=142 height=160 bordercolor=#3864a5 bgcolor=#3864a5 Author="wayx">';
strFrame += '    <tr Author="wayx">';
strFrame += '      <td width=142 height=23 Author="wayx" bgcolor=#FFFFFF>';
strFrame += '        <table border=0 cellspacing=1 cellpadding=0 width=140 Author="wayx" height=23>';
strFrame += '          <tr align=center Author="wayx">';
strFrame += '            <td width=16 align=center bgcolor=#3864a5 style="font-size:12px;cursor: hand;color: #ffffff" onclick="parent.meizzPrevM()" title="向前翻 1 月" Author=meizz>';
strFrame += '              <b Author=meizz><</b>';
strFrame += '            </td>';
strFrame += '            <td width=60 align=center style="font-size:12px;cursor:default" Author=meizz ';
strFrame += '              onmouseover="style.backgroundColor=\'#FFD700\'" onmouseout="style.backgroundColor=\'white\'" ';
strFrame += '              onclick="parent.tmpSelectYearInnerHTML(this.innerText.substring(0,4))" title="点击这里选择年份">';
strFrame += '              <span Author=meizz id=meizzYearHead></span>';
strFrame += '            </td>';
strFrame += '            <td width=48 align=center style="font-size:12px;cursor:default" Author=meizz onmouseover="style.backgroundColor=\'#FFD700\'" ';
strFrame += '              onmouseout="style.backgroundColor=\'white\'" onclick="parent.tmpSelectMonthInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame += '              title="点击这里选择月份">';
strFrame += '              <span id=meizzMonthHead Author=meizz></span>';
strFrame += '            </td>';
strFrame += '            <td width=16 bgcolor=#3864a5 align=center style="font-size:12px;cursor: hand;color: #ffffff" onclick="parent.meizzNextM()" title="向后翻 1 月" Author=meizz>'
strFrame += '              <b Author=meizz>></b>';
strFrame += '            </td>';
strFrame += '          </tr>';
strFrame += '        </table>';
strFrame += '      </td>';
strFrame += '    </tr>';
strFrame += '    <tr Author="wayx">';
strFrame += '      <td width=142 height=18 Author="wayx">';
strFrame += '        <table border=1 cellspacing=0 cellpadding=0 bgcolor=#3864a5 ' + (bMoveable? 'onmousedown="DragStart()" onmouseup="DragEnd()"':'');
strFrame += '          BORDERCOLORLIGHT=#3864a5 BORDERCOLORDARK=#FFFFFF width=140 height=20 Author="wayx" style="cursor:' + (bMoveable ? 'move':'default') + '">';
strFrame += '          <tr Author="wayx" align=center valign=bottom>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>日</td>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>一</td>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>二</td>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>三</td>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>四</td>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>五</td>';
strFrame += '            <td style="font-size:12px;color:#FFFFFF" Author=meizz>六</td>';
strFrame += '          </tr>';
strFrame += '        </table>';
strFrame += '      </td>';
strFrame += '    </tr>';
strFrame += '    <tr Author="wayx">';
strFrame += '      <td width=142 height=120 Author="wayx">';
strFrame += '        <table border=1 cellspacing=2 cellpadding=0 BORDERCOLORLIGHT=#3864a5 BORDERCOLORDARK=#FFFFFF bgcolor=#fff8ec width=140 height=120 Author="wayx">';
                     var n=0;
                     for (j = 0; j < 5; j++) {
strFrame += '          <tr align=center Author="wayx">';
                         for (i = 0; i < 7; i++) {
strFrame += '            <td width=20 height=20 id=meizzDay' + n + ' style="font-size:12px;color:#900;" Author=meizz onclick=parent.meizzDayClick(this.innerText,0)></td>';
                             n++;
                         }
strFrame += '          </tr>';
                     }
strFrame += '          <tr align=center Author="wayx">';
                       for (i = 35; i < 39; i++) {
strFrame += '            <td width=20 height=20 id=meizzDay' + i + ' style="font-size:12px;color:#900;" Author=wayx onclick="parent.meizzDayClick(this.innerText,0)"></td>';
                       }
strFrame += '            <td colspan=3 align=right >';
strFrame += '              <span onclick=parent.closeLayer() style="font-size:12px;cursor: hand"><u>关闭</u></span>';
strFrame += '            </td>';
strFrame += '          </tr>';
strFrame += '        </table>';
strFrame += '      </td>';
strFrame += '    </tr>';
strFrame += '    <tr Author="wayx">';
strFrame += '      <td Author="wayx">';
strFrame += '        <table border=0 cellspacing=1 cellpadding=0 width=100% Author="wayx" bgcolor=#FFFFFF>';
strFrame += '          <tr Author="wayx">';
strFrame += '            <td Author=meizz align=left>';
strFrame += '              <input Author=meizz type=button class=button value="<<" title="向前翻 1 年" onclick="parent.meizzPrevY()" ';
strFrame += '                onfocus="this.blur()" style="font-size: 12px; height: 20px">';
strFrame += '              <input Author=meizz class=button title="向前翻 1 月" type=button ';
strFrame += '                value="< " onclick="parent.meizzPrevM()" onfocus="this.blur()" style="font-size: 12px; height: 20px">';
strFrame += '            </td>';
strFrame += '            <td Author=meizz align=center>';
strFrame += '              <input Author=meizz type=button class=button value=今天 onclick="parent.meizzToday()" ';
strFrame += '                onfocus="this.blur()" title="当前日期" style="font-size: 12px; height: 20px; cursor:hand">';
strFrame += '            </td>';
strFrame += '            <td Author=meizz align=right>';
strFrame += '              <input Author=meizz type=button class=button value=" >" onclick="parent.meizzNextM()" ';
strFrame += '                onfocus="this.blur()" title="向后翻 1 月" class=button style="font-size: 12px; height: 20px">';
strFrame += '              <input Author=meizz type=button class=button value=">>" title="向后翻 1 年" onclick="parent.meizzNextY()"';
strFrame += '                onfocus="this.blur()" style="font-size: 12px; height: 20px">';
strFrame += '            </td>';
strFrame += '          </tr>';
strFrame += '        </table>';
strFrame += '      </td>';
strFrame += '    </tr>';
strFrame += '  </table>';
strFrame += '</div>';

window.frames.meizzDateLayer.document.writeln(strFrame);
// 解决ie进度条不结束的问题
window.frames.meizzDateLayer.document.close();

// WEB 页面显示部分
var outObject;
var outButton; // 点击的按钮
var outDate = ""; // 存放对象的日期
var odatelayer = window.frames.meizzDateLayer.document.all;  // 存放日历对象
// 主调函数
function setday(tt, obj) {
	if (arguments.length >  2) {
		alert("对不起!传入本控件的参数太多!");
		return;
	}
	if (arguments.length == 0) {
		alert("对不起!您没有传回本控件任何参数!");
		return;
	}
	var dads  = document.all.meizzDateLayer.style;
	var th = tt;
	var ttop  = tt.offsetTop;     // TT控件的定位点高
	var thei  = tt.clientHeight;  // TT控件本身的高
	var tleft = tt.offsetLeft;    // TT控件的定位点宽
	var ttyp  = tt.type;          // TT控件的类型
	while (tt = tt.offsetParent) {ttop+=tt.offsetTop; tleft+=tt.offsetLeft;}
	dads.top  = (ttyp=="image")? ttop+thei : ttop+thei+6;
	dads.left = tleft;
	dads.width = 148;
	// modify by sloppy
	dads.height = 211;
	outObject = (arguments.length == 1) ? th : obj;
	// 设定外部点击的按钮
	outButton = (arguments.length == 1) ? null : th;
	// 根据当前输入框的日期显示日历的年月
	var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
	var r = outObject.value.match(reg);
	if(r != null){
		r[2] = r[2]-1;
		var d = new Date(r[1], r[2],r[3]);
		if(d.getFullYear() == r[1] && d.getMonth() == r[2] && d.getDate() == r[3]) {
			outDate=d;  //保存外部传入的日期
		} else outDate = "";
		meizzSetDay(r[1],r[2]+1);
	}
	else {
		outDate = "";
		meizzSetDay(new Date().getFullYear(), new Date().getMonth() + 1);
	}
	dads.display = '';

	//event.returnValue = false;
}

var MonHead = new Array(12);  //定义阳历中每个月的最大天数
    MonHead[0] = 31; MonHead[1] = 28; MonHead[2] = 31; MonHead[3] = 30; MonHead[4]  = 31; MonHead[5]  = 30;
    MonHead[6] = 31; MonHead[7] = 31; MonHead[8] = 30; MonHead[9] = 31; MonHead[10] = 30; MonHead[11] = 31;

var meizzTheYear = new Date().getFullYear();  //定义年的变量的初始值
var meizzTheMonth = new Date().getMonth()+1;  //定义月的变量的初始值
var meizzWDay = new Array(39);                //定义写日期的数组
//任意点击时关闭该控件,ie6的情况可以由下面的切换焦点处理代替
document.onclick = function() {
	with(window.event)
	{
		if (srcElement.getAttribute("Author") == null
			&& srcElement != outObject
			&& srcElement != outButton)
		{
			closeLayer();
		}
	}
}
//按Esc键关闭，切换焦点关闭
document.onkeyup = function() {
	if (window.event.keyCode == 27) {
		if(outObject) {
			outObject.blur();
		}
		closeLayer();
	} else if (document.activeElement) {
		if(document.activeElement.getAttribute("Author") == null
			&& document.activeElement != outObject
			&& document.activeElement != outButton)
		{
			closeLayer();
		}
	}
}
// 往 head 中写入当前的年与月
function meizzWriteHead(yy, mm)
{
	odatelayer.meizzYearHead.innerText  = yy + " 年";
	odatelayer.meizzMonthHead.innerText = mm + " 月";
}
// 年份的下拉框
function tmpSelectYearInnerHTML(strYear) {
	if (strYear.match(/\D/) != null) {
		alert("年份输入参数不是数字!");
		return;
	}
	//var m = (strYear) ? strYear : new Date().getFullYear();
	var m = new Date().getFullYear();
	if (m < 1000 || m > 9999) {
		alert("年份值不在 1000 到 9999 之间!");
		return;
	}
	var n = m - 100;
	if (n < 1000) n = 1000;
	if (n + 120 > 9999) n = 9974;
	var s  = "<select Author=meizz name=tmpSelectYear style='font-size: 12px' "
	   	s += "onblur='document.all.tmpSelectYearLayer.style.display=\"none\"' "
	   	s += "onchange='document.all.tmpSelectYearLayer.style.display=\"none\";"
	   	s += "parent.meizzTheYear = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
	var selectInnerHTML = s;
	for (var i = n; i < n + 120; i++) {
		if (i == m) {
			selectInnerHTML += "<option Author=wayx value='"
							+  i
							+  "' selected>"
							+  i
							+  "年"
							+  "</option>\r\n";
		}
		else {
			selectInnerHTML += "<option Author=wayx value='"
							+  i
							+  "'>"
							+  i
							+  "年"
							+  "</option>\r\n";
		}
	}
	selectInnerHTML += "</select>";
	odatelayer.tmpSelectYearLayer.style.display = "";
	odatelayer.tmpSelectYearLayer.innerHTML = selectInnerHTML;
	odatelayer.tmpSelectYear.focus();
}

function tmpSelectMonthInnerHTML(strMonth) //月份的下拉框
{
	if (strMonth.match(/\D/) != null) {
		alert("月份输入参数不是数字!");
		return;
	}
	var m = (strMonth) ? strMonth : new Date().getMonth() + 1;
	var s  = "<select Author=meizz name=tmpSelectMonth style='font-size: 12px' "
	   	s += "onblur='document.all.tmpSelectMonthLayer.style.display=\"none\"' "
	   	s += "onchange='document.all.tmpSelectMonthLayer.style.display=\"none\";"
	   	s += "parent.meizzTheMonth = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
	var selectInnerHTML = s;
	for (var i = 1; i < 13; i++) {
		if (i == m) {
			selectInnerHTML += "<option Author=wayx value='"
							+  i
							+  "' selected>"
							+  i + "月"
							+  "</option>\r\n";
		} else {
			selectInnerHTML += "<option Author=wayx value='"
							+  i
							+  "'>"
							+  i
							+  "月"
							+  "</option>\r\n";
		}
	}
	selectInnerHTML += "</select>";
	odatelayer.tmpSelectMonthLayer.style.display = "";
	odatelayer.tmpSelectMonthLayer.innerHTML = selectInnerHTML;
	odatelayer.tmpSelectMonth.focus();
}
//这个层的关闭
function closeLayer() {
	document.all.meizzDateLayer.style.display = "none";
}
//判断是否闰平年
function IsPinYear(year) {
	if (0 == year % 4 && ( (year % 100 != 0) || (year % 400 == 0) ) )
		return true;
	else
		return false;
}
//闰年二月为29天
function GetMonthCount(year, month) {
	var c = MonHead[month-1];
	if( (month == 2) && IsPinYear(year) ) c++;
	return c;
}
//求某天的星期几
function GetDOW(day, month, year) {
	var dt = new Date(year, month - 1, day).getDay() / 7;
	return dt;
}
// 往前翻 Year
function meizzPrevY() {
	if(meizzTheYear > 999 && meizzTheYear <10000) {
		meizzTheYear--;
	} else {
		alert("年份超出范围（1000-9999）!");
	}
	meizzSetDay(meizzTheYear, meizzTheMonth);
}
// 往后翻 Year
function meizzNextY() {
	if(meizzTheYear > 999 && meizzTheYear <10000) {
		meizzTheYear++;
	} else {
		alert("年份超出范围（1000-9999）!");
	}
	meizzSetDay(meizzTheYear, meizzTheMonth);
}
// Today Button
function meizzToday() {
	var today;
	meizzTheYear = new Date().getFullYear();
	meizzTheMonth = new Date().getMonth()+1;
	today = new Date().getDate();
	if(outObject) {
		outObject.value = meizzTheYear + "-" + meizzTheMonth + "-" + today;
	}
	closeLayer();
}
// 往前翻月份
function meizzPrevM() {
	if(meizzTheMonth > 1) {
		meizzTheMonth--;
	} else {
		meizzTheYear--;
		meizzTheMonth = 12;
	}
	meizzSetDay(meizzTheYear, meizzTheMonth);
}
// 往后翻月份
function meizzNextM() {
	if(meizzTheMonth == 12) {
		meizzTheYear++;
		meizzTheMonth = 1;
	} else {
		meizzTheMonth++;
	}
	meizzSetDay(meizzTheYear, meizzTheMonth);
}
// 主要的写程序
function meizzSetDay(yy, mm) {
	meizzWriteHead(yy, mm);
	// 设置当前年月的公共变量为传入值
	meizzTheYear = yy;
	meizzTheMonth = mm;
	// 将显示框的内容全部清空
	for (var i = 0; i < 39; i++) {
		meizzWDay[i] = "";
	}
	var day1 = 1, day2 = 1, firstday = new Date(yy, mm - 1, 1).getDay();  //某月第一天的星期几
	// 上个月的最后几天
	for (i = 0; i < firstday; i++) {
		meizzWDay[i] = GetMonthCount(mm == 1 ? yy - 1 : yy, mm == 1 ? 12 : mm-1) - firstday + i + 1
	}
	for (i = firstday; day1 < GetMonthCount(yy, mm) + 1; i++) {
		meizzWDay[i] = day1;
		day1++;
	}
	for (i = firstday + GetMonthCount(yy, mm); i < 39; i++) {
		meizzWDay[i] = day2;
		day2++
	}
	for (i = 0; i < 39; i++) {
		// 书写新的一个月的日期星期排列
		var da = eval("odatelayer.meizzDay" + i)
		if (meizzWDay[i] != "") {
			// 初始化边框
			da.borderColorLight = "#3864a5";
			da.borderColorDark = "#FFFFFF";
			// 上个月的部分
			if(i < firstday) {
				da.innerHTML = "<b><font color=gray>" + meizzWDay[i] + "</font></b>";
				da.title = (mm == 1 ? 12 : mm - 1) + "月" + meizzWDay[i] + "日";
				da.onclick = Function("meizzDayClick(this.innerText, -1)");
				if(!outDate) da.style.backgroundColor = ( (mm == 1 ? yy - 1 : yy) == new Date().getFullYear()
						&& (mm == 1 ? 12 : mm - 1) == new Date().getMonth() + 1
						&& meizzWDay[i] == new Date().getDate()) ? "#FFD700" : "#e0e0e0";
				else {
					da.style.backgroundColor = ( (mm == 1 ? yy-1 : yy) == outDate.getFullYear()
						&& (mm == 1 ? 12 : mm - 1)== outDate.getMonth() + 1
						&& meizzWDay[i] == outDate.getDate() ) ? "#00ffff" : ( ( (mm == 1 ? yy - 1 : yy) == new Date().getFullYear()
						&& (mm == 1 ? 12 : mm - 1) == new Date().getMonth()+1
						&& meizzWDay[i] == new Date().getDate()) ? "#FFD700" : "#e0e0e0");
					// 将选中的日期显示为凹下去
					if( (mm == 1 ? yy - 1 : yy) == outDate.getFullYear()
							&& (mm == 1 ? 12 : mm - 1) == outDate.getMonth() + 1
							&& meizzWDay[i] == outDate.getDate() ) {
						da.borderColorLight = "#FFFFFF";
						da.borderColorDark = "#3864a5";
					}
				}
			} else if (i >= firstday+GetMonthCount(yy, mm) ) { // 下个月的部分
				da.innerHTML = "<b><font color=gray>" + meizzWDay[i] + "</font></b>";
				da.title = (mm == 12 ? 1 : mm + 1) + "月" + meizzWDay[i] + "日";
				da.onclick = Function("meizzDayClick(this.innerText,1)");
				if(!outDate) {
					da.style.backgroundColor = ( (mm == 12 ? yy + 1 : yy) == new Date().getFullYear()
						&& (mm == 12 ? 1 : mm + 1) == new Date().getMonth() + 1
						&& meizzWDay[i] == new Date().getDate()) ? "#FFD700" : "#e0e0e0";
				} else {
					da.style.backgroundColor = ( ( mm == 12 ? yy + 1 : yy) == outDate.getFullYear()
						&& (mm==12?1:mm+1)== outDate.getMonth() + 1
						&& meizzWDay[i] == outDate.getDate() )? "#00ffff" : ( ( ( mm == 12 ? yy + 1 : yy) == new Date().getFullYear()
						&& (mm == 12 ? 1 : mm + 1) == new Date().getMonth() + 1
						&& meizzWDay[i] == new Date().getDate()) ? "#FFD700" : "#e0e0e0");
					// 将选中的日期显示为凹下去
					if( ( mm == 12 ? yy + 1 : yy) == outDate.getFullYear()
							&& (mm == 12 ? 1 : mm + 1) == outDate.getMonth() + 1
							&& meizzWDay[i] == outDate.getDate() ) {
						da.borderColorLight = "#FFFFFF";
						da.borderColorDark = "#3864a5";
					}
				}
			}
			// 本月的部分
			else {
				Sdate = parseInt(new Date().getDate() );
				if (meizzWDay[i] < Sdate) {
				//	da.innerHTML = "<b style='text-decoration:line-through;'>" + meizzWDay[i] + "</b>";
					da.innerHTML = "<b>" + meizzWDay[i] + "</b>";
				} else {
					da.innerHTML = "<b>" + meizzWDay[i] + "</b>";
				}
				da.title = mm + "月" + meizzWDay[i] + "日";
				// 给td赋予onclick事件的处理
				da.onclick = Function("meizzDayClick(this.innerText,0)");
				// 如果是当前选择的日期，则显示亮蓝色的背景；如果是当前日期，则显示暗黄色背景
				if(!outDate) {
					da.style.backgroundColor = (yy == new Date().getFullYear()
						&& mm == new Date().getMonth()+1
						&& meizzWDay[i] == new Date().getDate() ) ? "#FFD700" : "#e0e0e0";
				} else {
					da.style.backgroundColor = (yy == outDate.getFullYear()
						&& mm == outDate.getMonth() + 1
						&& meizzWDay[i] == outDate.getDate() ) ? "#00ffff" : ( ( yy == new Date().getFullYear()
						&& mm == new Date().getMonth() + 1
						&& meizzWDay[i] == new Date().getDate() ) ? "#FFD700" : "#e0e0e0");
					// 将选中的日期显示为凹下去
					if(yy == outDate.getFullYear()
						&& mm == outDate.getMonth() + 1
						&& meizzWDay[i] == outDate.getDate() )
					{
						da.borderColorLight = "#FFFFFF";
						da.borderColorDark = "#3864a5";
					}
				}
			}
			da.style.cursor = "hand"
		} else {
			da.innerHTML = "";
			da.style.backgroundColor = "";
			da.style.cursor = "default"
		}
	}
}
// 点击显示框选取日期，主输入函数*************
function meizzDayClick(n, ex) {
	var yy = meizzTheYear;
	// ex表示偏移量，用于选择上个月份和下个月份的日期
	var mm = parseInt(meizzTheMonth) + ex;
	// 判断月份，并进行对应的处理
	if(mm < 1) {
		yy--;
		mm = 12 + mm;
	} else if (mm > 12) {
		yy++;
		mm = mm - 12;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}
	if (outObject) {
		if (!n) {
			return;
		}
		if ( n < 10) {
			n = "0" + n;
		}
		// 注：在这里你可以输出改成你想要的格式
		outObject.value= yy + "-" + mm + "-" + n ;
		closeLayer();
	} else {
		closeLayer();
		alert("您所要输出的控件对象并不存在!");
	}
}
/** 以上为日历控件内容 --------------------------------------------------**/


