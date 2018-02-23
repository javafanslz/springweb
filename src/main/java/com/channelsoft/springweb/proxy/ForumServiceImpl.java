package com.channelsoft.springweb.proxy;

/**
 * <dl>
 * <dt> ForumServiceImpl</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/6</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ForumServiceImpl implements ForumService{

    @Override
    public void removeTopic(int topicId){
        PerformanceMonitor.begin("removeTopic");
        System.out.println("模拟删除topic"+topicId);
        try{
            Thread.sleep(20);
        }catch (Exception e){
            System.out.println("失败");
        }
        PerformanceMonitor.end();
    }

    @Override
    public void removeForum(int forumId){
        PerformanceMonitor.begin("removeForum");
        System.out.println("模拟删除forumId"+forumId);
        try{
            Thread.sleep(40);
        }catch (Exception e){
            System.out.println("失败");
        }
        PerformanceMonitor.end();
    }
}
