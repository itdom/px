package com.rathink.p.user.dao;
 

import com.rathink.common.model.PageInfo;
import com.rathink.p.user.model.User;
import com.rathink.taglib.PageEntity;
 
/**
 * User: Gdl
 * Time: 2008-6-24 8:51:53
 */
public interface UserDao {
	
	public User getUser(Integer id);
	 
	public PageInfo getUserList(PageEntity pageEntity);
	
	public int getUserCount();
}
