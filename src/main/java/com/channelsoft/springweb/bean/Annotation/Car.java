package com.channelsoft.springweb.bean.Annotation;

import org.springframework.stereotype.Component;

/**
 * <dl>
 * <dt> Car</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/24</dd>
 * </dl>
 *
 * @author lizhu
 */
@Component
public class Car {

    public Car(){
        System.out.println("初始化car");
    }

}
