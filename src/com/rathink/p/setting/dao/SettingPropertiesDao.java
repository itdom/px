package com.rathink.p.setting.dao;

import com.rathink.p.setting.model.SettingProperties;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-6
 * Time: 8:52:49
 */
public interface SettingPropertiesDao {
    public List<SettingProperties> getSettingPropertiesByUser(Integer userid);
}
