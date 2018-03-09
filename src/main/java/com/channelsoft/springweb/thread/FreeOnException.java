package com.channelsoft.springweb.thread;

import javax.swing.plaf.TableHeaderUI;

/**
 * <dl>
 * <dt> FreeOnException</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/9</dd>
 * </dl>
 *出现异常就释放所持有的锁
 * @author lizhu
 */
public class FreeOnException {
    public static void main(String[] args){
        try {
            Service service = new Service();
            ThreadA threadA = new ThreadA(service);
            threadA.setName("a");
            threadA.start();
            Thread.sleep(500);
            ThreadB threadB = new ThreadB(service);
            threadB.setName("b");
            threadB.start();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }
}
class Service{
    synchronized public void testMethod(){
        if("a".equals(Thread.currentThread().getName())){
            System.out.println("ThreadName = "+Thread.currentThread().getName() +" run begin ="+System.currentTimeMillis());
            int i = 1;
            while(i == 1){
                if("1".equals("1")){
                    System.out.println(" Threadname = "+Thread.currentThread().getName() +"run exceptionTime = " +System.currentTimeMillis());
                    Integer.parseInt("a");
                }
            }
        }else{
            System.out.println("Thread B run time = "+System.currentTimeMillis());
        }
    }
}

class ThreadA extends Thread{
    private Service service;
    public ThreadA(Service service){
        this.service = service;
    }

    @Override
    public void run(){
        service.testMethod();
    }
}

class ThreadB extends Thread{
    private Service service;
    public ThreadB(Service service){
        this.service = service;
    }

    @Override
    public void run(){
        service.testMethod();
    }
}