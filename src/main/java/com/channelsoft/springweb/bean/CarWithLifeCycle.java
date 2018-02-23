package com.channelsoft.springweb.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;

/**
 * <dl>
 * <dt> CarWithLifeCycle</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/14</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CarWithLifeCycle implements BeanFactoryAware,BeanNameAware,InitializingBean,DisposableBean {
   private String brand;
    private String color;
    private int maxSpeed;
    private BeanFactory beanFactory;
    private String beanName;
    public CarWithLifeCycle(){
        System.out.println("调用构造函数");
    }


    public void setBrand(String brand) {
        System.out.println("调用setBrand方法");
        this.brand = brand;
    }

    public void setMaxSpeed(int maxSpeed){
        System.out.println("调用setMaxSpeed设置最大速度");
        this.maxSpeed = maxSpeed;
    }
    public void setColor(String color){
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public String getColor() {
        return color;
    }

    public int getMaxSpeed() {
        return maxSpeed;
    }

    public BeanFactory getBeanFactory() {
        return beanFactory;
    }

    public String getBeanName() {
        return beanName;
    }

    public void introduce(){
        System.out.println("brand"+brand+"color"+color+"maxSpeed"+maxSpeed);
    }


    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("调用BeanFactoryAware.setBeanFactory方法");
        this.beanFactory = beanFactory;
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("调用BeanFactoryAware.setBeanName方法,name = "+name);
        this.beanName = name;
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("调用DisposableBean的destroy方法");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("调用afterPropertiesSet方法");
    }

    public void myInit(){
        System.out.println("调用init-method所指定的myInit设置maxSpeed为250");
        this.maxSpeed = 250;
    }

    public void myDestroy(){
        System.out.println("调用自己的destroy方法");
    }
}
