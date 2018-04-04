package com.channelsoft.springweb.fastjson;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;

/**
 * <dl>
 * <dt> TestPo</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/4/4</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestPo {
    private String name;
    private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
class FilterTest{
    public static void main(String[] args){
        TestPo testPo = new TestPo();
        testPo.setName("李柱");
        testPo.setAge(23);
        SimplePropertyPreFilter filter = new SimplePropertyPreFilter(TestPo.class,"name");
        System.out.println(JSONObject.toJSONString(testPo,filter));
    }
}
