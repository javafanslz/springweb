package com.channelsoft.springweb.bean.definition;

import org.apache.commons.lang.StringUtils;

import java.beans.PropertyEditorSupport;

/**
 * <dl>
 * <dt> CustomCarEditor</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/30</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CustomCarEditor extends PropertyEditorSupport{

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        if(StringUtils.isBlank(text)){
            throw new IllegalArgumentException("格式不正确");
        }
        String[] infos = StringUtils.split(text,",");
        Car car = new Car();
        car.setBrand(infos[0]);
        car.setMaxSpeed(Integer.parseInt(infos[1]));
        car.setPrice(Double.parseDouble(infos[2]));
        setValue(car);
    }
}
