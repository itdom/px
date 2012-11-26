package com.rathink.util;

import java.util.Properties;
import java.util.Locale;
import java.io.InputStream;

/**
 * User: Kyll
 * Time: 2008-11-4 9:45:10
 */
public class PropUtil {
	public static final String SETTING="/setting/SettingDefault.properties";
	public static final String COMMON = "/ApplicationResources-common_zh_CN.properties";
    public static final Locale DEFAULT_LOCALE =  new Locale("zh_cn");
    public static final String EXPORT_COUPON="/excel/coupon.properties";
    public static final String LICENSE= "/setting/license.properties";

    public static String getLocalResourceValue(String key){
        String v = com.opensymphony.xwork2.util.LocalizedTextUtil.findDefaultText(key, DEFAULT_LOCALE);
        return v;
    }

    //在国际化资源文件中寻找，不必指定文件名了
	public static String getValue(Locale locale,String key) {
       String v = com.opensymphony.xwork2.util.LocalizedTextUtil.findDefaultText(key,locale);
        return v;
	}
   	public static String getValue(String fileName,String key) {
       String v = com.opensymphony.xwork2.util.LocalizedTextUtil.findDefaultText(key,DEFAULT_LOCALE);
        return v;
	}

    //在普通的property文件寻找，必须制定文件名
    public static String getProperyValue(String fileName, String key){
        String value = null;
		Properties p = new Properties();
		try {
			InputStream io = PropUtil.class.getResourceAsStream(fileName);
			p.load(io);
			io.close();
			value = p.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value == null ? key : value;
    }

	private PropUtil() {       
	}
}
