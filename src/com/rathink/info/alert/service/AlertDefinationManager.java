package com.rathink.info.alert.service;

import com.rathink.info.alert.model.AlertDefination;
import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-12-29
 * Time: 10:08:00
 * To change this template use File | Settings | File Templates.
 */
public interface AlertDefinationManager {
    public List<AlertDefination> AlertDefinationList();
    public Map<String,AlertDefination> AlertDefinationMap();
}
