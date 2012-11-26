package com.rathink.info.alert.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;



/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-11-27
 * Time: 13:52:50
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "INFO_ALERT")
public class Alert {
     private Integer id;
     private Integer count;
     private Date dateTime;
     private Integer branchId;
     private Integer teachAreaId;
     private String alertType;
     private String alertName;
     private String content;
     private String amount;
     private String amountCount;
    @Id
    @GenericGenerator(name = "alertId", strategy = "increment")
    @GeneratedValue(generator = "alertId")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    @Column(name = "AMOUNTCOUNT")
    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
    @Column(name = "THEDATE")
    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
    @Column(name="BRANCH_ID")
    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }
   @Column(name="TEACH_AREA_ID")
   public Integer getTeachAreaId() {
        return teachAreaId;
    }

   public void setTeachAreaId(Integer teachAreaId) {
        this.teachAreaId = teachAreaId;
    }
    
    @Column(name="ALERT_TYPE")    
    public String getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }
    @Column(name="ALERT_NAME")
    public String getAlertName() {
        return alertName;
    }

    public void setAlertName(String alertName) {
        this.alertName = alertName;
    }
    @Column(name="CONTENT")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    @Column(name="AMOUNT")
    public String getAmount() {
        return amount;
    }

    public void setAmount(String ammount) {
        this.amount = ammount;
    }
    @Transient
    public String getAmountCount() {
        return amountCount;
    }

    public void setAmountCount(String amountCount) {
        this.amountCount = amountCount;
    }
}
