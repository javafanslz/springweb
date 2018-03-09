package com.channelsoft.springweb.thread;

import java.util.Random;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * <dl>
 * <dt> ReadWriteLockTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/8</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ReadWriteLockTest {
    public static void main(String[] args){
       final Queue3 queue3 = new Queue3();
        for(int i =0;i<3;i++){
            new Thread(new Runnable() {
                @Override
                public void run() {
                    queue3.get();
                }
            }).start();


            new Thread(new Runnable() {
                @Override
                public void run() {
                    queue3.write(new Random().nextInt(10000));
                }
            }).start();
        }
    }

}

class Queue3{
    private int data ;
    ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
    public void get(){
        readWriteLock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName()+"准备开始读数据了");
            Thread.sleep((long)Math.random()*1000);
            System.out.println(Thread.currentThread().getName()+"读出来的数据为"+data);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            readWriteLock.readLock().unlock();
        }
    }

    public void write(int data){
        try {
            readWriteLock.writeLock().lock();
            System.out.    println(Thread.currentThread().getName()+"准备开始写数据了");
            Thread.sleep((long)Math.random()*1000);
            this.data = data;
            System.out.println(Thread.currentThread().getName()+"写的数据为"+this.data);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            readWriteLock.writeLock().unlock();
        }



    }
}
