package com.rathink.p.user.service.impl;

import com.rathink.p.user.service.RoleGroupManager;
import com.rathink.p.user.model.RoleGroup;
import com.rathink.p.user.dao.RoleGroupDao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-8
 * Time: 14:19:12
 */
@Component
public class RoleGroupManagerImpl implements RoleGroupManager{
   @Autowired
   private RoleGroupDao roleGroupDao;
 
   public void addRoleGroup(RoleGroup rg){
      this.roleGroupDao.addRoleGroup(rg);
   }
   public RoleGroup getRoleGroup(Integer id){
      return this.roleGroupDao.getRoleGroup(id);
   }
   public RoleGroup getRoleGroupByRoleNameAndBranch(String uniqueName,Integer id){
      return roleGroupDao.getRoleGroupByRoleNameAndBranch(uniqueName,id);
   }
   public void saveRoleGroup(RoleGroup roleGroup){
         roleGroupDao.saveRoleGroup(roleGroup);
    }
     public void updateRoleGroup(RoleGroup roleGroup){
         roleGroupDao.updateRoleGroup(roleGroup);
    }
   
    
    public void deleteRubbishRoleGroup(Integer roleId){
        roleGroupDao.deleteRubbishRoleGroup(roleId);
    }
    public void deleteRoleGroup(RoleGroup roleGroup){
        RoleGroup rg = roleGroupDao.getRoleGroup(roleGroup.getId());
        rg.setStatus(0);
        roleGroupDao.saveRoleGroup(rg);

    }
   
}
