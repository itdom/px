package com.rathink.info.alert.model;


/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-12-29
 * Time: 9:09:10
 * To change this template use File | Settings | File Templates.
 */
public class AlertDefination {
   private String id; 
   private String name;
   private String label;
//   private String method;
//   private AlertCounting alertCounting;
   private String checkType;
   private boolean isMain;
   private String branchType;
   private String notify;
   private String roles;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

//    public String getMethod() {
//        return method;
//    }
//
//    public void setMethod(String method) {
//        this.method = method;
//    }

    public String getCheckType() {
        return checkType;
    }

    public void setCheckType(String checkType) {
        this.checkType = checkType;
    }

    public boolean isMain() {
        return isMain;
    }

    public void setMain(boolean main) {
        isMain = main;
    }

    public String getNotify() {
        return notify;
    }

    public void setNotify(String notify) {
        this.notify = notify;
    }

//    public AlertCounting getAlertCounting() {
//        return alertCounting;
//    }
//
//    public void setAlertCounting(AlertCounting alertCounting) {
//        this.alertCounting = alertCounting;
//    }

    public String getBranchType() {
        return branchType;
    }

    public void setBranchType(String branchType) {
        this.branchType = branchType;
    }
    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
