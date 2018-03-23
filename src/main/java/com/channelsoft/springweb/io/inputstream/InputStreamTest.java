package com.channelsoft.springweb.io.inputstream;

import java.io.*;

/**
 * <dl>
 * <dt> InputStreamTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/22</dd>
 * </dl>
 *
 * @author lizhu
 */
public class InputStreamTest {
    public static void main(String[] args) throws FileNotFoundException {
        CharSequence charSequence;
        Appendable appendablel;
        AutoCloseable autoCloseable;
        FilterInputStream filterInputStream;
        DataInputStream dataInputStream;
        FileInputStream fileInputStream;
        BufferedInputStream bufferedInputStream;
        FileOutputStream fileOutputStream;
        //InputStream inputStream = new BufferedInputStream(new FileInputStream(""));
        try {
            InputStream inputStream = new FileInputStream(new File("F:\\a.properties"));
            int i = inputStream.available();
            if(i>0){
               byte[]  data = new byte[inputStream.available()];
                inputStream.read(data);
                OutputStream outputStream = new FileOutputStream(new File("F:\\b.properties"));
                outputStream.write(data);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

       //  DataInputStream dataInputStream = new DataInputStream();
    }
}
