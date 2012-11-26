package com.rathink.taglib;

import java.io.IOException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

public class AdjunctTag extends TagSupport
{
  private static final long serialVersionUID = 1L;
  private boolean single;
  private String name;
  private String width;
  private String height;
  private String style;

  public int doEndTag()
  {
    JspWriter out = this.pageContext.getOut();
    StringBuffer tagBuf = new StringBuffer();
    StringBuffer styleBuf = new StringBuffer();
    tagBuf.append("<input type=\"file\" name=\"")
      .append(this.name)
      .append("\"");
    if (((this.width != null) && (!(this.width.equals("")))) || ((this.height != null) && (!(this.height.equals("")))) || ((this.style != null) && (!(this.style.equals(""))))) {
      tagBuf.append(" style=\"");
      styleBuf.append(" style='");
    }
    if ((this.width != null) && (!(this.width.equals("")))) {
      tagBuf.append("width:")
        .append(this.width);
      styleBuf.append("width:")
        .append(this.width);
      if (this.width.indexOf("%") != -1) {
        tagBuf.append("px");
        styleBuf.append("px");
      }
      tagBuf.append(";");
      styleBuf.append(";");
    }
    if ((this.height != null) && (!(this.height.equals("")))) {
      tagBuf.append("height:")
        .append(this.height);
      styleBuf.append("height:")
        .append(this.height);
      if (this.height.indexOf("%") != -1) {
        tagBuf.append("px");
        styleBuf.append("px");
      }
      tagBuf.append(";");
      styleBuf.append(";");
    }
    if (((this.width != null) && (!(this.width.equals("")))) || ((this.height != null) && (!(this.height.equals("")))) || ((this.style != null) && (!(this.style.equals(""))))) {
      tagBuf.append("\"");
      styleBuf.append("'");
    }
    tagBuf.append("/>");
    if (!(this.single)) {
      tagBuf.append("<input type=\"button\" value=\"添加\" onclick=\"addAdjunct(this.parentNode);\"/>");
    }
    tagBuf.append("<script type=\"text/javascript\">")
      .append("function addAdjunct(parentTag){var tagStr=\"<div><input type='file' name='")
      .append(this.name)
      .append("' ")
      .append(styleBuf)
      .append("/><input type='button' value='删除' onclick='delAdjunct(this.parentNode);'/></div>\";parentTag.insertAdjacentHTML(\"beforeEnd\", tagStr);}")
      .append("function delAdjunct(obj){obj.parentNode.removeChild(obj);}")
      .append("</script>");
    try {
      out.println(tagBuf);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return 6;
  }

  public boolean isSingle()
  {
    return this.single;
  }

  public void setSingle(boolean single) {
    this.single = single;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getWidth() {
    return this.width;
  }

  public void setWidth(String width) {
    this.width = width;
  }

  public String getHeight() {
    return this.height;
  }

  public void setHeight(String height) {
    this.height = height;
  }

  public String getStyle() {
    return this.style;
  }

  public void setStyle(String style) {
    this.style = style;
  }
}