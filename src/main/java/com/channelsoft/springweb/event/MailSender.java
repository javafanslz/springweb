package com.channelsoft.springweb.event;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * <dl>
 * <dt> MailSender</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/1</dd>
 * </dl>
 *事件源必须实现ApplicaitionContextAware
 * @author lizhu
 */
public class MailSender implements ApplicationContextAware {
    private ApplicationContext applicationContext;
    private Logger logger = Logger.getLogger(MailSender.class);
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public void sendMail(String to){
        if(logger.isInfoEnabled()){
            logger.info("测试info");
        }
        logger.info("测试不加if判断");
        System.out.printf("模拟发邮件");
        MailSendEvent mse = new MailSendEvent(this.applicationContext,to);
        applicationContext.publishEvent(mse);
    }
}
