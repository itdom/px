package com.rathink.common.model;

import java.util.List;

import com.rathink.taglib.PageEntity;

/**
 * @author: wyb
 */
public class PageInfo {

	private int count;

	private PageEntity pageEntity;

	private List list;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public PageEntity getPageEntity() {
		return pageEntity;
	}

	public void setPageEntity(PageEntity pageEntity) {
		this.pageEntity = pageEntity;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

}
