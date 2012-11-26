package com.rathink.p.user.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;

@SuppressWarnings("serial")
@Entity
@Table(name = "P_USER")
public class SimpleUser implements Serializable {
	private Integer id;
	private String username;
	private String truename;
	private Integer branch;
    private Integer type;    //学生用户 OR 正常用户

	public SimpleUser() {
	}

	@Id
	/*
	 * @GenericGenerator(name = "userId", strategy = "increment")
	 * @GeneratedValue(generator = "userId")
	 */
	public Integer getId() {
		return id;
	}

	@Column(name = "USERNAME")
	public String getUsername() {
		return username;
	}

	@Column(name = "TRUENAME")
	public String getTruename() {
		return truename;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	@Transient
	public String getFullName() {
		return this.truename + "[" + this.username + "]";
	}

	public String toString() {
		return "User{id = " + id + ", username = " + username + "}";
	}
	
	@Column(name = "BRANCH_ID")
	public Integer getBranch() {
		return branch;
	}

	public void setBranch(Integer branch) {
		this.branch = branch;
	}

    @Column(name = "THETYPE")
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

}
