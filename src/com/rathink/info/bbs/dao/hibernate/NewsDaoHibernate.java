package com.rathink.info.bbs.dao.hibernate;

/**
 * @author WuYingbo
 */

import com.rathink.common.hibernate.BaseDaoSupport;
import com.rathink.common.model.PageInfo;
import com.rathink.info.InfoConst;
import com.rathink.info.bbs.dao.NewsDao;
import com.rathink.info.bbs.model.Attachement;
import com.rathink.info.bbs.model.News;
import com.rathink.p.user.model.SimpleUser;
import com.rathink.taglib.PageEntity;
import com.rathink.util.AuthorizationUtil;

import org.hibernate.Query;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class NewsDaoHibernate extends BaseDaoSupport implements NewsDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<News> getNewsListByBoard(Integer boardId) {
		return this.getHibernateTemplate().find("FROM News n WHERE n.board.id = " + boardId + " ORDER BY n.id DESC");
	}

	@Override
	public void saveOrUpdate(News news) {
		this.getHibernateTemplate().saveOrUpdate(news);
	}

	@Override
	public News getNews(Integer newsId) {
		return (News) this.getHibernateTemplate().get(News.class, newsId);
	}

	@Override
	public void delete(News news) {
		this.getHibernateTemplate().delete(news);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<News> getNewsListBySchool(Integer branchId) {
		return this.getHibernateTemplate().find("FROM News n WHERE n.board.branch = " + branchId +" ORDER BY n.id DESC");
	}

	
	@Override
	public PageInfo getNewsListByBoard(Integer branchId, PageEntity pageEntity) {
		String queryString = "FROM News n WHERE n.board.id = ? ORDER BY n.id DESC";
		return this.getPageInfo(queryString, pageEntity, branchId);
	}

	@Override
	public int getCountByBoard(Integer branchId) {
		return ((Long) this.getHibernateTemplate().find("SELECT COUNT(n.id) FROM News n WHERE n.board = " + branchId).get(0)).intValue();
	}

	@Override
	public PageInfo getNewsListBySchool(Integer branchId, PageEntity pageEntity) {
		String queryString = "FROM News n WHERE n.board.branch = ? ORDER BY n.id DESC";
		return this.getPageInfo(queryString, pageEntity, branchId);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<News> getNewsListlatest(Integer branchId) {
//		Query query = this.getSession().createQuery("FROM News n WHERE n.board.branch= " + branchId + " and n.board.theType = 1" +" ORDER BY n.id DESC");
		Query query = this.getSession().createQuery("FROM News n WHERE n.board.branch= " + branchId + " and n.type = "+InfoConst.BBS_NEWS_TYPE_INNER_USER +" ORDER BY n.id DESC");
		query.setMaxResults(InfoConst.PORTLET_SIZE);
		return query.list();
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<News> getNewsListlatest(Integer branchid,
			List<Integer> ids) {
//		Query query = this.getSession().createQuery("FROM News n WHERE n.board.branch = ? and (n.board.theType = 2 or n.board.theType = 3) and n.type = 2 and n.board.clazzInstance.id in (:ids) ORDER BY n.id DESC");
		Query query = this.getSession().createQuery("SELECT n  FROM News n WHERE n.board.branch="+branchid+" AND n.type = "+InfoConst.BBS_NEWS_TYPE_ALL_STUDENT_USER+" ORDER BY n.id DESC");
        List<News> newsList=query.list();
        Query query1 = this.getSession().createQuery("SELECT n  FROM News n join n.clazzInstanceList cl WHERE n.type = "+InfoConst.BBS_NEWS_OUT_USER+" and cl.id in (:ids) ORDER BY n.id DESC");
		query1.setParameterList("ids", ids);
        List<News> newsList1=query1.list();
        if(newsList==null)newsList=new ArrayList<News>();
        newsList.addAll(newsList1);
        Collections.sort(newsList, new Comparator<News>() {
			public int compare(News o1, News o2){
				return o2.getId() - o1.getId();
			}
		});
        if(newsList.size()<=10)return newsList;
        else return newsList.subList(0,10);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Attachement> getAttachementList(Integer newsId) {
		return this.getHibernateTemplate().find("FROM com.rathink.info.bbs.model.Attachement a WHERE a.news.id = " + newsId);
	}

	@Override
	public void delete(Attachement atta) {
		this.getHibernateTemplate().delete(atta);
	}

	@Override
	public Attachement getAttachement(int attaId) {
		return (Attachement) this.getHibernateTemplate().get(Attachement.class, attaId);
	}

	@Override
	public PageInfo getNewsListByClazzInstance(Integer clazzInstanceId,
			PageEntity pageEntity) {
		SimpleUser user = AuthorizationUtil.getSimpleUser();
		String queryString = "SELECT n FROM News n JOIN n.clazzInstanceList cs WHERE (n.type ="+InfoConst.BBS_NEWS_TYPE_ALL_STUDENT_USER+" AND n.board.branch="+user.getBranch()+")  or (n.type ="+InfoConst.BBS_NEWS_OUT_USER+" and cs.id = ? )";
		return getPageInfo(queryString, pageEntity, clazzInstanceId);
	}

	@Override
	public PageInfo getNewsListByClazz(Integer userId, PageEntity pageEntity) {
		String queryString = "FROM News n WHERE n.user.id = ? AND n.type = "+InfoConst.BBS_NEWS_OUT_USER;
		return getPageInfo(queryString, pageEntity, userId);
	}



}
