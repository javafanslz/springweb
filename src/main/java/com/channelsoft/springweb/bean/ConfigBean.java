package com.channelsoft.springweb.bean;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * <dl>
 * <dt> ConfigBean</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/12</dd>
 * </dl>
 *
 * @author lizhu
 */
@Configuration
public class ConfigBean {

    @Bean(name ="configBean")
    public Car getCar(){
        Car car = new Car();
        car.setName("奔驰");
        car.setSpeed(1000);
        return car;
    }
}
