package com.rathink.p.account.model;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2010-1-26
 * Time: 21:48:51
 * To change this template use File | Settings | File Templates.
 */
public class License {
    private String serial;
    private Integer userAmount;
    private Integer teachAreaAmount;
    private Integer branchAmount;
    private String extend;
    private Date endDate;
    private String validateKey;
    private String mode;
    private int passed = 1; //1 透过  -1  非法  -2 过期
    public Integer getUserAmount() {
        return userAmount;
    }

    public void setUserAmount(Integer userAmount) {
        this.userAmount = userAmount;
    }

    public Integer getTeachAreaAmount() {
        return teachAreaAmount;
    }

    public void setTeachAreaAmount(Integer teachAreaAmount) {
        this.teachAreaAmount = teachAreaAmount;
    }

    public Integer getBranchAmount() {
        return branchAmount;
    }

    public void setBranchAmount(Integer branchAmount) {
        this.branchAmount = branchAmount;
    }

    public String getExtend() {
        return extend;
    }

    public void setExtend(String extend) {
        this.extend = extend;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getValidateKey() {
        return validateKey;
    }

    public void setValidateKey(String validateKey) {
        this.validateKey = validateKey;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public int getPassed() {
        return passed;
    }

    public void setPassed(int passed) {
        this.passed = passed;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }
}
