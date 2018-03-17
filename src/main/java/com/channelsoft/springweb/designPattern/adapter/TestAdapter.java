package com.channelsoft.springweb.designPattern.adapter;

/**
 * <dl>
 * <dt> TestAdapter</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestAdapter {
    public static void main(String[] args){
        Print print = new PrintBanner("lizhu");
        print.printStrong();
        print.printWeak();
    }
}
