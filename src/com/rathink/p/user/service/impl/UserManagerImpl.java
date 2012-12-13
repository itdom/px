package com.rathink.p.user.service.impl;

import com.rathink.common.model.PageInfo;
import com.rathink.p.user.dao.UserDao;
import com.rathink.p.user.model.User;
import com.rathink.p.user.service.UserManager;
import com.rathink.taglib.PageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserManagerImpl implements UserManager { 
    @Autowired
    private UserDao userDao;
    
	@Override
	public User getUser(Integer id) {
		User user = userDao.getUser(id);
		user.setConfirmPassword(user.getPassword());
		return user;
	}
	@Override
	public PageInfo getUserList(PageEntity pageEntity) {
		return userDao.getUserList(pageEntity);
	}
	@Override
	public int getUserCount(){
		return userDao.getUserCount();
	}
}
