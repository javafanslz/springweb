package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> OutClass2</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *内部类同步代码块synchronized(class)对class2上锁后，其他线程只能已同步的方式调用class2中的静态同步方法
 * try it 把class改成this
 * @author lizhu
 */
public class OutClass2 {
    static class InnerClass1{
        public void method1(InnerClass2 class2){
            String threadName = Thread.currentThread().getName();
            synchronized (class2){
                System.out.println(threadName +"进入InnerClass1类中的method1方法");
                for(int i=0;i<10;i++){
                    System.out.println("i="+i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println(threadName +"离开InnerClass1类中的method1方法");
            }
        }

        public synchronized void method2(){
            String threadName = Thread.currentThread().getName();
            System.out.println(threadName + "进入InnerClass1类中的method2方法");
            for(int j = 0;j<10;j++){
                System.out.println("j="+j);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(threadName + "离开InnerClass1类中的method2方法");
        }
    }

    static class InnerClass2{
        public synchronized  void method1(){
            String threadName = Thread.currentThread().getName();
            System.out.println(threadName + "进入InnerClass2类中的method1方法");
            for(int k = 0;k<10;k++){
                System.out.println("k="+k);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(threadName +"离开InnerClass2类中的method1方法");
        }
    }
}

class OutClass2Run{
    public static void main(String[] args){
        final OutClass2.InnerClass1 innerClass1 = new OutClass2.InnerClass1();
        final OutClass2.InnerClass2 innerClass2 = new OutClass2.InnerClass2();
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                innerClass1.method1(innerClass2);
            }
        });

        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                innerClass1.method2();
            }
        });

        Thread t3 = new Thread(new Runnable() {
            @Override
            public void run() {
                innerClass2.method1();
            }
        });

        t1.start();
        t2.start();
        t3.start();
    }
}
