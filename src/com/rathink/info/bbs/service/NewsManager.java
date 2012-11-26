package com.rathink.info.bbs.service;

/**
 * @author WuYingbo
 */
import java.util.List;

import com.rathink.info.bbs.model.Board;
import com.rathink.info.bbs.model.News;

public interface NewsManager {

	public List<News> getNewsListByBoard(Board board);

	public void saveOrUpdate(News news);

	public News getNews(Integer id);


}
