package com.channelsoft.springweb.bean.Annotation;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * <dl>
 * <dt> AnnotationTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/24</dd>
 * </dl>
 *
 * @author lizhu
 */
public class AnnotationTest {

    public static void main(String[] args){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        ((ClassPathXmlApplicationContext)applicationContext).destroy();
    }
}
