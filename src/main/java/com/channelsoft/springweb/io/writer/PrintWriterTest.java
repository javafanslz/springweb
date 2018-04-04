package com.channelsoft.springweb.io.writer;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;

/**
 * <dl>
 * <dt> PrintWriter</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/25</dd>
 * </dl>
 *
 * @author lizhu
 */
public class PrintWriterTest {
    public static void main(String[] args){
        try {
            PrintWriter printWriter = new PrintWriter("");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Scanner scanner;
    }
}
