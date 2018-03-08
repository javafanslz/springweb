package com.channelsoft.springweb.thread.concurrent;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * <dl>
 * <dt> ThreadPollTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/7</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ThreadPollTest {
    public static void main(String[] args){
        //ExecutorService threadPool = Executors.newFixedThreadPool(3);
        //ExecutorService threadPool = Executors.newCachedThreadPool();
        ExecutorService threadPool = Executors.newSingleThreadExecutor();
        for(int i=1;i<=10;i++){
            final int task = i;
            threadPool.execute(new Runnable() {
                @Override
                public void run() {
                    for(int j=1;j<=10;j++){
                        try {
                            Thread.sleep(20);
                        } catch (InterruptedException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                        System.out.println(Thread.currentThread().getName() + " is looping of " + j + " for  task of " + task);
                    }
                }
            });
        }
        System.out.println("all of 10 tasks have committed! ");
    }
}
