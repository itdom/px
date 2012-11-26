package com.rathink.p.user.action;

import com.rathink.common.action.BaseAction;
import com.rathink.p.account.service.impl.LicenseManagerImpl;
import com.rathink.p.user.PConst;
import com.rathink.p.user.model.*;
import com.rathink.p.user.service.UserManager;
import com.rathink.p.user.service.RoleManager;
import com.rathink.p.user.service.RoleGroupManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@Component
@Scope("prototype")
public class UserAction extends BaseAction {
    @Autowired
    private UserManager userManager;
   
    private RoleManager roleManager;
    @Autowired
    private RoleGroupManager roleGroupManager;
   
    private User formUser;
    private String organs;
    private String positions;
    private String roles;
    private String method;
    private String roleGroupHidden;
    private String userOrganHidden;
    private List siteList;
    private String pageTag;
    private String viewSite;
    private String error;
    private String userType;
    private boolean single;
    private String idNames;
    private String textNames;
    private String isteacher;
    private boolean useMainTeachArea = true;
    private String selectedTreeId;
    private List<RoleGroup> roleGroupList;

    public String dispatcher() throws Exception {
        if(!"saas".equals(LicenseManagerImpl.getLicense().getMode())){
            LicenseManagerImpl.licenseDate();
            int flag = LicenseManagerImpl.getLicense().getPassed();
            if(flag==-1){
                throw new Exception(getText("System.propertyFile.illegal"));
            }else if(flag==-2){
                throw new Exception(getText("System.propertyFile.overdue"));
            }else if(flag==-3){
                throw new Exception(getText("System.propertyFile.noFindKey"));
            }else if(flag==-4){
                throw new Exception(getText("System.propertyFile.updateKey"));
            }
        }
        if (PConst.USER_TYPE_TEACHER == myUser.getType()) {
           // Set<UserOrgan> userOrganSet = myUser.getUserOrganSet();
          ///  if (userOrganSet == null || userOrganSet.isEmpty()) {
           //     throw new Exception(getText("user.login.error"));
           // }
            if(myUser.getType()==PConst.USER_TYPE_DELETE){
                throw new Exception(getText("user.delete.error"));
            }
            //if(roleGroupManager.getRoleGroupList(myUser.getBranch().getId())==null||roleGroupManager.getRoleGroupList(myUser.getBranch().getId()).size()==0){
            //    myUser=roleGroupManager.registerSchoolRoleGroupList(myUser.getBranch().getId(),myUser.getBranch().getThetype(),myUser);
            //    this.userManager.saveOrUpdateUser(myUser);
            //}
        } 
        return SUCCESS;
    }

    public String userInfo() {
		formUser = userManager.getUser(formUser.getId());
		return SUCCESS;
	}

    /*public String switchAccountView() {
            studentUser = userManager.getStudentUser(myUser.getId());
            return SUCCESS;
        }

        public String switchAccountForm() {
            studentUser = userManager.getStudentUser(myUser.getId());
            return SUCCESS;
        }

        public String switchAccount() {
            studentUser = userManager.getStudentUser(myUser.getId());
            studentUser.setStudentTraining(studentTraining);
            userManager.updateStudentUser(studentUser);
            return SUCCESS;
        }
    */

    public String save() throws Exception {
        
        return INPUT;
    }

    public String saveUserInfo() {
      /*  userManager.saveUserInfo(formUser);
        formUser = userManager.getUser(formUser.getId());*/
        return SUCCESS;
    }

    public String updateUserPassword() throws Exception {
       /* userManager.updateUserPassword(formUser);
        formUser = userManager.getUser(formUser.getId());*/
        return SUCCESS;
    }

    public String validatePassword() {
        response.setContentType("text/xml");
        PrintWriter out;
        try {
            out = response.getWriter();
           // out.println(String.valueOf(userManager.validatePassword(formUser)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    public String view() {
     /*   if (formUser != null && formUser.getId() != null) {
            formUser = userManager.getUser(formUser.getId());
            this.settingProperties=settingPropertiesManager.getSettingPropertiesByUserIdAndName(formUser.getId(),"i18n");
        }*/
        return SUCCESS;
    }

    public String editPassword() {
        if (formUser != null && formUser.getId() != null) {
            formUser = userManager.getUser(formUser.getId());
        }
        return SUCCESS;
    }

   /* public String selectOrgan() {
        if (formBranch == null || formBranch.getId() == null) {
            if (PConst.BRANCH_TYPE_ADMIN == myUser.getBranch().getThetype()) {
                branchList = branchManager.getBranchTree();
                organList = organManager.getOrganTree();
            } else {
                if (myUser.getTeachArea().isMain()) {
                    teachAreaList = teachAreaManager.getTeachAreaListByBranch(myUser.getBranch().getId());
                } else {
                    teachAreaList = new ArrayList<TeachArea>();
                    teachAreaList.add(myUser.getTeachArea());
                }
                organList = organManager.getOrganTreeBySchool(myUser.getBranch().getId());
                teachAreaList = teachAreaManager.getTeachAreaNestedList(myUser.getTeachArea(),true);
            }
        } else {
            teachAreaList = teachAreaManager.getTeachAreaListByBranch(formBranch.getId());
            organList = organManager.getOrganTreeBySchool(formBranch.getId());
        }
        return SUCCESS;
    }*/
    /*public String save() {
         if ("createUser".equals(action)) {
             if (userManager.saveOrUpdateUser(formUser, userRoleHidden, userGroupHidden, userOrganHidden)) {
                 if (formBranch != null && formBranch.getId() != null) {
                     return NONE;
                 }
                 return SUCCESS;
             }
             error = "userExist";
             return INPUT;
         } else if ("createStudent".equals(action)) {
             if (this.userManager.saveOrUpdateStudent(this.studentUser)) {
                 return LOGIN;
             }
             return ERROR;
         }
         return INPUT;
     }*/

   

    public User getFormUser() {
        return formUser;
    }

    public void setFormUser(User formUser) {
        this.formUser = formUser;
    }

    public String getPositions() {
        return positions;
    }

    public void setPositions(String positions) {
        this.positions = positions;
    }

    public String getOrgans() {
        return organs;
    }

    public void setOrgans(String organs) {
        this.organs = organs;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

   
    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getRoleGroupHidden() {
        return roleGroupHidden;
    }

    public void setRoleGroupHidden(String roleGroupHidden) {
        this.roleGroupHidden = roleGroupHidden;
    }

    public String getUserOrganHidden() {
        return userOrganHidden;
    }

    public void setUserOrganHidden(String userOrganHidden) {
        this.userOrganHidden = userOrganHidden;
    }

    public String getPageTag() {
        return pageTag;
    }

    public void setPageTag(String pageTag) {
        this.pageTag = pageTag;
    }

    public List getSiteList() {
        return siteList;
    }

    public void setSiteList(List siteList) {
        this.siteList = siteList;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

   

    public String getViewSite() {
        return viewSite;
    }

    public void setViewSite(String viewSite) {
        this.viewSite = viewSite;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

   

    public boolean isSingle() {
        return single;
    }

    public void setSingle(boolean single) {
        this.single = single;
    }

    public String getSelectedTreeId() {
        return selectedTreeId;
    }

    public void setSelectedTreeId(String selectedTreeId) {
        this.selectedTreeId = selectedTreeId;
    }

    

    public boolean isUseMainTeachArea() {
        return useMainTeachArea;
    }

    public void setUseMainTeachArea(boolean useMainTeachArea) {
        this.useMainTeachArea = useMainTeachArea;
    }

   

    public String getIdNames() {
        return idNames;
    }

    public void setIdNames(String idNames) {
        this.idNames = idNames;
    }

    public String getTextNames() {
        return textNames;
    }

    public void setTextNames(String textNames) {
        this.textNames = textNames;
    }

    public String getIsteacher() {
        return isteacher;
    }

    public void setIsteacher(String isteacher) {
        this.isteacher = isteacher;
    }

  
}