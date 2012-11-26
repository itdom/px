/*
 * 
 * 在鼠标出弹出帮助窗口
 *floatdivid:控制的div的id
 *
 *event:鼠标事件不用改动
 *
 *notevalue:  <s:text name="">
 * */
function show(floatdivid, event, notevalue) {
	var floatdiv = document.getElementById(floatdivid);
	floatdiv.style.left = event.clientX;
	floatdiv.style.top = event.clientY;
	var notepart = document.getElementById("noteid");
	notepart.innerHTML=notevalue;
	floatdiv.style.display = "block";
}
/**
 * 关掉窗口
 * */
function hidden(floatdivid) {
	var floatdiv = document.getElementById(floatdivid);
	floatdiv.style.display = "none";
}