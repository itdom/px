
var olditem = null;
function onmenuitem(obj) {
	if (olditem == null) {
		olditem = document.getElementById("menuitemstart");
	}
	olditem.className = "menuitem_";
	obj.className = "menuitem";
	if (obj.index >= 2) {
		obj.style.borderBottom = "1px solid #FFFFFF";
	}
	olditem = obj;
}

function showIDialog(iDlg, sUrl) {
	if (iDlg === undefined) {
		window.top[1].top[1].iDlg.showDialog(sUrl);
	} else {
		iDlg.showDialog(sUrl);
	}
}

function doExit(url) {
	window.open(url, "_top");
}

function doIndex(url) {
	window.open(url, "_top");
}


