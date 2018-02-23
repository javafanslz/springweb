package com.channelsoft.springweb.bean.definition;

import java.beans.PropertyEditorSupport;

/**
 * <dl>
 * <dt> TitlePositionEditor</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/29</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TitlePositionEditor extends PropertyEditorSupport {
    private String[] options = {"Left","Center","Right"};
    public String[] getTags(){
        return options;
    }

    @Override
    public String getJavaInitializationString() {
        return ""+getValue();
    }

    @Override
    public String getAsText() {
        int value = (Integer)getValue();
        return options[value];
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        for(int i=0;i<options.length;i++){
            if(options[i].equals(text)){
                setValue(i);
                return ;
            }
        }
        super.setAsText(text);
    }
}
