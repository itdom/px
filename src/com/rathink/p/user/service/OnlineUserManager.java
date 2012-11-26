package com.rathink.p.user.service;

import com.rathink.p.user.model.User;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: ming
 * Date: 2011-1-5
 * Time: 17:13:57
 * To change this template use File | Settings | File Templates.
 */
public interface OnlineUserManager {
    public void saveOnlineUser(User user);
    public void deleteOnlineUser(User user);
    public List<User> getOnlineUserList(Integer id);
}
