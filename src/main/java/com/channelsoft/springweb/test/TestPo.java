package com.channelsoft.springweb.test;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * <dl>
 * <dt> TestPo</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestPo {
    private int age;
    private String name;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

class PoTest{
    public static void main(String[] args){
        TestPo testPo = new TestPo();
        testPo.setAge(88);
        testPo.setName("asdf");

        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(testPo));
        System.out.println(jsonObject.getLong("age"));
    }
}
