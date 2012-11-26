package com.rathink.p.setting.model;

import com.rathink.p.user.model.SimpleUser;
import com.rathink.util.StringUtil;
import com.rathink.util.PropUtil;

import javax.persistence.*;
import java.util.Map;
import java.util.HashMap;
import java.io.Serializable;

import org.hibernate.annotations.GenericGenerator;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-6
 * Time: 8:42:41
 */
@Entity
@Table(name = "P_SETTING_PROPERTIES")
public class SettingProperties implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
    private String propertiesString;
    private Integer theType;
    private Integer propertiesType;
    private Map<String,String> propertyMap=new HashMap<String,String>();
    private SimpleUser user;

    @Id
	@GenericGenerator(name = "settingPropertiesId", strategy = "increment")
	@GeneratedValue(generator = "settingPropertiesId")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @Column(name = "PROPERTIES")
    public String getPropertiesString() {
        return propertiesString;
    }

    public void setPropertiesString(String propertiesString) {
        this.propertiesString = propertiesString;
    }
    @Column(name = "THETYPE")
    public Integer getTheType() {
        return theType;
    }

    public void setTheType(Integer theType) {
        this.theType = theType;
    }
    @Column(name = "PROPERITES_TYPE")
    public Integer getPropertiesType() {
        return propertiesType;
    }

    public void setPropertiesType(Integer propertiesType) {
        this.propertiesType = propertiesType;
    }
    @Transient
    public Map<String, String> getPropertyMap() {
        return propertyMap;
    }

    public void setPropertyMap(Map<String, String> propertyMap) {
        this.propertyMap = propertyMap;
    }
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
    public SimpleUser getUser() {
        return user;
    }

    public void setUser(SimpleUser user) {
        this.user = user;
    }

    @Transient
	public Map<String, String> getSettingMap() {
		if (propertiesString == null || "".equals(propertiesString)) {
			return null;
		}
		String[] ss = StringUtil.split(propertiesString, ';');
		for (String st : ss) {
			String[] sts = StringUtil.split(st, '=');
			propertyMap.put(sts[0], StringUtil.split(sts[1], ':')[0]);
		}
		return propertyMap;
	}
	@Transient
	public Map<String, String> getpropertiesStringValueMap() {
		if (propertiesString == null || "".equals(propertiesString)) {
			return null;
		}
		String[] ss = StringUtil.split(propertiesString, ';');
		for (String st : ss) {
			if (st.contains(":")) {
				String[] sts = StringUtil.split(st, '=');
				propertyMap.put(sts[0], StringUtil.split(sts[1], ':')[1]);
			}
		}
		return propertyMap;
	}
    @Transient
	public Map<String, String> getSettingValueMap(String name) {
		if (propertiesString == null || "".equals(propertiesString)) {
			return null;
		}
		String[] ss = StringUtil.split(propertiesString, ';');
		for (String st : ss) {
			if (st.contains(":")) {
				String[] sts = StringUtil.split(st, '=');
                if(sts[0].equals(name)){
                    String  temp =  st.substring(st.indexOf(":")+1);
                    if(temp.indexOf("&") != -1)  {
                          propertyMap.put("user", temp.split("&")[0]);
                          propertyMap.put("password",  temp.split("&")[1]);
                    }
                }
			}
		}
		return propertyMap;
	}
    @Transient
	public String getSettingValue(String name) {
        //超级管理员该怎么办
        //if(this.id==1) return  PropUtil.getProperyValue(PropUtil.SETTING,name);
		if (propertiesString == null || "".equals(propertiesString)) {
			return null;
		}
	    String value = "default";
        if(this.getSettingMap().get(name) !=null){
            value=this.getSettingMap().get(name);
        }else{
            value=PropUtil.getProperyValue(PropUtil.SETTING,name);
        }
		return value;
	}
}
