package com.rathink.common.action;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import com.rathink.info.bbs.model.News;
import com.rathink.info.bbs.service.NewsManager;

/**
 * @author: wyb
 */
@SuppressWarnings("serial")
@Component
@Scope("prototype")
public class IgAction extends BaseAction {

	@Autowired
	private NewsManager newsManager;



	private List<News> list;





    public String igNewsToJson() {
			News  n1= this.newsManager.getNews(1);
			News  n2= this.newsManager.getNews(2);
			list.add(n1);
			list.add(n2);
		  return SUCCESS;
    }
       public String igMsgsToJson(){
        return SUCCESS;
    }

	public List<News> getList() {
		return list;
	}

	public void setList(List<News> list) {
		this.list = list;
	}
}
