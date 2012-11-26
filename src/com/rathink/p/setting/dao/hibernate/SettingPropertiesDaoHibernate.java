package com.rathink.p.setting.dao.hibernate;

import com.rathink.common.hibernate.BaseDaoSupport;
import com.rathink.p.setting.dao.SettingPropertiesDao;
import com.rathink.p.setting.model.SettingProperties;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-6
 * Time: 8:53:09
 */
@Component
public class SettingPropertiesDaoHibernate  extends BaseDaoSupport implements SettingPropertiesDao {

    public List<SettingProperties> getSettingPropertiesByUser(Integer userid){
      String queryString = "from SettingProperties sp where sp.user.id="+userid;
      return (List<SettingProperties>)this.getHibernateTemplate().find(queryString);
    }
    
}
