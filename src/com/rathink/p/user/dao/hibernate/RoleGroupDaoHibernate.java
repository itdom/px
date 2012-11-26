package com.rathink.p.user.dao.hibernate;

import com.rathink.p.user.dao.RoleGroupDao;
import com.rathink.p.user.model.RoleGroup;
import com.rathink.common.hibernate.BaseDaoSupport;

import java.util.List;

import org.springframework.stereotype.Component;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-2-8
 * Time: 14:27:53
 */
@Component
public class RoleGroupDaoHibernate extends BaseDaoSupport implements RoleGroupDao{
   public List<RoleGroup> getRoleGroupList(Integer branchId){
      return this.getHibernateTemplate().find("from RoleGroup rg where rg.branchId="+branchId+" and rg.status = 1 order by rg.id desc");
   }
   public void addRoleGroup(RoleGroup rg){
       this.getHibernateTemplate().save(rg);
   }
   public RoleGroup getRoleGroup(Integer id){
      return (RoleGroup)this.getHibernateTemplate().get(RoleGroup.class,id);
   }
   public RoleGroup getRoleGroupByRoleNameAndBranch(String roleName,Integer branchId){
       List<RoleGroup> rgList=this.getHibernateTemplate().find("from RoleGroup ug where (ug.roles = '" + roleName + "' or ug.roles like '%"+roleName+",%' or ug.roles like '%,"+roleName+"%') and ug.branchId="+branchId+" and ug.status = 1 order by ug.id desc");
       if(rgList!=null||rgList.size()>0)return rgList.get(0);
       return null;
   }
   public RoleGroup getStudentUserRoleGroup(String roleName,Integer branchId){
       List<RoleGroup> rgList=this.getHibernateTemplate().find("from RoleGroup ug where ug.roles = '" + roleName + "' and ug.branchId="+branchId+" and ug.status = 1 order by ug.id desc");
       if(rgList!=null&& rgList.size()>0){
           return rgList.get(0);
       }
       return null;
   }
   public RoleGroup geteRoleGroupByConditions(String name, Integer branchId){
      List  roleGroupList= this.getHibernateTemplate().find("from RoleGroup rg where rg.name = '"+ name +"'and rg.branchId ="+branchId +"and rg.status = 1");
      if(roleGroupList==null||roleGroupList.size()==0)return null;
      return (RoleGroup)roleGroupList.get(0);
   }

  public void saveRoleGroup(RoleGroup rg){
      this.getHibernateTemplate().save(rg);
  }

   public void updateRoleGroup(RoleGroup rg){
      this.getHibernateTemplate().update(rg);
  }
  public List getBranchList(){
      return this.getHibernateTemplate().find("select distinct rg.branchId from RoleGroup rg where rg.branchId is not null and rg.status = 1");
  } 
  public List getRoleUserList(Integer roleId){
      String stringSql="select * from P_USER_ROLEGROUP WHERE ROLEGROUP_ID="+roleId;
        return this.getSession().createSQLQuery(stringSql).list();
  }
  public void deleteRubbishRoleGroup(Integer roleId){

      this.getHibernateTemplate().delete(this.getHibernateTemplate().get(RoleGroup.class,roleId));
  }
}
