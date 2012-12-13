package com.rathink.taglib;
import com.rathink.p.user.model.Role;
import com.rathink.p.user.model.User;
import com.rathink.p.user.model.RoleGroup;
import com.rathink.util.AuthorizationUtil;

import java.util.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;
import javax.servlet.jsp.tagext.TagSupport;
@SuppressWarnings("serial")
public class AuthTag extends TagSupport
{
  private User user;
  private String roleName;

  public User getUser()
  {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getRoleName() {
    return this.roleName;
  }

  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }

  public int doStartTag() throws JspException {
    Tag parentTag = getParent();
    if ((parentTag != null) && (parentTag instanceof ScopeTag)) {
      ScopeTag scopeTag = (ScopeTag)parentTag;
      if ((scopeTag.isEvalOtherAuth()) && (processAuth())) {
        scopeTag.setEvalOtherAuth(false);
        return 1;
      }
    }
    else if (processAuth()) {
      return 1;
    }

    return 0;
  }

  private boolean processAuth() {
    if (this.user == null)
      return processAuthDetails(AuthorizationUtil.getAuthorization());

    return processAuthDetails(this.user);
  }

    private boolean processAuthDetails(User user) {
        String[] roleNames = this.roleName.split(",");
        List<RoleGroup>  roleGroupList = user.getRoleGroupList();
        List<Role> roleList = new ArrayList<Role>();
        for(RoleGroup roleGroup : roleGroupList) {
            roleList.addAll(roleGroup.getMyRoleList());
        }
         Role role1= new Role();//没个用户都默认带ROLE_USER这个权限
            role1.setName("ROLE_USER");
            role1.setLabel("普通用户");
            roleList.add(role1);
        for(Role role:roleList){
            for(String str:roleNames){
                if(role.getName().equals("SUPER_M")||role.getName().equals(str)){
                    return true;
                }
            }
        }

    return false;
  }
}