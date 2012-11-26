package com.rathink.p.user.model;

import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-9
 * Time: 17:51:14
 */
public class RoleMenu {
    private String menuLable;
    private Map<String,Role> roleMap;
    public String getMenuLable() {
        return menuLable;
    }

    public void setMenuLable(String menuLable) {
        this.menuLable = menuLable;
    }

    public Map<String, Role> getRoleMap() {
        return roleMap;
    }

    public void setRoleMap(Map<String, Role> roleMap) {
        this.roleMap = roleMap;
    }
}
