package com.rathink.info.bbs.dao;

/**
 * @author WuYingbo
 */
import java.util.List;

import com.rathink.common.model.PageInfo;
import com.rathink.info.bbs.model.Attachement;
import com.rathink.info.bbs.model.News;
import com.rathink.taglib.PageEntity;

public interface NewsDao {

	public List<News> getNewsListByBoard(Integer boardId);

	public void saveOrUpdate(News news);

	public News getNews(Integer id);

	public void delete(News news);

	public List<News> getNewsListBySchool(Integer branchId);

	public PageInfo getNewsListByBoard(Integer boardId, PageEntity pageEntity);

	public int getCountByBoard(Integer boardId);

	public PageInfo getNewsListBySchool(Integer branchId, PageEntity pageEntity);

	public List<News> getNewsListlatest(Integer branchId);
	
	public List<News> getNewsListlatest(Integer branchid, List<Integer> ids);

	public List<Attachement> getAttachementList(Integer newsId);

	public void delete(Attachement atta);

	public Attachement getAttachement(int attaId);

	public PageInfo getNewsListByClazzInstance(Integer clazzInstanceId,
			PageEntity pageEntity);

	public PageInfo getNewsListByClazz(Integer userId, PageEntity pageEntity);

}
