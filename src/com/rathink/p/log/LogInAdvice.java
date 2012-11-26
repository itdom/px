package com.rathink.p.log;

import com.rathink.p.user.model.User;
import com.rathink.p.user.model.SimpleUser;
import com.rathink.p.user.model.RoleGroup;
import com.rathink.p.user.model.Role;
import com.rathink.p.setting.model.SettingProperties;
import com.rathink.p.setting.service.SettingPropertiesManager;
import com.rathink.util.PropUtil;
import org.springframework.aop.AfterReturningAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Properties;
import java.util.List;

/**
 * Time: 9:54:18 2007-8-14
 *
 * @author Kyll
 */
@Component
public class LogInAdvice implements AfterReturningAdvice {
    @Autowired
    private SettingPropertiesManager settingPropertiesManager;
	public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
	    User user = null;
        if (authentication == null || "loadUserByUsername".equals(method.getName())) {
			if (returnValue == null) {
				return;
			}
			if (returnValue != null && returnValue instanceof User) {
				user = (User) returnValue;
			}
        }else{
            user = (User) authentication.getPrincipal();

        }
        List<SettingProperties> spUser = this.settingPropertiesManager.getSettingPropertiesByUser(user.getId());
        for (SettingProperties spu : spUser) {
            if (spu.getName().equals("i18n")) {
                user.setI18nProperties(spu);
            }
        }
        if(user.getI18nProperties()==null){
            SettingProperties s = new SettingProperties();
            SimpleUser simpleUser = new SimpleUser();
            simpleUser.setId(user.getId());
            simpleUser.setTruename(user.getTruename());
            simpleUser.setUsername(user.getUsername());
            s.setUser(simpleUser);
                s.setPropertiesString("zh_CN;GMT8");
            user.setI18nProperties(s);
        }
        List<RoleGroup> list = user.getRoleGroupList();
        for(RoleGroup roleGroup :list){
            List<Role> myRoleList=roleGroup.getMyRoleList();
            String[] roles = roleGroup.getRoles().split(",");
            for(String str:roles){
                Role role=new Role();
                role.setName(str);
                myRoleList.add(role);
            }
        }
      
	}

	@SuppressWarnings("unused")
	private String getLabel(String label) {
		String value = null;
		Properties p = new Properties();
		try {
			InputStream io = PropUtil.class.getResourceAsStream("/ApplicationResources-p_zh_CN.properties");
			p.load(io);
			io.close();
			value = p.getProperty(label);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value == null ? label : value;
	}
}
