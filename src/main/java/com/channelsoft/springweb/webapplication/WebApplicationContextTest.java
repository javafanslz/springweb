package com.channelsoft.springweb.webapplication;

import com.channelsoft.springweb.bean.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * @Author: lizhu
 * @ClassName: WebApplicationContextTest
 * @Desciption: Date:2018/1/7
 */
public class WebApplicationContextTest  extends ContextLoader implements ServletContextListener{

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("初始化"+sce.getServletContext().getContextPath());
        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
        Car car = webApplicationContext.getBean("car",Car.class);
        System.out.println(car.toString());

    }
    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
