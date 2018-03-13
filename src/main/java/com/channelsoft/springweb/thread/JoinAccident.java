package com.channelsoft.springweb.thread;

import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

/**
 * <dl>
 * <dt> JoinAccident</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 *打印顺序的不同主要是因为 join和Thread2抢占同步锁，而join一般情况下回抢到锁
 * 小部分时间抢不到锁导致这个问题
 * @author lizhu
 */
public class JoinAccident {
    public static void main(String[] args){
        try {
            AccidentThread2 thread2 = new AccidentThread2();
            AccidentThread1 thread1 = new AccidentThread1(thread2);
            thread1.start();
            thread2.start();
            thread2.join(2000);
            System.out.println("   main end "+System.currentTimeMillis());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class AccidentThread1 extends Thread{
    private AccidentThread2 thread2;
    public AccidentThread1(AccidentThread2 thread2){
        this.thread2 = thread2;
    }
    @Override
    public void run(){
        synchronized (thread2){
            try {
                System.out.println("begin A ThreadName = "+Thread.currentThread().getName()
                        +" "+System.currentTimeMillis());
                Thread.sleep(5000);
                System.out.println("end A ThreadName = "+Thread.currentThread().getName()
                        +" "+System.currentTimeMillis());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class AccidentThread2 extends Thread{

    @Override
    synchronized public void run(){
        try {
            System.out.println("begin B ThreadName = "+Thread.currentThread().getName()
                    +" "+System.currentTimeMillis());
            Thread.sleep(5000);
            System.out.println("end B ThreadName = "+Thread.currentThread().getName()
                    +" "+System.currentTimeMillis());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
