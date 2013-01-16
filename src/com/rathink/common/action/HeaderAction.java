package com.rathink.common.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.rathink.util.AuthorizationUtil;
import com.rathink.p.menu.model.Menu;
import com.rathink.p.menu.service.MenuManager;

/**
 * User: Kyll
 * Time: 2008-8-11 15:30:24
 */   
@Component
@Scope("prototype")
public class HeaderAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	@Autowired
	private MenuManager menuManager;
	private List<Menu> menuList;

	public String schoolHeader() {
		System.out.println("hllo my love");
		menuList = menuManager.getMenuListByUser(AuthorizationUtil.getAuthorization());
		return SUCCESS;
	}

	public List<Menu> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}
}
