package com.rathink.util;

import org.apache.struts2.util.StrutsTypeConverter;

import java.util.Map;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

/**
 * Created by IntelliJ IDEA.
 * User: ming
 * Date: 2010-12-15
 * Time: 17:20:04
 * To change this template use File | Settings | File Templates.
 */
public class DateConverterUtil extends StrutsTypeConverter {
    private static String DATE_FORMAT_IE="yyyy-MM-dd";
    private static String DATE_FORMAT_FF="yy/MM/dd";
    private static String DATE_TIME_FORMAT_IE="yyyy-MM-dd HH:mm";
    private static String DATE_TIME_FORMAT_FF="yy/MM/dd HH:mm";
    @Override
    public Object convertFromString(Map map, String[] values, Class toClass) {
        Date date=null;
        String dateString;
        if(values!=null && values.length>0){
            dateString=values[0];
            if(dateString!=null){
                SimpleDateFormat format;
                //匹配IE浏览器
                if(dateString.indexOf(":")==-1){
                    format = new SimpleDateFormat(DATE_FORMAT_IE);
                }else{
                    format = new SimpleDateFormat(DATE_TIME_FORMAT_IE);
                }
                try{
                    date=format.parse(dateString);
                }catch(ParseException e){
                    date=null;
                }
                //匹配FF浏览器
                if(date==null){
                    if(dateString.indexOf(":")==-1){
                        format = new SimpleDateFormat(DATE_FORMAT_FF);
                    }else{
                        format = new SimpleDateFormat(DATE_TIME_FORMAT_FF);
                    }
                    try{
                        date=format.parse(dateString);
                    }catch(ParseException e){
                        date=null;  
                    }
                }
            }
        }
        return date;
    }

    @Override
    public String convertToString(Map map, Object o) {
        return DateUtil.formatDateTime((Date)o);
    }
}
