package com.channelsoft.springweb.io.inputstream;

import java.io.Serializable;

/**
 * <dl>
 * <dt> Person</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/23</dd>
 * </dl>
 *
 * @author lizhu
 */
public class Person implements Serializable{
    private transient String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
