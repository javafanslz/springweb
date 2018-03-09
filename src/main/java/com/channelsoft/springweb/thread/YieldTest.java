package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> YieldTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/9</dd>
 * </dl>
 *
 * @author lizhu
 */
public class YieldTest {
    public static void main(String[] args){
        YieldThread thread = new YieldThread();
        thread.start();
    }

}

class YieldThread extends Thread{

    @Override
    public void run(){
        long currentTime = System.currentTimeMillis();
        long count = 0;
        for(int i=0;i< 5000000;i++){
            count +=i;
            Thread.yield();
        }
        long end = System.currentTimeMillis();
        System.out.println("用时"+(end-currentTime));
    }
}
