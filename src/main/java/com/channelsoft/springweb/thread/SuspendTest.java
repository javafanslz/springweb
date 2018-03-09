package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> SuspendTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/9</dd>
 * </dl>
 *suspend 和 resume
 * suspend是停止线程   resume是恢复线程
 * 这两个方法都被标记成过时的方法
 * 1、suspend会导致一直持有线程锁，导致线程堵塞
 *2、会导致不同步
 * @author lizhu
 */
public class SuspendTest {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
        try {
            Thread.sleep(5000);
            myThread.suspend();
            System.out.println("A="+System.currentTimeMillis() +" i="+myThread.getI() );

            Thread.sleep(5000);
            System.out.println("A="+System.currentTimeMillis() +" i="+myThread.getI() );

            myThread.resume();

            Thread.sleep(5000);

            myThread.suspend();
            System.out.println("B="+System.currentTimeMillis() +" i="+myThread.getI() );

            Thread.sleep(5000);
            System.out.println("B="+System.currentTimeMillis() +" i="+myThread.getI() );

            Thread.sleep(5000);

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class MyThread extends Thread{

    private long i =0;

    public long getI() {
        return i;
    }

    public void setI(long i) {
        this.i = i;
    }

    public void run(){
        while(true){
            i++;
        }
    }
}