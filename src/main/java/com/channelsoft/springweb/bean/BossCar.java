package com.channelsoft.springweb.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

/**
 * <dl>
 * <dt> BossCar</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/18</dd>
 * </dl>
 *
 * @author lizhu
 */
public class BossCar implements BeanFactoryAware{
    private Car car = new Car();
    private BeanFactory beanFactory;

    public BossCar(){

    }
    public void introduce(){
        System.out.println(car.toString());
    }

    public Car getCar() {
        return (Car)beanFactory.getBean("carL");
    }

    public void setCar(Car car) {
        this.car = car;
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("beanName"+beanFactory.getClass().getName());
        this.beanFactory = beanFactory;
    }
}
