package com.rathink.p.user.dao.hibernate;

import com.rathink.common.hibernate.BaseDaoSupport;
import com.rathink.p.user.PConst;
import com.rathink.p.user.dao.UserDao;
import com.rathink.p.user.model.*;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

/**
 * User: Kyll
 * Time: 2008-6-24 8:53:48
 */
public class UserDaoHibernate extends BaseDaoSupport implements UserDao, UserDetailsService {	
	
	public User getUser(Integer id) {
	   return (User) getHibernateTemplate().get(User.class, id);
}
@SuppressWarnings("unchecked")
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
 
	final String sql;
	if (username.endsWith(",")) {
		sql = "select u.ID from P_USER u where  u.USERNAME = '" + username.split(",")[0] + "'";
	} else {
		sql = "select u.ID from P_USER u  where u.USERNAME = '" + username.split(",")[0] + "'";
	}
	List<User> users = getHibernateTemplate().executeFind(new HibernateCallback() {
		public Object doInHibernate(Session session) throws HibernateException, SQLException {
			SQLQuery query = session.createSQLQuery(sql);
			List list = query.list();
			List<User> userList = new ArrayList<User>();
			for (Object object : list) {
				User user = new User();
				user.setId((Integer) object);
				userList.add(user);
			}
			return userList;
		}
	});
	if (users.isEmpty()) {
        throw new UsernameNotFoundException("user '" + username + "' not found...");
	} else {
		User user = this.getUser(users.get(0).getId());
        Set<Role> roleSet = new HashSet<Role>();
		Set<RoleGroup> roleGroupSet = user.getRoleGroupSet();
		for(RoleGroup roleGroup : roleGroupSet) {
		   roleSet.addAll(roleGroup.getRoleList());
		}
		return user;
	}
}
 

}
