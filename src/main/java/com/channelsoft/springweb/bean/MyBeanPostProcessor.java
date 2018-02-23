package com.channelsoft.springweb.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

/**
 * <dl>
 * <dt> MyBeanPostProcessor</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MyBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if("car".equals(beanName)){
            CarWithLifeCycle car = (CarWithLifeCycle)bean;
            if(car.getBrand() == null){
                car.setBrand("李柱");
                System.out.println("设置车名为李柱");
            }
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if("car".equals(beanName)){
            CarWithLifeCycle car = (CarWithLifeCycle)bean;
            if(car.getMaxSpeed() != 200){
                car.setMaxSpeed(200);
                System.out.println("设置速度为200");
            }
        }
        return bean;
    }
}
