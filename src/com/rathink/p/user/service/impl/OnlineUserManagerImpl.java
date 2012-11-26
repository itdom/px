package com.rathink.p.user.service.impl;

import com.rathink.p.user.service.OnlineUserManager;
import com.rathink.p.user.model.User;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * Created by IntelliJ IDEA.
 * User: ming
 * Date: 2011-1-5
 * Time: 17:16:50
 * To change this template use File | Settings | File Templates.
 */
@Component
public class OnlineUserManagerImpl implements OnlineUserManager {
    private Map<Integer, List<User>> userMap=new HashMap<Integer, List<User>>();

    @Override
    public void saveOnlineUser(User user) { }

    @Override
    public void deleteOnlineUser(User user) { }

    public List<User> getOnlineUserList(Integer id){
    	return  userMap.get(id);
    }
}
