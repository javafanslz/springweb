package com.channelsoft.springweb.designPattern.adapter;

/**
 * <dl>
 * <dt> ObjectPrintBanner</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *委托适配器
 * 把需要适配的类当成成员变量
 * @author lizhu
 */
public class ObjectPrintBanner  implements Print{
    private Banner banner;
    public ObjectPrintBanner(String string){
        banner = new Banner(string);
    }
    @Override
    public void printWeak() {
        banner.showWithParen();
    }

    @Override
    public void printStrong() {
        banner.showWithAster();
    }
}
