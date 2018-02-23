package com.channelsoft.springweb.bean;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * <dl>
 * <dt> BeanLifyCycle</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class BeanLifyCycle {
    private static void lifeCycleInBeanFactory(){
        Resource resource = new ClassPathResource("applicationContext.xml");
        BeanFactory beanFactory = new XmlBeanFactory(resource);

        //注册后处理器
        ((ConfigurableBeanFactory) beanFactory).addBeanPostProcessor(new MyBeanPostProcessor());

        ((ConfigurableBeanFactory) beanFactory).addBeanPostProcessor(new MyInstantiantionAwareBeanPostProcesor());

        CarWithLifeCycle car = (CarWithLifeCycle)beanFactory.getBean("car");
        car.setColor("红色");
        car.introduce();

        CarWithLifeCycle car1 = (CarWithLifeCycle)beanFactory.getBean("car");

        System.out.println("car==car1"+(car == car1));

        ((XmlBeanFactory)beanFactory).destroySingletons();

    }

    public static void main(String[] args){
        lifeCycleInBeanFactory();
    }
}
