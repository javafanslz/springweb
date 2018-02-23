package com.channelsoft.springweb.proxy;

import com.channelsoft.springweb.event.MailSender;

/**
 * <dl>
 * <dt> MethodPerformance</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/6</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MethodPerformance {
    private long begin;
    private long end;
    private String serviceMethod;

    public MethodPerformance(String serviceMethod){
        this.serviceMethod = serviceMethod;
        this.begin = System.currentTimeMillis();
    }

    public void printPerformance(){
        end = System.currentTimeMillis();
        long elapse = end - begin;

        System.out.println("监控"+serviceMethod+"方法一共花费"+elapse+"毫秒");
    }
}
