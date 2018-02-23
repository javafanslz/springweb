package com.channelsoft.springweb.bean.Annotation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * <dl>
 * <dt> LogDao</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/24</dd>
 * </dl>
 *
 * @author lizhu
 */
@Component
public class LogDao {

 /*   @Autowired
    private Car car;
*/
    public LogDao(){
        System.out.println("初始化");
    }


   /* public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }*/

    @PostConstruct
    public void init1(){
        System.out.println("初始化1");
    }

    @PostConstruct
    public void init2(){
        System.out.println("初始化2");
    }

    @PreDestroy
    public void destroy1(){
        System.out.println("销毁1");
    }

    @PreDestroy
    public void destroy2(){
        System.out.println("销毁2");
    }
}
