package com.rathink.info.bbs.model;

/**
 * @author WuYingbo
 */
import com.rathink.p.user.model.SimpleUser;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@SuppressWarnings("serial")
@Entity
@Table(name = "INFO_BBS_BOARD")
public class Board implements Serializable {

	private Integer id;
	private String name;
	private String description;
	private Date dateTime;
	private Date lastTime;
	private Integer branch;
	private SimpleUser user;
	private List<News> newsList;
	private Integer theType;
	
	@Id
    @GenericGenerator(name = "boardId", strategy = "increment")
    @GeneratedValue(generator = "boardId")
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

	@Column(name = "DESCRIPTION")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "DATE_TIME")
	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	@Column(name = "LAST_TIME")
	public Date getLastTime() {
		return lastTime;
	}

	public void setLastTime(Date lastTime) {
		this.lastTime = lastTime;
	}

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
	public SimpleUser getUser() {
		return user;
	}

	public void setUser(SimpleUser user) {
		this.user = user;
	}

	@OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	public List<News> getNewsList() {
		return newsList;
	}

	public void setNewsList(List<News> newsList) {
		this.newsList = newsList;
	}

	@Column(name = "THE_TYPE")
	public Integer getTheType() {
		return theType;
	}

	public void setTheType(Integer theType) {
		this.theType = theType;
	}
	@Column(name="BRANCH_ID")
	public Integer getBranch() {
		return branch;
	}

	public void setBranch(Integer branchId) {
		this.branch = branchId;
	}
	
}
