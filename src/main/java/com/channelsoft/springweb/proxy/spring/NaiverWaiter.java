package com.channelsoft.springweb.proxy.spring;

/**
 * <dl>
 * <dt> NaiverWaiter</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class NaiverWaiter implements Waiter {
    @Override
    public void greet(String name) {
        System.out.println("greet to "+name);
    }

    @Override
    public void service(String name) {
        System.out.println("service to "+name);
    }
}
