var isIe = (document.all) ? true : false;

function closeWindow()
{
    if (document.getElementById('back') != null)
    {
        document.getElementById('back').parentNode.removeChild(document.getElementById('back'));
    }
    if (document.getElementById('mesWindow') != null)
    {
        document.getElementById('mesWindow').parentNode.removeChild(document.getElementById('mesWindow'));
    }

}
function show(id, ev,width,height) {/*--打开--*/
    closeWindow();
    var bWidth = parseInt(document.documentElement.scrollWidth);
    var bHeight = parseInt(document.documentElement.scrollHeight) < 592 ? 592 : parseInt(document.documentElement.scrollHeight);


    var o = document.getElementById(id);
    if (ev.clientX > 300) {
        o.style.left = 200 + "px";
    } else {
        o.style.left = ev.clientX + 10 + "px";
    }
    o.style.top = ev.clientY + 40 + "px";
    o.style.display = "block";
    o.style.width = width+"px";
    o.style.height = height+"px";

}

function closeed(id) {/*--关闭--*/
    closeWindow();
    var o = document.getElementById(id);
    if (o.style.display == "block")
    {
        o.style.display = "none";

    }
}

