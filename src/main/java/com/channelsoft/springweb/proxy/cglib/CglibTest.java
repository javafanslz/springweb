package com.channelsoft.springweb.proxy.cglib;

import com.channelsoft.springweb.proxy.ForumServiceImpl;
import net.sf.cglib.core.DebuggingClassWriter;

/**
 * <dl>
 * <dt> CglibTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CglibTest {
    public static void main(String[] args){
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "F:\\code");
        CglibProxy cglibProxy = new CglibProxy();
        ForumServiceImpl forumService =(ForumServiceImpl) cglibProxy.getProxy(ForumServiceImpl.class);
        forumService.removeForum(1000);
       // forumService.removeTopic(101010);
    }
}
