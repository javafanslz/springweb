package com.channelsoft.springweb.thread;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * <dl>
 * <dt> VolatileTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *volatile关键字的作用
 * java线程内存模型是
 * 内存分为工作内存和主内存，每个线程线程对变量的所有操作（读取，赋值）都必须在工作内存中进行。
 * 不同线程之间也无法直接访问对方工作内存中的变量，线程间变量值的传递均需要通过主内存来完成。
 * 使用volatile增加了实例变量在多个线程之间的可见性，但volatile最致命的缺点是不支持原子性
 *
 * 对于synchronized和volatile之间的比较：
 * volatile性能比synchronized要好，并且volatile只能修饰变量
 * 多线程使用volatile不会堵塞
 * volatile解决的是变量在多个线程之间的可见性，而synchronized解决的是多线程之间访问资源的同步性
 *
 *
 * @author lizhu
 */
public class VolatileTest {
    public static void main(String[] args){
        VolatileThread[] myThreads = new VolatileThread[100];
        for(int i=0;i<100;i++){
            myThreads[i] = new VolatileThread();
        }
        for(int i=0;i<100;i++){
            myThreads[i].start();
        }
    }
}

class VolatileThread extends  Thread{
    volatile public static int count;
    private static AtomicInteger atomicInteger = new AtomicInteger(0);
    private  static void addCount(){
        for(int i=0;i<100;i++){
            System.out.println(atomicInteger.incrementAndGet());
        }
        //System.out.println(Thread.currentThread().getName()+"count="+atomicInteger.get());
    }

    @Override
    public void run(){
        addCount();
    }
}
