package com.rathink.p.setting.service;

import com.rathink.p.setting.model.SettingProperties;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-6
 * Time: 8:51:52
 */
public interface SettingPropertiesManager {
    public List<SettingProperties> getSettingPropertiesByUser(Integer userid);
}
