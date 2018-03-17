package com.channelsoft.springweb.designPattern.adapter;

import java.util.Properties;

/**
 * <dl>
 * <dt> TestObjectAdapter</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestObjectAdapter {
    public static void main(String[] args){
        Print print = new ObjectPrintBanner("lizhua");
        print.printStrong();
        print.printWeak();
        Properties p;
    }
}
