package com.rathink.p.menu.service.impl;
import com.rathink.p.user.model.Role;
import com.rathink.p.user.model.User;
import com.rathink.p.user.model.RoleGroup;
import com.rathink.util.PropUtil;
import com.rathink.p.menu.model.Menu;
import com.rathink.p.menu.service.MenuManager;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.springframework.stereotype.Component;
import java.util.*;
import java.io.InputStream;

@Component
public class MenuManagerImpl implements MenuManager {
    private static final String MENU_ADMIN = "/setting/menu_training.cfg.xml";
    private static Document adminDocument;
    public List<Menu> getMenuListByUser(User user) {
        List<Menu> menuList = new ArrayList<Menu>();
        Set<Role> roleSet = new HashSet<Role>();
        for(RoleGroup roleGroup : user.getRoleGroupSet()) {
            roleSet.addAll(roleGroup.getRoleList());
        }
        Role role= new Role();//每个用户都默认带ROLE_USER这个权限
            role.setName("ROLE_USER");
            role.setLabel("普通用户");
            roleSet.add(role);
        Document document = getMenuDocumentByUser(user);
        @SuppressWarnings("unchecked")
		List<Node> newNodeList = document.selectNodes("/menus/menu");
        this.processMenuList(newNodeList, menuList,roleSet,user.getLocale());
        return menuList;
    }

    public static Document getMenuDocumentByUser(User user) {
        int type =0;
        if (type == 0) {
            if (adminDocument == null) {
                adminDocument = readDocument(MENU_ADMIN);
            }
            return adminDocument;
        } 
        return null;
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

    private void processMenuList(List<Node> nodeList, List<Menu> menuList, Set<Role> roleSet,Locale locale) {
        for (Node node : nodeList) {
            String[] roleNames = node.selectSingleNode("@roles").getText().split(",");
            if (this.checkRole(roleSet, roleNames)) {
                String url = node.selectSingleNode("@url").getText();
                String label = node.selectSingleNode("@label").getText();
                Menu menu = new Menu();
                menu.setId(String.valueOf(menuList.size()));
                menu.setUrl(url);
                menu.setLabel(PropUtil.getValue(locale, label));
                menuList.add(menu);
            }
        }
    }

    private boolean checkRole(Set<Role> roleSet, String[] roleNames) {
        for (Role role : roleSet) {
            for (String roleName : roleNames) {
                if (role.getName().equals("SUPER_M")||role.getName().equals(roleName.trim())) {
                    return true;
                }
            }
        }
        return false;
    }
}
