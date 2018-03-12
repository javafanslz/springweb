package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> WaitAndNotify</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *
 * @author lizhu
 */
public class WaitAndNotify {
}

class WaitThread1 extends Thread{
    private Synchronized lock;
    public WaitThread1(Synchronized lock){
        this.lock = lock;
    }
    @Override
    public void run(){
        synchronized (lock){
            System.out.println("第一个线程的第一行");
            try {
                lock.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}

class Synchronized{
    public void test(){
        System.out.println("test");
    }
}


