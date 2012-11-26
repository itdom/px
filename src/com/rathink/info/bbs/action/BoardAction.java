package com.rathink.info.bbs.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import com.rathink.common.action.BaseAction;
@SuppressWarnings("serial")
@Component
@Scope("prototype")
public class BoardAction extends BaseAction { 
	
	public String menu() {
		 
		return SUCCESS;
	}
}
