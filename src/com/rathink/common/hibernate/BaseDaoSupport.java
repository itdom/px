package com.rathink.common.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Component;

import com.rathink.common.model.PageInfo;
import com.rathink.taglib.PageEntity;

/**
 * @author wyb
 */
@Component
public class BaseDaoSupport extends HibernateDaoSupport {

	@Autowired
    public void MyHibernateDaoSupport(@Qualifier("sessionFactory")SessionFactory sessionFactory) {
        this.setSessionFactory(sessionFactory);
    }

	@SuppressWarnings("unchecked")
	public <T> List<T> cacheList(Query query) {
		List<T> list = new ArrayList<T>();
		Iterator<T> it = query.iterate();
		while (it.hasNext()) {
			list.add(it.next());
		}
		return list;
	}

	public PageInfo getPageInfo(String queryString, PageEntity pageEntity, Object... params) {
		if (pageEntity == null) {
			pageEntity = new PageEntity();
		}
		Query listQuery = this.getSession().createQuery(queryString);
		String tempSql = queryString.trim().toUpperCase();
		if (tempSql.startsWith("SELECT")) {
			queryString = queryString.substring(tempSql.indexOf("FROM"));
		}
        Query countQuery =null;
        if(tempSql.indexOf("DISTINCT")!=-1){
            if(tempSql.startsWith("FROM")){
                countQuery=this.getSession().createQuery("SELECT COUNT(*) " + queryString);
            }else{
                if(tempSql.split("FROM")[0].indexOf("DISTINCT")!=-1){
                    String tem=tempSql.substring(tempSql.indexOf("DISTINCT"),tempSql.indexOf("FROM")).toLowerCase();
                    if(tem.indexOf("ID")==-1)tem=tem+".id";
                    countQuery=this.getSession().createQuery("SELECT COUNT("+tem+")" + queryString);
                }else{
                    String tt=tempSql.substring(tempSql.indexOf("FROM")+4,tempSql.length());
                    countQuery=this.getSession().createQuery("SELECT COUNT(*) " + tt);
                }
            }
        }else{
           countQuery=this.getSession().createQuery("SELECT COUNT(*) " + queryString);
        }
		int i = 0;
		for (Object param : params) {
			listQuery.setParameter(i, param);
			countQuery.setParameter(i, param);
			i++;
		}
		listQuery.setFirstResult(pageEntity.getRecordIndex());
		listQuery.setMaxResults(pageEntity.getPageRecords());
		List list = listQuery.list();
		PageInfo info = new PageInfo();
		if (list != null && ! list.isEmpty()) {
			info.setList(list);
		}
		info.setCount(((Long)countQuery.uniqueResult()).intValue());
		pageEntity.setRecordCount(info.getCount());
		info.setPageEntity(pageEntity);
		return info;
	}

	public PageInfo getPageInfo(String queryString, int first, int max, Object... params) {
		Query listQuery = this.getSession().createQuery(queryString);
		String tempSql = queryString.trim().toUpperCase();
		if (tempSql.startsWith("SELECT")) {
			queryString = queryString.substring(tempSql.indexOf("FROM"));
		}
		Query countQuery =null;
        if (tempSql.indexOf("DISTINCT")!=-1) {
			 countQuery = this.getSession().createQuery("SELECT COUNT( " +queryString+")");
		}else{
            countQuery = this.getSession().createQuery("SELECT COUNT(*) " + queryString);
        }
		int i = 0;
		for (Object param : params) {
			listQuery.setParameter(i, param);
			countQuery.setParameter(i, param);
			i ++;
		}
		listQuery.setFirstResult(first);
		listQuery.setMaxResults(first);
		List list = listQuery.list();
		PageInfo info = new PageInfo();
		if (list != null && ! list.isEmpty()) {
			info.setList(list);
		}
		info.setCount(((Long)countQuery.uniqueResult()).intValue());
		return info;
	}

	public PageInfo getPageInfoBySql(String queryString, PageEntity pageEntity, Object... params) {
		SQLQuery listQuery = this.getSession().createSQLQuery(queryString);
		String tempSql = queryString.trim().toUpperCase();
		if (tempSql.startsWith("SELECT")) {
			queryString = queryString.substring(tempSql.indexOf("FROM"));
		}
		SQLQuery countQuery = this.getSession().createSQLQuery("SELECT COUNT(*) " + queryString);
		int i = 0;
		for (Object param : params) {
			listQuery.setParameter(i, param);
			countQuery.setParameter(i, param);
			i ++;
		}
		listQuery.setFirstResult(pageEntity.getRecordIndex());
		listQuery.setMaxResults(pageEntity.getPageRecords());
		List list = listQuery.list();
		PageInfo info = new PageInfo();
		if (list != null && ! list.isEmpty()) {
			info.setList(list);
		}
		info.setCount(((Long)countQuery.uniqueResult()).intValue());
		return info;
	}

	public PageInfo getPageInfoBySql(String queryString, int first,
			int max, Object... params) {
		SQLQuery listQuery = this.getSession().createSQLQuery(queryString);
		String tempSql = queryString.trim().toUpperCase();
		if (tempSql.startsWith("SELECT")) {
			queryString = queryString.substring(tempSql.indexOf("FROM"));
		}
		SQLQuery countQuery = this.getSession().createSQLQuery("SELECT COUNT(*) " + queryString);
		int i = 0;
		for (Object param : params) {
			listQuery.setParameter(i, param);
			countQuery.setParameter(i, param);
			i ++;
		}
		listQuery.setFirstResult(first);
		listQuery.setMaxResults(max);
		List list = listQuery.list();
		PageInfo info = new PageInfo();
		if (list != null && ! list.isEmpty()) {
			info.setList(list);
		}
		info.setCount(((Long)countQuery.uniqueResult()).intValue());
		return info;
	}
}
