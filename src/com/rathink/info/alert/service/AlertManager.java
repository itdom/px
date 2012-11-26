package com.rathink.info.alert.service;

import com.rathink.info.alert.model.Alert;
import com.rathink.p.user.model.User;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-11-27
 * Time: 14:39:05
 * To change this template use File | Settings | File Templates.
 */
public interface AlertManager {
   public void saveOrUpdateAlert(User user,String otherTeachAreaIds);
   public void saveOrUpdateUserSetting(String str[],User user);
   public List<Alert> getAlertListByUserSetting(User user);
   public List<Alert> getAlertListByUserSettingName(User user);
}
