package com.channelsoft.springweb.test;

import org.springframework.util.StringUtils;

/**
 * <dl>
 * <dt> DateTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/4/4</dd>
 * </dl>
 *
 * @author lizhu
 */
public class DateTest {
    public static void main(String[] args){
        String path = "d:\\a.txt";
        System.out.println(StringUtils.cleanPath(path));
    }
}
