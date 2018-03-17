package com.channelsoft.springweb.designPattern.adapter;

/**
 * <dl>
 * <dt> PrintBanner</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *类适配器
 * 使用继承的方法 用适配器继承需要被转换的类
 * @author lizhu
 */
public class PrintBanner extends Banner implements Print {

    public PrintBanner(String string){
        super(string);
    }
    @Override
    public void printWeak() {
        super.showWithParen();
    }

    @Override
    public void printStrong() {
        super.showWithAster();
    }
}
