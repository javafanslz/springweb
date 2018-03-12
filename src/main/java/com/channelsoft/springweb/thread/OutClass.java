package com.channelsoft.springweb.thread;


/**
 * <dl>
 * <dt> OutClass</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *内部类中两个同步方法持有的是不同的锁，所以打印出来是乱序的
 * @author lizhu
 */
public class OutClass {
    static class Inner{
        public void method1(){
            synchronized ("其他的锁"){
                for(int i=0;i<=10;i++){
                    System.out.println(Thread.currentThread().getName() + " i = "+i);
                }
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        public synchronized void method2(){
            for(int i=0;i<=20;i++){
                System.out.println(Thread.currentThread().getName() + " i = "+i);
            }
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class InnerRun{
    public static void main(String[] args){
        final OutClass.Inner innerClass = new OutClass.Inner();
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                innerClass.method1();
            }
        },"A");

        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                innerClass.method2();
            }
        },"B");
        t1.start();
        t2.start();
    }
}