package com.rathink.p.user.model;
import org.hibernate.annotations.GenericGenerator;

import com.rathink.p.user.service.impl.RoleManagerImpl;

import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;
import java.io.Serializable;
/**
 * Created by IntelliJ IDEA.
 * User: brightpower
 * Date: 2010-1-9
 * Time: 16:42:26
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "P_ROLE_GROUP")
public class RoleGroup implements Serializable{
    
	private static final long serialVersionUID = 1L;
	private Integer id;
    private String name;
    private String roles;
    private String isall;
    private Integer status; 
    private List<Role> myRoleList=new ArrayList<Role>();
    public RoleGroup(){}
	@Id
	@GenericGenerator(name = "roleGroupId", strategy = "increment")
	@GeneratedValue(generator = "roleGroupId")
	public Integer getId() {
		return id;
	}

    public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "ROLES")
    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
    @Transient
    public String getIsall() {
        return isall;
    }

    public void setIsall(String isall) {
        this.isall = isall;
    }

    @Transient
    public List<Role> getRoleList() {
        return RoleManagerImpl.getRolesByRoleGroup(this.roles);
    }

    @Transient
    public List<Role> getMyRoleList() {
        String[] roles = this.roles.split(",");
        for(String str:roles){
            Role role=new Role();
            role.setName(str);
            myRoleList.add(role);
        }
        return myRoleList;
    }
     @Column(name = "THESTATUS")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
