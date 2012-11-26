package com.rathink.info.alert.service.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import com.rathink.info.alert.service.AlertManager;
import com.rathink.info.alert.model.Alert;
import com.rathink.p.user.model.User;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-11-27
 * Time: 14:39:42
 * To change this template use File | Settings | File Templates.
 */
@Component
public class AlertManagerImpl implements AlertManager {
	public List<Alert> getAlertListByUserSetting(User user) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<Alert> getAlertListByUserSettingName(User user) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void saveOrUpdateAlert(User user, String otherTeachAreaIds) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void saveOrUpdateUserSetting(String[] str, User user) {
		// TODO Auto-generated method stub
		
	}


}
