package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> MultiSynchronized</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/8</dd>
 * 一个线程获得一个对象锁以后，可以调用这个对象中其他加锁的方法
 * 当这个加锁的对象存在父子继承的时候，也可以调用
 * </dl>
 *
 * @author lizhu
 */
public class MultiSynchronized {

    public static void main(String[] args){
        new Thread(new MyThread()).start();
    }
}


class MyThread implements Runnable{

    @Override
    public void run() {
        new Service().service1();
    }
}

class Service{
    synchronized void service1(){
        service2();
    }

    synchronized void service2(){
        service3();
    }

    synchronized void service3(){
        System.out.println("service3");
    }
}