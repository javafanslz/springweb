package com.channelsoft.springweb.bean;

/**
 * <dl>
 * <dt> ConstrcutBean</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/18</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ConstrcutBean {
    private String name;
    private String sex;
    public ConstrcutBean(String name,String sex){
        this.name = name;
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "ConstrcutBean{" +
                "name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                '}';
    }
}
