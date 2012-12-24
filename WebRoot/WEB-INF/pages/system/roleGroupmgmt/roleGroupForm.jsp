<%@ include file="/common/taglibs.jsp" %>

<html>
<head>
	<meta name="heading" content="<s:text name="system.rolegroup.heading" />"/>
    <style type="text/css">
       #cuurentid table{
          display:inline;
       }
    </style>
    <script type="text/javascript" src="<c:url value="/scripts/form/validate.js"/>"></script>
	<script type="text/javascript">
		function validateForm() {
            var form=document.getElementById("rolegroupForm");
			if(isEmpty(form.elements['roleGroup.name'].value)) {
				alert('<s:text name="error_roleGroup_name"/>');
				return false;
			}
            var rolecheckbox = document.getElementsByName("rolecheckbox");
			var strId = "";
			for (var i = 0; i < rolecheckbox.length; i++) {
                if(rolecheckbox[i].checked)strId += rolecheckbox[i].value + ",";
			}
            if(strId==""){
                alert('<s:text name="system.rolegroup.role.notnull"/>');
                return false;
            }
            if(strId.length>0){
				strId = strId.substring(0, strId.length - 1);
			}
			document.getElementById("roleGroup.roles").value = strId;
            submitProcess(form);
			return true;
		}
   </script>
</head>
<body>
<form id="rolegroupForm" action='<c:url value="/system/rolegroupmgmt/saveRoleGroup.action"/>' method="post" onsubmit="return validateForm();">
    <s:if test="roleGroup!=null"><input type="hidden" name="roleGroup.id" value="<c:out value="${requestScope.roleGroup.id}"/>"/></s:if>
	<input type="hidden" name="roleGroup.roles" id="roleGroup.roles"/>
    <input value="${roleGroup.status}" name="roleGroup.status" type="hidden">
    <input type="hidden" name="roleGroup.branchId" id="roleGroup.branchId" value="<c:out value="${requestScope.myUser.branch.id}"/>"/>
    <table class="maintable" cellspacing="0" cellpadding="0" border="0">
		<tr>
			<td colspan="2" class="head"/>
		</tr>
		<tr>
			<td width="100%" colspan="2" class="required">
				<s:text name="base.button.roleGroup.name"/>*<input type="text" id="roleGroup.name" name="roleGroup.name" value="<c:out value="${requestScope.roleGroup.name}"/>"/>
			</td>
		</tr>
		<tr>
			<td width="10%" class="deep">
				<s:text name="system.rolegroup.role"/>
			</td>
			<td  width="90%" class="tint">
                <div id ="cuurentid">
                    <ul>
                        <li>
                          <s:iterator status="stat" value="roleMenuList" id="roleMenu">
                              <img src="<c:url value="/images/item.gif"/>" align="absmiddle"/> <FONT style="font-weight:bold"><s:property value="menuLable"/></FONT>
                              <table class="maintable" style="width: 100%" cellpadding="0" cellspacing="0">
                                  <s:iterator status="stat" value="#roleMenu.roleMap.keySet()" id="role">
                                     <tr>
                                        <td class="tint" width="100%">
                                            <input type="checkbox" name="rolecheckbox" value="<s:property value="role"/>"<s:if test="#roleMenu.roleMap.get(#role).name=='ROLE_USER'">checked="checked"</s:if><s:elseif test="roleGroup.roles.indexOf(#roleMenu.roleMap.get(#role).name+',')>=0">checked="checked"</s:elseif><s:elseif test="roleGroup.roles.indexOf(','+#roleMenu.roleMap.get(#role).name)>=0">checked="checked"</s:elseif>/>
                                            <s:property value="#roleMenu.roleMap.get(#role).fullName"></s:property>(<s:property value="#roleMenu.roleMap.get(#role).name"></s:property>)
                                        </td>
                                     </tr>
                                  </s:iterator>
                              </table>
                          </s:iterator>
                        </li>
                    </ul>
                </div>
			</td>
		</tr>
	</table>
    <input type="submit" value='<s:text name="common.button.save"/>' class="btn"/>
	<input type="button" value='<s:text name="common.button.back"/>' class="btn" onclick="window.history.back();"/>
</form>
</body>
</html>