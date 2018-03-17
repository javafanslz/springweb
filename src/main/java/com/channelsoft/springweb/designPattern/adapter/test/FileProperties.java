package com.channelsoft.springweb.designPattern.adapter.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * <dl>
 * <dt> FileProperties</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/17</dd>
 * </dl>
 *
 * @author lizhu
 */
public class FileProperties extends Properties implements Target {

    Properties properties = new Properties();

    /**
     * read properties from file
     * @param location
     * @throws IOException
     */
    @Override
    public void readFromFile(String location) throws IOException {
        File file = new File(location);
        FileInputStream inputStream = new FileInputStream(file);
        properties.load(inputStream);
    }

    @Override
    public void writeToFile(String location) throws IOException {
        File file = new File(location);
        if(!file.exists()){
            file.createNewFile();
        }
        FileOutputStream fileOutputStream  = new FileOutputStream(file);
        properties.store(fileOutputStream,"测试适配器模式");
    }

    @Override
    public void setValue(String key, String value) {
        properties.setProperty(key,value);
    }

    @Override
    public String getValue(String key) {
        return (String)properties.get(key);
    }
}
