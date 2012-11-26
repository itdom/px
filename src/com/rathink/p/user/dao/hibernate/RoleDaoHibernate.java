package com.rathink.p.user.dao.hibernate;

import com.rathink.common.hibernate.BaseDaoSupport;
import com.rathink.common.model.PageInfo;
import com.rathink.p.user.dao.RoleDao;
import com.rathink.p.user.model.Role;
import com.rathink.taglib.PageEntity;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.List;

@Component
public class RoleDaoHibernate extends BaseDaoSupport implements RoleDao {
	@SuppressWarnings("unchecked")
	public List<Role> getRoleListByRelated(Integer thetype) {
		return getHibernateTemplate().find("from Role r where r.related like '%" + thetype + "%'");
	}

	@SuppressWarnings("unchecked")
	public List<Role> getRoleList() {
		return getHibernateTemplate().find("from Role");
	}

	public PageInfo getRoleList(PageEntity pageEntity) {
		String queryString = "from Role";
		return this.getPageInfo(queryString, pageEntity);
	}

	@SuppressWarnings("unchecked")
	public List<Role> getRoleList(final int start, final int max) {
		return getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery("from Role");
				query.setFirstResult(start);
				query.setMaxResults(max);
				return query.list();
			}
		});
	}

	public int getRoleCount() {
		return ((Long) getHibernateTemplate()
				.find("select count(id) from Role").get(0)).intValue();
	}

	public Role getRole(Integer id) {
		return (Role) getHibernateTemplate().get(Role.class, id);
	}

	@SuppressWarnings("unchecked")
	public Role getRole(String name) {
		List<Role> roleList = getHibernateTemplate().find("from Role r where r.name = '" + name + "'");
		if (roleList == null || roleList.size() == 0) {
			return null;
		}
		return roleList.get(0);
	}

	public void saveRole(Role role) {
		getHibernateTemplate().save(role);
	}

	public void updateRole(Role role) {
		try {
			getHibernateTemplate().update(role);
		} catch (Exception e) {
			getHibernateTemplate().merge(role);
		}
	}

	public void deleteRole(Integer id) {
		getHibernateTemplate().delete(getRole(id));
	}
}
