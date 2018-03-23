package com.channelsoft.springweb.designPattern.adapter.test;

import java.io.IOException;

/**
 * <dl>
 * <dt> Test</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *
 * @author lizhu
 */
public class Test {
    public static void main(String[] args){
        Target target = new FileProperties();
        try {
            target.readFromFile("F:\\a.properties");
            System.out.println(target.getValue("a"));
            target.setValue("wuhaolong","121212");
            target.writeToFile("F:\\a.properties");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
