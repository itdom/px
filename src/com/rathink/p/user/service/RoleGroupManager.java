package com.rathink.p.user.service;

import com.rathink.p.user.model.RoleGroup;


/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-8
 * Time: 14:18:28
 */

public interface RoleGroupManager {
   public void addRoleGroup(RoleGroup rg);
   public RoleGroup getRoleGroup(Integer id);
   public RoleGroup getRoleGroupByRoleNameAndBranch(String uniqueName,Integer id);
   public void saveRoleGroup(RoleGroup roleGroup);
   public void updateRoleGroup(RoleGroup roleGroup);
   public void deleteRubbishRoleGroup(Integer roleId);
   public void deleteRoleGroup(RoleGroup rg);
}
