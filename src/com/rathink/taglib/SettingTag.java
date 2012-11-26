package com.rathink.taglib;

import com.rathink.p.user.model.User;
import com.rathink.util.AuthorizationUtil;
import com.rathink.util.StringUtil;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

public class SettingTag extends TagSupport
{
	private static final long serialVersionUID = 1L;
private String name;
  private String value;

  public int doStartTag()
    throws JspException
  {
    User user = AuthorizationUtil.getAuthorization();
    if (user == null)
    {
      return 0;
    }
    String values = user.getSettingValue(this.name);
    String[] vs1 = StringUtil.split(this.value, ',');
    String[] vs2 = StringUtil.split(values, ',');
    String[] arr = vs1;
    int len = arr.length;
    for (int i = 0; i < len; ++i)
    {
      String v1 = arr[i];
      String[] arr$ = vs2;
      int len$ = arr$.length;
      for (int i$ = 0; i$ < len$; ++i$)
      {
        String v2 = arr$[i$];
        if (v1.equals(v2))
        {
          return 1;
        }
      }

    }

    return 0;
  }

  public int doEndTag()
    throws JspException
  {
    this.name = "";
    this.value = "";
    return 6;
  }

  public String getName()
  {
    return this.name;
  }

  public void setName(String name)
  {
    this.name = name;
  }

  public String getValue()
  {
    return this.value;
  }

  public void setValue(String value)
  {
    this.value = value;
  }
}