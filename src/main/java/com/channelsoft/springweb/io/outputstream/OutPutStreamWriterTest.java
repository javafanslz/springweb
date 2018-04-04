package com.channelsoft.springweb.io.outputstream;

import java.io.*;

/**
 * <dl>
 * <dt> OutPutStreamWriterTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/25</dd>
 * </dl>
 *
 * @author lizhu
 */
public class OutPutStreamWriterTest{
    public static void main(String[] args){
        InputStreamReader inputStreamReader = new InputStreamReader(System.in);
        char ch;
        try {
            while((ch = (char)inputStreamReader.read()) != '1'){
                System.out.println(ch);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
