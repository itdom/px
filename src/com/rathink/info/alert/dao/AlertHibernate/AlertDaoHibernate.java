package com.rathink.info.alert.dao.AlertHibernate;

import org.springframework.stereotype.Component;
import com.rathink.common.hibernate.BaseDaoSupport;
import com.rathink.info.alert.dao.AlertDao;
import com.rathink.info.alert.model.Alert;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-11-27
 * Time: 14:18:03
 * To change this template use File | Settings | File Templates.
 */
@Component
public class AlertDaoHibernate extends BaseDaoSupport implements AlertDao{

    @Override
    public void saveOrUpdateAlert(Alert alert) {
        this.getHibernateTemplate().saveOrUpdate(alert);
    }
    
    @SuppressWarnings("unchecked")
	@Override    
    public List<Alert>  getAlertListByTimeAndType(String time,String type){
        String sqlQuery = "from Alert a where a.dateTime= '"+time+"' and   a.alertType= '"+type+"'" ;
       List<Alert> alertList=this.getHibernateTemplate().find(sqlQuery);
        if(alertList!=null && alertList.size()>0)return alertList;
        else return null;
    }
    @SuppressWarnings("unchecked")
    @Override
    public List<Alert>  getAlertListByTimeAndName(String time,String name){
        String sqlQuery = "from Alert a where a.dateTime= '"+time+"' and  a.alertName= '"+name+"'" ;
       List<Alert> alertList=this.getHibernateTemplate().find(sqlQuery);
        if(alertList!=null && alertList.size()>0)return alertList;
        else return null;
    }

    @SuppressWarnings("unchecked")
    @Override    
    public List<Alert> getAlertListByUserSetting(String settings){
        String sqlQuery = "from Alert a where    a.alertType in ("+settings+")" ;
        return this.getHibernateTemplate().find(sqlQuery);        
    }
    @SuppressWarnings("unchecked")
    @Override
    public List<Alert> getAlertListByUserSettingName(String name){
        String names[]=name.split(",");
        name="";
        for(int i=0;i<names.length;i++){
           name+="'"+names[i]+"',";
        }
        String sqlQuery = "from Alert a where   a.alertName in ("+name.substring(0,name.lastIndexOf(","))+")" ;
        return this.getHibernateTemplate().find(sqlQuery);        
           }
}
