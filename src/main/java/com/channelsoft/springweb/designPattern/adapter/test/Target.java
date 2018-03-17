package com.channelsoft.springweb.designPattern.adapter.test;

import java.io.IOException;

/**
 * <dl>
 * <dt> Target</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *
 * @author lizhu
 */
public interface Target {
    void readFromFile(String location) throws IOException;

    void writeToFile(String location) throws IOException;

    void setValue(String key,String value);

    String getValue(String key);
}
