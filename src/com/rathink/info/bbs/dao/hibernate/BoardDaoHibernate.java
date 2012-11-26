package com.rathink.info.bbs.dao.hibernate;

/**
 * @author WuYingbo
 */
import java.util.List;

import org.springframework.stereotype.Component;

import com.rathink.common.hibernate.BaseDaoSupport;
import com.rathink.info.bbs.dao.BoardDao;
import com.rathink.info.bbs.model.Board;

@Component
public class BoardDaoHibernate extends BaseDaoSupport implements BoardDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<Board> getBoardListBySchool(Integer schoolId) {
//		return this.getHibernateTemplate().find("FROM Board b WHERE b.branch.id = " + schoolId);
		return this.getHibernateTemplate().find("FROM Board b WHERE b.branch = " + schoolId);
	}

	@Override
	public void saveOrUpdate(Board board) {
		this.getHibernateTemplate().saveOrUpdate(board);
	}

	@Override
	public Board getBoard(Integer boardId) {
		return (Board)this.getHibernateTemplate().get(Board.class, boardId);
	}

	@Override
	public void delete(Board board) {
		this.getHibernateTemplate().delete(board);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Board> getBoardListByStudent(Integer branchId) {
		return this.getHibernateTemplate().find("FROM Board b WHERE b.theType = 2 AND b.branch = " + branchId);
//		return this.getHibernateTemplate().find("FROM Board b WHERE b.theType = 2 AND b.branch.id = " + branchId);
	}

}
