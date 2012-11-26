package com.rathink.taglib;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;
import java.io.IOException;

public class PageTag extends TagSupport {

	private static final long serialVersionUID = 1L;

	private String namespace;
	private String action;
	private String url;
	private PageEntity bean;
	
	private String param="";
	private String href;
	
	private int pageStepStart;
	private int pageStepEnd;
	private int pageCount;
	
	private int nextPage;
	private int previousPage;
	private int nnextPage;
	private int ppreviousPage;
	
	public int doStartTag() {
		this.pageCount = this.bean.getPageCount();
		this.pageStepStart = this.bean.getPageStepStart();
		this.pageStepEnd = this.bean.getPageStepEnd();
		
		if (this.namespace != null) {
			HttpServletRequest request = (HttpServletRequest) this.pageContext.getRequest();
			this.href = request.getContextPath() + (this.namespace.startsWith("/") ? this.namespace : "/" + this.namespace) + (this.action.startsWith("/") ? this.action : "/" + this.action);
			this.href = this.href.split("\\.").length > 1 ?  this.href : this.href.replace(".", "") + ".action";
		} else {
			this.href = this.url;
		}
		
		StringBuffer paramBuf = new StringBuffer();
		paramBuf.append("&")
				.append(PageEntity.PARAM_NAME_PAGERECORDS)
				.append("=")
				.append(this.bean.getPageRecords())
				.append("&")
				.append(PageEntity.PARAM_NAME_PAGESTEP)
				.append("=")
				.append(this.bean.getPageStep());
		this.param = paramBuf.toString();
		
		if (this.pageCount != 0) {
			this.nextPage = this.bean.getNextPage();
			this.previousPage = this.bean.getPreviousPage();
			this.nnextPage = this.bean.getNnextPage();
			this.ppreviousPage = this.bean.getPpreviousPage();
		} else {
			this.nextPage = 1;
			this.previousPage = 1;
			this.nnextPage = 1;
			this.ppreviousPage = 1;
		}
		
		return TagSupport.EVAL_BODY_INCLUDE;
	}

	public int doEndTag() {
		JspWriter out = this.pageContext.getOut();
		try {
			out.print(this.getCssTag());
			out.print(this.getHtmlTag());
			out.print(this.getScriptTag());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return TagSupport.EVAL_PAGE;
	}
	
	private StringBuffer getCssTag() {
		StringBuffer cssBuf = new StringBuffer();
		cssBuf.append("<style>#tabpage a {text-decoration: none;} #tabpage a:link {color: #4D6185; text-decoration: none;} #tabpage a:hover {text-decoration: none;}</style>");
		return cssBuf;
	}

	private StringBuffer getHtmlTag() {
		StringBuffer htmlBuf = new StringBuffer();
		htmlBuf.append("<div id=\"tabpage\" style=\"display:inline-block;\"><ul style=\"padding:0; margin:0;\"><li style=\"display:inline; list-style-type:none; font-size:12px; color:#4D6185; font-family:'新宋体';\">")
			   .append("当前第")
			   .append(this.bean.getPageIndex())
			   .append("页/")
			   .append("共")
			   .append(this.pageCount)
			   .append("页&nbsp;每页")
			   .append(this.bean.getPageRecords())
			   .append("记录&nbsp;共")
			   .append(this.bean.getRecordCount())
			   .append("条记录");
		if (this.bean.getPageIndex() > 1) {
			htmlBuf.append("<a title=\"第一页\" href=\"")
			   .append(this.href)
			   .append("?")
			   .append(PageEntity.PARAM_NAME_PAGEINDEX)
			   .append("=")
			   .append(1)
			   .append(this.param)
			   .append("\" style=\"font-size:14px; margin-left:1px; margin-right:1px;\"><font face=\"Webdings\">7</font></a>");
		}
		if (this.pageStepStart > this.bean.getPageStep()) {
			htmlBuf.append("<a title=\"向前翻\" href=\"")
			   .append(this.href)
			   .append("?")
			   .append(PageEntity.PARAM_NAME_PAGEINDEX)
			   .append("=")
			   .append(this.ppreviousPage)
			   .append(this.param)
			   .append("\" style=\"font-size:14px; margin-left:1px; margin-right:1px;\"><font face=\"Webdings\">3</font></a>");
		}
		if (this.bean.getPageIndex() > 1) {
			htmlBuf.append("<a title=\"上-页\" href=\"")
			   .append(this.href)
			   .append("?")
			   .append(PageEntity.PARAM_NAME_PAGEINDEX)
			   .append("=")
			   .append(this.previousPage)
			   .append(this.param)
			   .append("\" style=\"font-size:14px; margin-left:1px; margin-right:1px;\"><font face=\"Webdings\">5</font></a>");
		}
		for (int i = this.pageStepStart; i < this.pageStepEnd; i++) {
			htmlBuf.append("<a id=\"pageindex_")
				   .append(i)
				   .append("\" href=\"")
				   .append(this.href)
				   .append("?")
				   .append(PageEntity.PARAM_NAME_PAGEINDEX)
				   .append("=")
				   .append(i)
				   .append(this.param)
				   .append("\" style=\"width:18px; height:16px; padding:0; margin-left:1px; margin-right:1px; border:1px solid #7F9DB9; font-size:12px; color:#4D6185; font-family:Arial; text-align:center;\">")
				   .append(i)
				   .append("</a>");
		}
		if (this.pageStepStart == this.pageStepEnd) {
			htmlBuf.append("<a id=\"pageindex_")
			   .append(this.bean.getPageIndex())
			   .append("\" href=\"")
			   .append(this.href)
			   .append("?")
			   .append(PageEntity.PARAM_NAME_PAGEINDEX)
			   .append("=")
			   .append(this.bean.getPageIndex())
			   .append(this.param)
			   .append("\" style=\"width:18px; height:16px; padding:0; margin-left:1px; margin-right:1px; border:1px solid #7F9DB9; font-size:12px; color:#4D6185; font-family:Arial; text-align:center;\">")
			   .append(this.bean.getPageIndex())
			   .append("</a>");
		}
		if (this.pageCount > 1) {
			htmlBuf.append("<a title=\"下-页\" href=\"")
				   .append(this.href)
				   .append("?")
				   .append(PageEntity.PARAM_NAME_PAGEINDEX)
				   .append("=")
				   .append(this.nextPage)
				   .append(this.param)
				   .append("\" style=\"font-size:14px; margin-left:1px; margin-right:1px;\"><font face=\"Webdings\">6</font></a>");
		}
		if (this.pageCount > this.pageStepEnd) {
			htmlBuf.append("<a title=\"向后翻\" href=\"")
				   .append(this.href)
				   .append("?")
				   .append(PageEntity.PARAM_NAME_PAGEINDEX)
				   .append("=")
				   .append(this.nnextPage)
				   .append(this.param)
				   .append("\" style=\"font-size:14px; margin-left:1px; margin-right:1px;\"><font face=\"Webdings\">4</font></a>");
		}
		if (this.bean.getPageIndex() < this.pageCount) {
			htmlBuf.append("<a title=\"尾页\" href=\"")
			   .append(this.href)
			   .append("?")
			   .append(PageEntity.PARAM_NAME_PAGEINDEX)
			   .append("=")
			   .append(this.pageCount)
			   .append(this.param)
			   .append("\" style=\"font-size:14px; margin-right:6px;\"><font face=\"Webdings\">8</font></a>");
		}
		htmlBuf.append("跳转到第<select onchange=\"onSelectPage(this);\" style=\"margin-left:4px; margin-right:4px;\"><option value=\"0\"></option>");
		int k = this.pageCount / this.bean.getPageStep();
        for(int j=0;j<=k;j++){
           htmlBuf.append("<option value=\"")
				   .append(j*this.bean.getPageStep()+ 1)
				   .append("\">")
				   .append(j*this.bean.getPageStep()+ 1)
				   .append("</option>");
        }
		/*for (int j = 0; j < this.pageCount; j += k > 0 ? k : 1) {
			htmlBuf.append("<option value=\"")
				   .append(j + 1)
				   .append("\">")
				   .append(j + 1)
				   .append("</option>");
		}*/
		htmlBuf.append("</select>页</li></ul></div>");
		return htmlBuf;
	}

	private StringBuffer getScriptTag() {
		StringBuffer scriptBuf = new StringBuffer();
		scriptBuf.append("<script>");
		if (this.pageCount != 0) {
			scriptBuf.append("document.getElementById('pageindex_")
					 .append(this.bean.getPageIndex())
					 .append("').style.backgroundColor = '#6ACADD';")
					 .append("document.getElementById('pageindex_")
					 .append(this.bean.getPageIndex())
					 .append("').style.color = '#FFFFFF';");
		}
		scriptBuf.append("function onSelectPage(obj) {document.location.href=\"")
				 .append(this.href)
				 .append("?")
				 .append(PageEntity.PARAM_NAME_PAGEINDEX)
				 .append("=\" + obj.value + \"").append(this.param)
				 .append("\";}</script>");
		return scriptBuf;
	}

	public String getNamespace() {
		return namespace;
	}

	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public PageEntity getBean() {
		return bean;
	}

	public void setBean(PageEntity bean) {
		this.bean = bean;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getParam() {
		return param;
	}

}
