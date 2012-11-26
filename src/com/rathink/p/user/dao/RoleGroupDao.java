package com.rathink.p.user.dao;

import com.rathink.p.user.model.RoleGroup;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-8
 * Time: 14:27:27
 */
public interface RoleGroupDao {
    public void addRoleGroup(RoleGroup rg);
    public RoleGroup getRoleGroup(Integer id);
    public RoleGroup getRoleGroupByRoleNameAndBranch(String roleName,Integer id);
    public RoleGroup getStudentUserRoleGroup(String roleName,Integer branchId);
   public void saveRoleGroup(RoleGroup rg);
   public void updateRoleGroup(RoleGroup rg);
   public void deleteRubbishRoleGroup(Integer roleId);
}
