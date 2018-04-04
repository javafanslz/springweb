package com.channelsoft.springweb.oop;

/**
 * <dl>
 * <dt> ProtectedConstructor</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/25</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ProtectedConstructor {
    protected ProtectedConstructor(){

    }
    public void testMethod1(){
        System.out.println("测试方法一");
    }
}

class TestProtectCons{
    public static void main(String[] args){
        ProtectedConstructor protectedConstructor = new ProtectedConstructor();
        protectedConstructor.testMethod1();
    }
}
