package com.rathink.p.menu.service;

import com.rathink.p.user.model.User;
import com.rathink.p.menu.model.Menu;

import java.util.List;

/**
 * User: Gdl
 * Time: 2012-12-23 15:36:31
 */
public interface MenuManager {
	public List<Menu> getMenuListByUser(User user);
}
