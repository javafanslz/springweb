package com.channelsoft.springweb.proxy.spring;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

/**
 * <dl>
 * <dt> MethodInterceptorWaiter</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/28</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MethodInterceptorWaiter implements MethodInterceptor {
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        System.out.println("前");
        Object o = invocation.proceed();
        System.out.println("后");
        return o;
    }
}
