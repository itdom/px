package com.rathink.info.alert.service.impl;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.*;

import com.rathink.util.PropUtil;
import com.rathink.util.AuthorizationUtil;
import com.rathink.info.alert.model.AlertDefination;
import com.rathink.info.alert.service.AlertDefinationManager;

/**
 * Created by IntelliJ IDEA.
 * User: JN
 * Date: 2009-12-29
 * Time: 10:07:13
 * To change this template use File | Settings | File Templates.
 */
@Component
public class AlertDefinationManagerImpl implements AlertDefinationManager {
    private static final String alert="/setting/InfoAlert.xml";

     public List<AlertDefination> AlertDefinationList(){
         List<AlertDefination> alertDefinationList = new ArrayList<AlertDefination>();
        Document document = readDocument(alert);
        @SuppressWarnings("unchecked")
		List<Node> nodeList = document.selectNodes("/alertDefinations/alertDefination");
        return  processMenuList(nodeList,alertDefinationList, AuthorizationUtil.getAuthorization().getLocale()); 
     }
    public Map<String,AlertDefination>  AlertDefinationMap(){
        Map<String,AlertDefination>  alertDefinationMap = new LinkedHashMap<String,AlertDefination>();
        Document document = readDocument(alert);
        @SuppressWarnings("unchecked")
		List<Node> nodeList = document.selectNodes("/alertDefinations/alertDefination");
       return  processMenuMap(nodeList,alertDefinationMap,new Locale("zh","CN"));
    }
    public static Document readDocument(String fileName) {
        InputStream io = PropUtil.class.getResourceAsStream(fileName);
        Document doc = null;
        try {
            doc = new SAXReader().read(io);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return doc;

    }

      private List<AlertDefination> processMenuList(List<Node> nodeList, List<AlertDefination> alertDefinationList, Locale locale) {
        for (Node node : nodeList) {
                String name = node.selectSingleNode("@name").getText();
                String label = node.selectSingleNode("@label").getText();
                String branchType=node.selectSingleNode("@branchType").getText();
                String roles=node.selectSingleNode("@roles").getText();
                AlertDefination alertDefination = new AlertDefination();
                alertDefination.setId(String.valueOf(alertDefinationList.size()));
                alertDefination.setName(name);
                alertDefination.setLabel(label);
                alertDefination.setBranchType(branchType);
                alertDefination.setRoles(roles);
                alertDefinationList.add(alertDefination);
        }
         return alertDefinationList;
    }
   private Map<String,AlertDefination> processMenuMap(List<Node> nodeList,Map<String,AlertDefination>alertDefinationMap, Locale locale){
       for (Node node : nodeList) {
            String name = node.selectSingleNode("@name").getText();
            String label = node.selectSingleNode("@label").getText();
            String checkType=node.selectSingleNode("@checkType").getText();
            AlertDefination alertDefination = new AlertDefination();
            alertDefination.setId(String.valueOf(alertDefinationMap.size()));
            alertDefination.setName(name);
            alertDefination.setLabel(PropUtil.getValue(locale, label));
            alertDefination.setCheckType(checkType);
            alertDefinationMap.put(name,alertDefination);
       }
       return  alertDefinationMap;
   }
}
