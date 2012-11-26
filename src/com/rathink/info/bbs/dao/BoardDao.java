package com.rathink.info.bbs.dao;

/**
 * @author WuYingbo
 */
import com.rathink.info.bbs.model.Board;

import java.util.List;

public interface BoardDao {

	public List<Board> getBoardListBySchool(Integer schoolId);

	public void saveOrUpdate(Board board);

	public Board getBoard(Integer id);

	public void delete(Board board);

	public List<Board> getBoardListByStudent(Integer branchId);

}
