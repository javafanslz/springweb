package com.channelsoft.springweb.io.inputstream;

import java.io.*;

/**
 * <dl>
 * <dt> FileTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/23</dd>
 * </dl>
 *
 * @author lizhu
 */
public class FileTest {
    public static void main(String[] args){
        File file = new File("f:\\222.pdf");
        byte[] bytes = new byte[1024];
        try(FileInputStream fileInputStream = new FileInputStream(file);
            FileOutputStream fileOutputStream = new FileOutputStream(new File("f:\\111.pdf"));
            BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
            DataInputStream dataInputStream = new DataInputStream(fileInputStream);
            DataOutputStream dataOutputStream = new DataOutputStream(fileOutputStream);
            ){

          /*  int j = bufferedInputStream.available();
            if(j>0){
                while( bufferedInputStream.read(bytes,0,bytes.length)!=-1){
                    bufferedOutputStream.write(bytes,0,bytes.length);
                    bufferedOutputStream.flush();
                }
            }*/
/*            int i = fileInputStream.available();
            if(i>0){
                while(fileInputStream.read(bytes) !=-1){
                    fileOutputStream.write(bytes);
                    fileOutputStream.flush();
                }
            }*/
        }catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
