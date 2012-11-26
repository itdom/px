package com.rathink.p.user.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.context.WebApplicationContext;
import javax.servlet.http.HttpSessionEvent;
import com.rathink.p.user.model.User;

/**
 * 扩展的HttpSessionEventPublisher
 * 支持在线人数统计
 *
 */
public class EnhancedHttpSessionEventPublisher extends HttpSessionEventPublisher {

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        // 将用户加入到在线用户列表中
        saveOrDeleteOnlineUser(event, Type.SAVE);
        super.sessionCreated(event);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        // 将用户从在线用户列表中移除
        saveOrDeleteOnlineUser(event, Type.DELETE);
        super.sessionDestroyed(event);
    }

    public void saveOrDeleteOnlineUser(HttpSessionEvent event, Type type) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            Object principal = auth.getPrincipal();
            if (principal instanceof User) {
                User user = (User) principal;
                WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(event.getSession().getServletContext());   
                OnlineUserManager onlineUserManager = (OnlineUserManager) wac.getBean("onlineUserManagerImpl");
                switch (type) {
                case SAVE:
                    onlineUserManager.saveOnlineUser(user);
                    break;
                case DELETE:
                    onlineUserManager.deleteOnlineUser(user);
                    break;
                }
            }
        }
    }

    /**
     * 定义一个简单的内部枚举
     */
    private static enum Type {
        SAVE, DELETE;
    }

}
