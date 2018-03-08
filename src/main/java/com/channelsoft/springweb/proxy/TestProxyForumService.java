package com.channelsoft.springweb.proxy;

import com.sun.org.apache.xpath.internal.FoundIndex;

import java.lang.reflect.Proxy;

/**
 * <dl>
 * <dt> TestProxyForumService</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/6</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestProxyForumService {
    public static void main(String[] args){
        ForumService forumService = new ForumServiceImpl();
        System.out.println(forumService.getClass().getInterfaces()[0].getName());
        PerformanceHandler handler = new PerformanceHandler(forumService);
        ForumService proxy = (ForumService) Proxy.newProxyInstance(forumService.getClass().getClassLoader(),forumService.getClass().getInterfaces(),handler);
        proxy.removeForum(101010);
        proxy.removeTopic(90990);
    }
}
