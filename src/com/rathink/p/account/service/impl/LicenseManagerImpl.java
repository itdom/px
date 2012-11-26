package com.rathink.p.account.service.impl;

import java.util.Calendar;
import java.util.Date;

import com.rathink.p.account.model.License;
import com.rathink.p.account.service.LicenseManager;
import com.rathink.util.PropUtil;
import com.rathink.util.DateUtil;
import com.rathink.util.MD5Encode;
import com.rathink.util.StringUtil;


import LONGMAI.NoxKey;

/**
 * Created by IntelliJ IDEA.
 * User: sjp
 * Date: 2010-1-11
 * Time: 10:41:46
 */
/*@Component*/
public class LicenseManagerImpl implements LicenseManager {
    public static License license = new License();
    /* (non-Javadoc)
	 * @see com.rathink.p.account.service.impl.LicenseManager#licenseFile()
	 */
    public void licenseFile() throws Exception {
        System.out.println("init Method");
        this.load();
        String mode = license.getMode();
        //安装
        if(mode.startsWith("key")){
            this.verification(mode,"A2010D2011B0518F");
        }
        this.licenseSafety();
    }

    private void licenseSafety(){
        String strInfor = license.getMode() + license.getUserAmount() +
                license.getTeachAreaAmount() +
                license.getBranchAmount()+
                license.getExtend()+
                license.getEndDate() +
                license.getSerial();
        MD5Encode md5 = new MD5Encode();
        String md5Str = md5.MD5Encode(strInfor);
        System.out.println(StringUtil.random(6,4)+md5Str+StringUtil.random(6,4));
        if(!md5Str.equals(license.getValidateKey())){
            license.setPassed(-1);
        }
    }

    private void verification(String mode,String str)throws Exception{
         byte[] rBuff = new byte [16];
         int[] keyHandles =  new int[8];
		 int[] nKeyNum = new int[1];
         String[] values = null;
         if(mode.indexOf("_")>0){
             values = mode.split("_");
         }
         if(values!=null&&values.length>=2){
            NoxKey nk = new NoxKey();
            if(0==nk.NoxFind(0x20100500,keyHandles,nKeyNum)){
                if(0==nk.NoxOpen(keyHandles[0],values[1])){
                     int nRtn = nk.NoxReadStorage(keyHandles[0], rBuff);
                     if(nRtn != 0){
                         license.setPassed(-4);
                     }
                     StringBuffer sb2 = new StringBuffer(rBuff.length);
                     for(int i=0;i<rBuff.length;i++){
                         sb2.append((char)rBuff[i]);
                     }
                     if (!str.equals(sb2.toString())){
                         license.setPassed(-4);
                     }
                     nk.NoxClose(keyHandles[0]);
                 }else{
                    license.setPassed(-4);
                }
             }else{
                 license.setPassed(-3);
             }
         }else{
             license.setPassed(-1);
         }
    }

    /* (non-Javadoc)
	 * @see com.rathink.p.account.service.impl.LicenseManager#load()
	 */
    public void load() {
        license.setSerial(PropUtil.getProperyValue(PropUtil.LICENSE, "serial"));
        license.setUserAmount(Integer.parseInt(PropUtil.getProperyValue(PropUtil.LICENSE, "userAmount")));
        license.setTeachAreaAmount(Integer.parseInt(PropUtil.getProperyValue(PropUtil.LICENSE, "teachAreaAmount")));
        license.setBranchAmount(Integer.parseInt(PropUtil.getProperyValue(PropUtil.LICENSE, "branchAmount")));
        license.setExtend(PropUtil.getProperyValue(PropUtil.LICENSE, "extend"));
        license.setEndDate(DateUtil.parseDate(PropUtil.getProperyValue(PropUtil.LICENSE, "endDate")));
        license.setValidateKey(PropUtil.getProperyValue(PropUtil.LICENSE, "validateKey"));
        license.setMode(PropUtil.getProperyValue(PropUtil.LICENSE, "mode"));
    }

    public static License getLicense(){
       return license;
    }

    //验证是否过期
    public static void licenseDate(){
        Date endDate = LicenseManagerImpl.getLicense().getEndDate();
        Calendar cd = Calendar.getInstance();
        cd.setTime(DateUtil.getSimpleCurrentDate());
        if(DateUtil.compareDate(endDate,cd)<0){
            LicenseManagerImpl.getLicense().setPassed(-2);
        }
    }
}
