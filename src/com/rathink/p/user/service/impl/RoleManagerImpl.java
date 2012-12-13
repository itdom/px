package com.rathink.p.user.service.impl;

import com.rathink.p.user.model.Role;
import com.rathink.p.user.service.RoleManager;
import com.rathink.util.PropUtil;
import org.springframework.stereotype.Component;
import org.dom4j.io.SAXReader;
import org.dom4j.DocumentException;
import org.dom4j.Document;
import org.dom4j.Node;


import java.util.*;
import java.io.InputStream;
@Component
public class RoleManagerImpl implements RoleManager {
    public static Map<String,Role> roleMap = new LinkedHashMap<String,Role>();
    //存储role的xml文件
    public static final String ROLES_MODELS = "/setting/roles.xml";
    @SuppressWarnings("unchecked")
	public void initRole(){
        //读取rolos.xml
        Document document = readDocument(ROLES_MODELS);
        List<Node> nodeList = document.selectNodes("/roleSetting/roles/role");
        for(Node node : nodeList){
            Role role = new Role();
            String name = node.selectSingleNode("@name").getText();
            String label = node.selectSingleNode("@label").getText();
            String module=node.selectSingleNode("@module").getText();
            role.setName(name);
            role.setFullName(label);
            role.setModule(module);
            //把每个role放在roleMap中
            roleMap.put(name,role);
        }
    }


    public static Document readDocument(String fileName) {                     //读取xml文件中的内容放在Document中
        InputStream io = PropUtil.class.getResourceAsStream(fileName);
        org.dom4j.Document doc = null;
        try {
            doc = new SAXReader().read(io);
        } catch (DocumentException e) {
            e.printStackTrace();
            System.out.println("读取权限xml文件出错");
        }
        return doc;

    }

     @SuppressWarnings("unchecked")
	public static List<Role> getRolesByRoleGroup(String roles){
        List<Role> roleList=new ArrayList<Role>();
        Document document = readDocument(ROLES_MODELS);
        List<Node> nodeList = document.selectNodes("/roleSetting/roles/role");
        for(String str:roles.split(",")){
            for(Node node : nodeList){
                String name = node.selectSingleNode("@name").getText();
                if(name.equals(str)){
                    Role role = new Role();
                    String label = node.selectSingleNode("@label").getText();
                    String module=node.selectSingleNode("@module").getText();
                    role.setName(name);
                    role.setFullName(label);
                    role.setModule(module);
                    roleList.add(role);
                    break;
                }
            }
        }
        return roleList;
    }
}