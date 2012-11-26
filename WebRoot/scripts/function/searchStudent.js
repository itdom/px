function searchByClick(type) {
      var getvalue = trimAllHA(document.getElementById(type).value);
         var focusfor = document.getElementById(type);
            switch (type) {
            case "byInfor":
                    if (isEmpty(getvalue)) {
                        alert('请输入卡号！');
                        return;
                    }
                    getvalue=getvalue.replace(/%/g, "/%");
                    break;
                case "byName":
                    if (isEmpty(getvalue)) {
                        alert('请输入姓名！');
                        return;
                    }
                    getvalue=getvalue.replace(/%/g, "/%");
                    break;
                case "byTeachArea":
                    if (isEmpty(getvalue)){
                        alert('请输入校区信息');
                        return;
                    }
                    getvalue = getvalue.replace(/%/g, "/%");
                    break;
                case "studentTrainingName":
                    if (isEmpty(getvalue)) {
                        alert('请输入编号！');
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
            if (type == "studentTrainingName")v.value = document.getElementById("studentTrainingId").value;
            var form = document.getElementById("form1");
            submitProcess(form);
            form.submit();
        }
        function searchEnter(type) {
            if (13 == event.keyCode) {
                searchByClick(type);
            }
        }