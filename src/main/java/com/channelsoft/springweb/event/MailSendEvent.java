package com.channelsoft.springweb.event;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.event.ApplicationContextEvent;

/**
 * <dl>
 * <dt> MailSendEcent</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/1</dd>
 * </dl>
 * 发送邮件事件
 * @author lizhu
 */
public class MailSendEvent extends ApplicationContextEvent {

    private String to;

    public MailSendEvent(ApplicationContext source,String to) {
        super(source);
        this.to = to;
    }

    public String getTo(){
        return this.to;
    }
}
