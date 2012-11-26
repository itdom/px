package com.rathink.p.setting.service.impl;

import com.rathink.p.setting.model.SettingProperties;
import com.rathink.p.setting.service.SettingPropertiesManager;
import com.rathink.p.setting.dao.SettingPropertiesDao;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-6
 * Time: 8:52:25
 */
@Component
public class SettingPropertiesManagerImpl implements SettingPropertiesManager {
    @Autowired
	private SettingPropertiesDao settingPropertiesDao;
    public List<SettingProperties> getSettingPropertiesByUser(Integer userid){
        return this.settingPropertiesDao.getSettingPropertiesByUser(userid);
    }
}
