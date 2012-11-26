package com.rathink.info.bbs.model;

/**
 * @author WuYingbo
 */

import com.rathink.p.user.model.SimpleUser;
import com.rathink.util.DateUtil;
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
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SuppressWarnings("serial")
@Entity
@Table(name = "INFO_BBS_NEWS")
public class News implements Serializable {

	private Integer id;
	private String name;
	private String description;
	private String content;
	private Integer readCount;
	private Integer visitorCount;
	private Date dateTime;
	private String showDate;
	private Integer type;
	private Board board;
	private SimpleUser user;
	private List<Attachement> attachementList = new ArrayList<Attachement>();

	@Id
    @GenericGenerator(name = "newsId", strategy = "increment")
    @GeneratedValue(generator = "newsId")
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

	@Column(name = "CONTENT")
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "READ_COUNT")
	public Integer getReadCount() {
		return readCount;
	}

	public void setReadCount(Integer readCount) {
		this.readCount = readCount;
	}

	@Column(name = "VISITOR_COUNT")
	public Integer getVisitorCount() {
		return visitorCount;
	}

	public void setVisitorCount(Integer visitorCount) {
		this.visitorCount = visitorCount;
	}

	@Column(name = "DATE_TIME")
	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	@Column(name = "THE_TYPE")
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "BOARD_ID")
	public Board getBoard() {
		return board;
	}

	public void setBoard(Board board) {
		this.board = board;
	}

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
	public SimpleUser getUser() {
		return user;
	}

	public void setUser(SimpleUser user) {
		this.user = user;
	}

	@Transient
	public String getShowDate() {
		if (this.dateTime != null) {
			this.showDate = DateUtil.formatDateMinute(this.dateTime.getTime());
		}
		return showDate;
	}

	public void setShowDate(String showDate) {
		this.showDate = showDate;
	}

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "NEWS_ID")
	public List<Attachement> getAttachementList() {
		return attachementList;
	}

	public void setAttachementList(List<Attachement> attachementList) {
		this.attachementList = attachementList;
	}

    @Transient
    public String  getUserFullName(){
        return this.user.getFullName();
    }
    @Transient
    public String getBoardName(){
        return this.board.getName();
    }
    @Transient
    public  Integer getBoardId(){
        return this.board.getId();
    }
}
