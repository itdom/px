package com.rathink.util;

import com.rathink.p.user.model.SimpleUser;
import com.rathink.p.user.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;


/**
 * @author WuYingbo
 */
public class AuthorizationUtil {

    public static User getAuthorization() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
	    try {
		    return (User) authentication.getPrincipal();
	    } catch (Exception e) {
		    return new User();
	    }
    }

    public static SimpleUser getSimpleUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
	    User user = (User) authentication.getPrincipal();
	    SimpleUser simpleUser = new SimpleUser();
	    simpleUser.setId(user.getId());
	    simpleUser.setTruename(user.getTruename());
	    simpleUser.setUsername(user.getUsername());
	    return simpleUser;
    }

    public static SimpleUser getSimpleUser(User user) {
	    SimpleUser simpleUser = new SimpleUser();
	    simpleUser.setId(user.getId());
	    simpleUser.setTruename(user.getTruename());
	    simpleUser.setUsername(user.getUsername());
	    return simpleUser;
    }
 

	 
}
