package com.rathink.p.user.action;


import com.rathink.common.action.BaseAction;
import com.rathink.p.account.service.impl.LicenseManagerImpl;
import com.rathink.p.user.PConst;
import com.rathink.p.user.model.*;
import com.rathink.p.user.service.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class UserAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	@Autowired
    private UserManager userManager;
    private User formUser;
 

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
            if(myUser.getType()==PConst.USER_TYPE_DELETE){
                throw new Exception(getText("user.delete.error"));
            }
        } 
        return SUCCESS;
    }

    public String userInfo() {
		formUser = userManager.getUser(formUser.getId());
		return SUCCESS;
	}
   public String userMenu(){
	   return SUCCESS;
   }
    public String userList(){
    	  pageInfo =  userManager.getUserList(pageEntity);
    	  pageEntity=pageInfo.getPageEntity();
    	  return SUCCESS;	
    }

    public String save() throws Exception {
        
        return INPUT;
    }

    public String saveUserInfo() {
        return SUCCESS;
    }

    public String updateUserPassword() throws Exception {
        return SUCCESS;
    }

    public String view() {
        return SUCCESS;
    }
    public String editPassword() {
        if (formUser != null && formUser.getId() != null) {
            formUser = userManager.getUser(formUser.getId());
        }
        return SUCCESS;
    }

    public User getFormUser() {
        return formUser;
    }
    public void setFormUser(User formUser) {
        this.formUser = formUser;
    }
}