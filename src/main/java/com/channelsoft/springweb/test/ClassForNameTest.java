package com.channelsoft.springweb.test;

import com.channelsoft.springweb.proxy.ForumServiceImpl;
import com.sun.deploy.util.SyncFileAccess;
import sun.misc.ProxyGenerator;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * <dl>
 * <dt> ClassForNameTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/27</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ClassForNameTest {
    public static void main(String[] args){
        String filePath = "d:/$Proxy0.class";

       byte[] interfaceFile =  ProxyGenerator.generateProxyClass("$Proxy0", ForumServiceImpl.class.getInterfaces());

        FileOutputStream outputStream = null;

        try {
            outputStream = new FileOutputStream(filePath);
            outputStream.write(interfaceFile);
            outputStream.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
