package com.channelsoft.springweb.webapplication;

import com.channelsoft.springweb.bean.*;
import com.channelsoft.springweb.bean.definition.Boss;
import com.channelsoft.springweb.event.MailSender;
import com.channelsoft.springweb.proxy.spring.Waiter;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.HierarchicalBeanFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.Properties;

/**
 * @Author: lizhu
 * @ClassName: WebApplicationContextTest
 * @Desciption: Date:2018/1/7
 */
public class WebApplicationContextTest  implements ServletContextListener{

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        BeanFactory beanFactory;
        HierarchicalBeanFactory hierarchicalBeanFactory;
        AutowireCapableBeanFactory autowireCapableBeanFactory;
        ListableBeanFactory listableBeanFactory;
        BeanDefinition beanDefinition;
        XmlBeanFactory xmlBeanFactory;
        FileSystemXmlApplicationContext applicationContext;
        System.out.println("初始化"+sce.getServletContext().getContextPath());
       /* WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
        CarWithLifeCycle car = (CarWithLifeCycle)webApplicationContext.getBean("car");
        car.introduce();*/
       /* ConstrcutBean constrcutBean = webApplicationContext.getBean("construtBean",ConstrcutBean.class);
        System.out.println(constrcutBean.toString());*/
       //使用工厂方法的Bean
      /*  Car car = webApplicationContext.getBean("carFactory",Car.class);*/
      /*  Car car1 = webApplicationContext.getBean("carWithFactory",Car.class);
        System.out.println(car == car1);*/
       /* System.out.println(car.toString());*/
        AbstractApplicationContext abstractApplicationContext;

        ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("aopConfig.xml");

       /* ApplicationContext applicationContext = new ClassPathXmlApplicationContext(new String[]{"appContext.xml"},classPathXmlApplicationContext);

        BossCar car = applicationContext.getBean("boss",BossCar.class);*/
       /* Boss collectionBean = classPathXmlApplicationContext.getBean("propertyEditorCar", Boss.class);
//        BossCar collectionBean1 = classPathXmlApplicationContext.getBean("boss", BossCar.class);
        System.out.println(collectionBean.getCar().toString());*/
        /**
         * 事件监听器
         */
     /*   MailSender m = (MailSender) classPathXmlApplicationContext.getBean("mailSender");
        m.sendMail("李柱");*/
        Waiter waiter = (Waiter) classPathXmlApplicationContext.getBean("waiter");
        waiter.greet("lalal");



    }
    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
