package com.rathink.common.action;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.util.ServletContextAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;
import com.rathink.p.user.model.User;
import com.rathink.common.model.PageInfo;
import com.rathink.taglib.PageEntity;
import com.rathink.util.AuthorizationUtil;

public class BaseAction extends ActionSupport implements ServletContextAware, ServletRequestAware, ServletResponseAware, Preparable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected ServletContext servletContext;
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	protected User myUser;
    protected String dispatcher;
    protected PageInfo pageInfo;
    protected PageEntity pageEntity;
    
    protected String otherTeachAreaName;
    protected String otherTeachAreaIds;
    public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	public ServletContext getServletContext() {
		return servletContext;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public User getMyUser() {
		return myUser;
	}

	public void setMyUser(User myUser) {
		this.myUser = myUser;
	}

	 
    public String getOtherTeachAreaName() {
        return otherTeachAreaName;
    }

    public void setOtherTeachAreaName(String otherTeachAreaName) {
        this.otherTeachAreaName = otherTeachAreaName;
    }

    public String getOtherTeachAreaIds() {
        return otherTeachAreaIds;
    }

    public void setOtherTeachAreaIds(String otherTeachAreaIds) {
        this.otherTeachAreaIds = otherTeachAreaIds;
    }

    public String getDispatcher() {
        return dispatcher;
    }

    public void setDispatcher(String dispatcher) {
        this.dispatcher = dispatcher;
    }

    public PageInfo getPageInfo() {
        return pageInfo;
    }

    public void setPageInfo(PageInfo pageInfo) {
        this.pageInfo = pageInfo;
    }

    public PageEntity getPageEntity() {
        return pageEntity;
    }

    public void setPageEntity(PageEntity pageEntity) {
        this.pageEntity = pageEntity;
    }

	public void prepare() throws Exception {
		myUser = AuthorizationUtil.getAuthorization();
		
	}
 
}
