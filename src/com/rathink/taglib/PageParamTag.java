package com.rathink.taglib;

import javax.servlet.jsp.tagext.TagSupport;

public class PageParamTag extends TagSupport {

	private static final long serialVersionUID = 1L;
	
	private String name;
	private String value;
	
	public int doEndTag() {
		PageTag pageTag = (PageTag) this.getParent();
		if (this.name != null && ! this.name.equals("")) {
			StringBuffer paramBuf = new StringBuffer();
			if(pageTag.getParam()==null||"".equals(pageTag.getParam())){
				paramBuf.append("&").append(this.name).append("=").append(this.value);
			}else {
				paramBuf.append("&").append(this.name).append("=").append(this.value);
				//paramBuf.append(pageTag.getParam()).append("&").append(this.name).append("=").append(this.value);
			}
			pageTag.setParam(paramBuf.toString());
		}
		return TagSupport.EVAL_PAGE;
	}

	// 
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
