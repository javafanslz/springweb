package com.channelsoft.springweb.proxy.aop;

import org.springframework.aop.ClassFilter;
import org.springframework.aop.support.ClassFilters;
import org.springframework.aop.support.StaticMethodMatcherPointcutAdvisor;

import java.lang.reflect.Method;

/**
 * <dl>
 * <dt> GreetingAdvisor</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class GreetingAdvisor extends StaticMethodMatcherPointcutAdvisor {
    @Override
    public boolean matches(Method method, Class<?> targetClass) {
        return "greeTo".equals(method.getName());
    }

    @Override
    public ClassFilter getClassFilter(){
        return new ClassFilter() {
            @Override
            public boolean matches(Class clazz){
                return Waiter.class.isAssignableFrom(clazz);
            }
        };
    }
}
