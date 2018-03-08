package com.channelsoft.springweb.quartz;

/**
 * <dl>
 * <dt> QuartzTargetObject</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/1</dd>
 * </dl>
 *
 * @author lizhu
 */
public class QuartzTargetObject {

    public void testMethod(){
        try {
            System.out.println("当前线程"+Thread.currentThread().getName());
            Thread.sleep(5000);
            System.out.println("测试任务"+Thread.currentThread().getName());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
