package com.rathink.info.alert.dao;

import com.rathink.info.alert.model.Alert;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-11-27
 * Time: 14:17:30
 * To change this template use File | Settings | File Templates.
 */
public interface AlertDao {
    public void saveOrUpdateAlert(Alert alert);
    public List<Alert> getAlertListByTimeAndType(String time,String type);
    public List<Alert> getAlertListByTimeAndName(String time,String name);
    public List<Alert> getAlertListByUserSetting(String settings);
    public List<Alert> getAlertListByUserSettingName(String name);
}
