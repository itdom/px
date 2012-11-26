var xmlHttp;
var text
function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0");
    } else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    return xmlHttp;
}
function handleStateChange_sendInfo()
{   
    if (xmlHttp.readyState == 4)
    {
        if (xmlHttp.status == 200)
        {
            if(xmlHttp.responseText.length>0){
//            alert(xmlHttp.responseText);
               text = xmlHttp.responseText;


            }
        }
    }
}
function sendInfo(url)
{
    createXMLHttpRequest();
    xmlHttp.open("post", url, true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = handleStateChange_sendInfo;
    return text;
}
