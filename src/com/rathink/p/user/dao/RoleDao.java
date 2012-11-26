package com.rathink.p.user.dao;

import com.rathink.common.model.PageInfo;
import com.rathink.p.user.model.Role;
import com.rathink.taglib.PageEntity;

import java.util.List;

public interface RoleDao {
    
	public List<Role> getRoleListByRelated(Integer thetype);

    public List<Role> getRoleList();
	
    public PageInfo getRoleList(PageEntity pageEntity);

	public List<Role> getRoleList(final int start, final int max);

	public int getRoleCount();

    public Role getRole(Integer id);

    public Role getRole(String name);

    public void saveRole(Role role);

    public void updateRole(Role role);

	public void deleteRole(Integer id);
}
