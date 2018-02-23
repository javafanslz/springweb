package com.channelsoft.springweb.event;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.*;
import org.springframework.context.support.AbstractApplicationContext;

import java.util.EventListener;
import java.util.EventObject;

/**
 * <dl>
 * <dt> EventObjectTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/31</dd>
 * </dl>
 *
 * @author lizhu
 */
public class EventObjectTest {
    public static void main(String[] args){
        //事件类
        EventObject eventObject;
        ApplicationEvent applicationEvent;
        ContextClosedEvent contextClosedEvent;

        //事件监听接口
        //编写时间响应的处理逻辑
        EventListener eventListener;
        ApplicationListener applicationListener;
        SmartApplicationListener smartApplicationListener;

        //事件广播器
        ApplicationEventMulticaster multicaster;
        AbstractApplicationEventMulticaster eventMulticaster;
        SimpleApplicationEventMulticaster simpleApplicationEventMulticaster;

        AbstractApplicationContext context;


    }
}
