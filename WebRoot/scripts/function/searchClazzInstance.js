function searchByClick(type) {
            var getvalue;
            if(type=="byTeachArea")getvalue=trimAllHA(document.getElementById("otherTeachArea.id").value);
            else getvalue=trimAllHA(document.getElementById(type).value);
            if(getvalue==null){
                alert("请输入内容！");
                return false;
            }
            var focusfor = document.getElementById(type);
            switch (type) {
                case "byName":
                    if (isEmpty(getvalue)) {
                        alert('请输入班级名称！');
                        return;
                    }
                    getvalue=getvalue.replace(/%/g, "/%");
                    break;
                case "bySerial":
                    if (isEmpty(getvalue)){
                        alert('请输入班级编号');
                        return;
                    }
                    getvalue = getvalue.replace(/%/g, "/%");
                    break;
                case "byTeachArea":
                    if (isEmpty(getvalue)){
                        alert('请选择校区');
                        return;
                    }
                    getvalue = getvalue.replace(/%/g, "/%");
                    break;
                case "clazzInstanceName":
                    if (isEmpty(getvalue)) {
                        alert('请选择班级！');
                        focusfor.focus();
                        return;
                    }
                    break;
                default:
                    break;
            }
            var d = document.getElementById("searchBy");
            d.value = type;
            var v = document.getElementById("searchValue");
            v.value = getvalue;
            if(type == "clazzInstanceName")v.value = document.getElementById("clazzInstanceId").value;
            if(type == "byTeachArea")v.value = document.getElementById("otherTeachArea.id").value;
            var form = document.getElementById("form1");
            submitProcess(form);
            form.submit();
        }
        function searchEnter(type) {
            if (13 == event.keyCode) {
                searchByClick(type);
            }
        }