package com.rathink.info.alert.service.impl;

import org.springframework.stereotype.Component;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2010-1-8
 * Time: 15:56:26
 * To change this template use File | Settings | File Templates.
 */
@Component
public class AlertHandler {

    public void getAlertHandler() {
        this.saveOrUpdateCountAmount();
    }

    public void saveOrUpdateCountAmount() {
        Thread tr = new AlertTest();
        tr.start();
    }

    class AlertTest extends Thread { }
}