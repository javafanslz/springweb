package com.channelsoft.springweb.bean.definition;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.beans.SimpleBeanInfo;

/**
 * <dl>
 * <dt> ChartBeanBeanInfo</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/29</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ChartBeanBeanInfo extends SimpleBeanInfo {
    @Override
    public PropertyDescriptor[] getPropertyDescriptors() {
        try{
            PropertyDescriptor titlePositionDescriptor
                    = new PropertyDescriptor("titlePosition",ChartBean.class);
            titlePositionDescriptor.setPropertyEditorClass(TitlePositionEditor.class);
         /*   PropertyDescriptor inverseDesc
                    = new PropertyDescriptor(Inverse)*/
         return new PropertyDescriptor[]{titlePositionDescriptor};
        }catch (IntrospectionException e){

        }
        return null;
    }
}
