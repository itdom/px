package com.rathink.taglib;

import com.rathink.p.user.model.User;
import com.rathink.util.AuthorizationUtil;

import javax.servlet.jsp.tagext.TagSupport;

/**
 * Created by IntelliJ IDEA.
 * User: ming
 * Date: 2010-10-18
 * Time: 15:18:13
 * To change this template use File | Settings | File Templates.
 */
@SuppressWarnings("serial")
public class UserTag extends TagSupport {
    private String type;
    public String getType(){
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int doStartTag() throws javax.servlet.jsp.JspException {
        User user = AuthorizationUtil.getAuthorization();
        if (user == null)
            return 0;
        if(this.type.equals(""+user.getType())){
            return 1;
        }
        return 0;
    }
}
