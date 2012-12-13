package com.rathink.p.user.model;

 
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.rathink.p.setting.model.SettingProperties;
import com.rathink.util.PropUtil;
import com.rathink.util.StringUtil;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.*;



/**
 * 用户 
 * 
 * @author  gdl
 * @version 1.0, 2012-11-28
 */
@Entity
@Table(name = "P_USER")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements Serializable, UserDetails {
 
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String username;
	private String truename;
	private String password;
	private String confirmPassword;
	private String oldPassword;
	private UserInfo userInfo;
	private boolean enabled;
	private boolean accountExpired;
	private boolean accountLocked;
	private boolean credentialsExpired;
    private Set<RoleGroup> roleGroupSet;
    private SettingProperties i18nProperties;
    private String setting;
  
	private Integer type;    //用户类型
  
    public User() {
	}

	@Id
	/*@GenericGenerator(name = "userId", strategy = "increment")
	@GeneratedValue(generator = "userId")*/
	public Integer getId() {
		return id;
	}

	@Column(name = "USERNAME")
	public String getUsername() {
		return username;
	}

	@Column(name = "TRUENAME")
	public String getTruename() {
		return truename;
	}

	@Column(name = "PASSWORD")
	public String getPassword() {
		return password;
	}

	@Transient
	public String getConfirmPassword() {
		return confirmPassword;
	}

	@Transient
	public String getOldPassword() {
		return oldPassword;
	}

	@Column(name = "ACCOUNT_ENABLED")
	public boolean isEnabled() {
		return enabled;
	}

	@Column(name = "ACCOUNT_EXPIRED")
	public boolean isAccountExpired() {
		return accountExpired;
	}

	@Column(name = "ACCOUNT_LOCKED")
	public boolean isAccountLocked() {
		return accountLocked;
	}

	@Column(name = "CREDENTIALS_EXPIRED")
	public boolean isCredentialsExpired() {
		return credentialsExpired;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USERINFO_ID")
	public UserInfo getUserInfo() {
		return userInfo;
	}
 

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "P_USER_ROLEGROUP",
			joinColumns = {@JoinColumn(name =  "USER_ID")},
			inverseJoinColumns = @JoinColumn(name = "ROLEGROUP_ID")
	)
	public Set<RoleGroup> getRoleGroupSet() {
		return roleGroupSet;
	}

    public void setRoleGroupSet(Set<RoleGroup> roleGroupSet) {
		this.roleGroupSet = roleGroupSet;
	}

   

  
    

	public void setId(Integer id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public void setAccountExpired(boolean accountExpired) {
		this.accountExpired = accountExpired;
	}

	public void setAccountLocked(boolean accountLocked) {
		this.accountLocked = accountLocked;
	}

	public void setCredentialsExpired(boolean credentialsExpired) {
		this.credentialsExpired = credentialsExpired;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}
 
  
	@Transient
	public boolean isAccountNonExpired() {
		return !isAccountExpired();
	}

	@Transient
	public boolean isAccountNonLocked() {
		return !isAccountLocked();
	}

	@Transient
	public boolean isCredentialsNonExpired() {
		return !credentialsExpired;
	}

	@Transient
	public String getFullName() {
		return this.truename + "[" + this.username + "]";
	}

 
    @Override
	public String toString() {
		return "User{id = " + id + ", username = " + username + "}";
	}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!id.equals(user.id)) return false;
        if (!username.equals(user.username)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + username.hashCode();
        return result;
    }

    @Column(name = "THETYPE")
	public Integer getType() {
		return type;
	}
    @Column(name = "SETTING")
	public String getSetting() {
		return setting;
	}

	public void setSetting(String setting) {
		this.setting = setting;
	}
	
	
	public void setType(Integer type) {
		this.type = type;
	}
	 
    @Transient
	public List<RoleGroup> getRoleGroupList() {
		if (roleGroupSet == null) {
			return null;
		}
		List<RoleGroup> list = new ArrayList<RoleGroup>();
		list.addAll(roleGroupSet);
		Collections.sort(list, new Comparator<RoleGroup>() {
			public int compare(RoleGroup o1, RoleGroup o2) {
				return o1.getId() - o2.getId();
			}
		});
		return list;
	}

    @Transient
	public Collection<GrantedAuthority> getAuthorities() {
        Set<Role> roleSet=new HashSet<Role>();
        Role role= new Role();//没个用户都默认带ROLE_USER这个权限
            role.setName("ROLE_USER");
            role.setLabel("普通用户");
            roleSet.add(role);
		for(RoleGroup rg:this.getRoleGroupSet()){
            roleSet.addAll(rg.getRoleList());
        }
        List<GrantedAuthority> gList=new ArrayList<GrantedAuthority>();
        for(GrantedAuthority g:roleSet.toArray(new GrantedAuthority[roleSet.size()])){
            gList.add(g);
        }
        return gList;
    }
    
    @Transient
    public SettingProperties getI18nProperties() {
        return i18nProperties;
    }

    public void setI18nProperties(SettingProperties i18nProperties) {
        this.i18nProperties = i18nProperties;
    }
    @Transient
    public Locale getLocale(){
        return new Locale(this.i18nProperties.getPropertiesString().substring(0,2),this.i18nProperties.getPropertiesString().substring(3,5));
    }
    @Transient
   public   String getSettingValue(String name) {
		   String value = "default";
	        if(getSettingMap().get(name) !=null){
	            value =  getSettingMap().get(name);
	        }else{
	            value =  PropUtil.getProperyValue(PropUtil.SETTING,name);
	        }

			return value;
		}
    @Transient
		public Map<String, String> getSettingValueMap(String name) {
			if (setting == null || "".equals(setting)) {
				return null;
			}
			Map<String, String> map = new HashMap<String, String>();
			String[] ss = StringUtil.split(setting, ';');
			for (String st : ss) {
				if (st.contains(":")) {
					String[] sts = StringUtil.split(st, '=');
	                if(sts[0].equals(name)){
	                    String  temp =  st.substring(st.indexOf(":")+1);
	                    if(temp.indexOf("&") != -1)  {
	                          map.put("user", temp.split("&")[0]);
	                          map.put("password",  temp.split("&")[1]);
	                    }

	                }
				}
			}
			return map;
		}
    @Transient
		public   Map<String, String> getSettingMap() {
			if (setting == null || "".equals(setting)) {
				return null;
			}
			Map<String, String> map = new HashMap<String, String>();
			String[] ss = StringUtil.split(setting, ';');
			for (String st : ss) {
				String[] sts = StringUtil.split(st, '=');
				map.put(sts[0], StringUtil.split(sts[1], ':')[0]);
			}
			return map;
		}
	
}
