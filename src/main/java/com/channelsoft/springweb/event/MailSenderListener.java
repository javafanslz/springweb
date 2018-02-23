package com.channelsoft.springweb.event;

import org.springframework.context.ApplicationListener;

/**
 * <dl>
 * <dt> MailSenderListener</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/1</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MailSenderListener implements ApplicationListener<MailSendEvent> {
    @Override
    public void onApplicationEvent(MailSendEvent event) {
        MailSendEvent mse = event;
        System.out.println("IoC容器为"+event.getApplicationContext());
        System.out.println("向"+mse.getTo()+"发送了一封邮件");
    }
}
