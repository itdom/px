package com.rathink.info.bbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "INFO_BBS_NEWS_ATTACHEMENT")
public class Attachement {

	private Integer id;
	private String showName;
	private String realName;
	private News news;

	@Id
	@GenericGenerator(name = "attachementId", strategy = "increment")
	@GeneratedValue(generator = "attachementId")
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "SHOW_NAME")
	public String getShowName() {
		return showName;
	}

	public void setShowName(String showName) {
		this.showName = showName;
	}

	@Column(name = "REAL_NAME")
	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NEWS_ID", insertable = false, updatable = false)
	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

}
