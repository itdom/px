package com.rathink.info.alert.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Scope;
import com.rathink.common.action.BaseAction;
import com.rathink.info.alert.service.AlertManager;
import com.rathink.info.alert.service.AlertDefinationManager;
import com.rathink.info.alert.model.Alert;
import com.rathink.info.alert.model.AlertDefination;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-11-27
 * Time: 14:05:34
 * To change this template use File | Settings | File Templates.
 */
@Component
@Scope("prototype")
public class AlertAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	@Autowired
    private AlertManager alertManager;
    @Autowired    
    private AlertDefinationManager alertDefinationManager;
    private List<Alert> alertList = new ArrayList<Alert>();
    private String[] alertSettings;
    private boolean flag;
    private List<AlertDefination> alertDefinationList = new ArrayList<AlertDefination>();
    private Map<String,AlertDefination> alertDefinationMap;
    public String showAlertByUserToJson() {
        this.alertList = alertManager.getAlertListByUserSettingName(myUser);
        return SUCCESS;
    }

    //保存用户设置记录
    public String saveOrUpdateUserSetting() {
        alertManager.saveOrUpdateUserSetting(alertSettings, myUser);
        return SUCCESS;
    }

    public String userSettingForm(){
        this.alertDefinationList = alertDefinationManager.AlertDefinationList();
        this.alertDefinationMap = alertDefinationManager.AlertDefinationMap();
        return SUCCESS;
    }
    public String showClazzInstanceCount(){
        return SUCCESS;
    }
    public List<Alert> getAlertList() {
        return alertList;
    }

    public void setAlertList(List<Alert> alertList) {
        this.alertList = alertList;
    }


    public String[] getAlertSettings() {
        return alertSettings;
    }

    public void setAlertSettings(String[] alertSettings) {
        this.alertSettings = alertSettings;
    }

    public boolean getFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public List<AlertDefination> getAlertDefinationList() {
        return alertDefinationList;
    }

    public void setAlertDefinationList(List<AlertDefination> alertDefinationList) {
        this.alertDefinationList = alertDefinationList;
    }

    public Map<String, AlertDefination> getAlertDefinationMap() {
        return alertDefinationMap;
    }

    public void setAlertDefinationMap(Map<String, AlertDefination> alertDefinationMap) {
        this.alertDefinationMap = alertDefinationMap;
    }
}
