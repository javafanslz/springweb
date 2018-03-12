package com.channelsoft.springweb.thread;

import com.channelsoft.springweb.proxy.spring.NaiverWaiter;

/**
 * <dl>
 * <dt> MorePAndMoreC</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *多生产者多消费者
 * @author lizhu
 */
public class MorePAndMoreC {
    public static  void main(String[] args){
        String lock = new String();
        ProductorAndConsumer productorAndConsumer = new ProductorAndConsumer(lock);
        Consumer consumer = new Consumer(lock);
        ThreadP[] threadPs = new ThreadP[2];
        ThreadC[] threadCs = new ThreadC[2];
        for(int i=0;i<2;i++){
            threadPs[i] = new ThreadP(productorAndConsumer);
            threadPs[i].setName("生产者"+(i+1));
            threadCs[i] = new ThreadC(consumer);
            threadCs[i].setName("消费者"+(i+1));
            threadPs[i].start();
            threadCs[i].start();
        }
        try {
            Thread.sleep(5000);
            Thread[] threads = new Thread[Thread.currentThread().getThreadGroup().activeCount()];
            Thread.currentThread().getThreadGroup().enumerate(threads);
            for(int i=0;i<threads.length;i++){
                System.out.println(threads[i].getName()+" "+threads[i].getState());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
class ThreadP extends Thread{
    private ProductorAndConsumer productorAndConsumer;
    public ThreadP(ProductorAndConsumer productorAndConsumer){
        this.productorAndConsumer = productorAndConsumer;
    }
    @Override
    public void run(){
        while(true){
            productorAndConsumer.setValue();
        }
    }
}

class ThreadC extends Thread{
    private Consumer consumer;
    public ThreadC(Consumer consumer){
        this.consumer = consumer;
    }
    @Override
    public void run(){
        while(true){
            consumer.getValue();
        }
    }
}
