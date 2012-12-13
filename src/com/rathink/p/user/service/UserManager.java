package com.rathink.p.user.service;

import java.util.List;

import com.rathink.common.model.PageInfo;
import com.rathink.p.user.model.User;
import com.rathink.taglib.PageEntity;


/**
 * 用户管理接口
 * 
 * @author  gdl
 * @version 1.0, 2012-11-28
 */
public interface UserManager {
	
	/**
	 * 根据用户ID 查询用户信息
	 * @param id
     *         用户Id
	 * @return User
	 */
	public User getUser(Integer id);
	
	/**
	 * 分页方式得到用户列表
	 * @param pageEntity 
	 *         分页封装条件
	 *         
	 * @return 用户列表由分页类封装
	 */
	public PageInfo getUserList(PageEntity pageEntity);
	/**
	 * 得到用户总个数
	 * 
	 * @return 用户个数用于分页
	 */
	public int getUserCount();
}
