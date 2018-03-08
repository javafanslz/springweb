package com.channelsoft.springweb.proxy.aop;

/**
 * <dl>
 * <dt> Waitrt</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class Waiter {
    public void greeTo(String name){
        System.out.println("waiter gree to "+name);
    }

    public void service(String name){
        System.out.println("serving "+name);
    }
}
