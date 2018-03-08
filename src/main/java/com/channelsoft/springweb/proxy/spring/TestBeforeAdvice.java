package com.channelsoft.springweb.proxy.spring;

import org.aopalliance.intercept.MethodInterceptor;
import org.springframework.aop.AfterAdvice;
import org.springframework.aop.BeforeAdvice;
import org.springframework.aop.framework.ProxyFactory;

/**
 * <dl>
 * <dt> TestBeforeAdvice</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestBeforeAdvice {
    public static void main(String[] args){
        Waiter waiter = new NaiverWaiter();

        BeforeAdvice beforeAdvice = new WaiterBeforeAdvice();

        AfterAdvice afterAdvice = new WaiterAfterAdvice();

        MethodInterceptor interceptorAdvice = new MethodInterceptorWaiter();

        ProxyFactory factory = new ProxyFactory();

        factory.setTarget(waiter);

        factory.addAdvice(interceptorAdvice);
       // factory.addAdvice(afterAdvice);

        Waiter proxy = (Waiter)factory.getProxy();
        proxy.greet("John");
        proxy.service("lizhu");
    }
}
