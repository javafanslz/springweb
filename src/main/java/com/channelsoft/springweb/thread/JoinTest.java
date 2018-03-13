package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> JoinTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 * 方法join的作用是使所属的线程对象x正常运行run()方法中的任务，使当前线程
 * 无限期阻塞，等待线程x销毁后再继续执行z后后面的代码
 * 方法join有使得线程排队的作用，有些类似同步的运行效果。join与synchronized的区别是,
 * join内部使用wait()方法进行等待，而synchronized关键字使用的是对象监视器原理作为同步
 *
 * join(long)和sleep(long)的区别
 * 因为join()内部
 * @author lizhu
 */
public class JoinTest {
    public static void main(String[] args){
        JoinThread1 thread1 = new JoinThread1();
        thread1.start();
        //Thread.sleep()
      /*  System.out.println("我想在thread结束后再执行");
        System.out.println("sleep中的值应该写多少呢");
        System.out.println("答案是我不确定");*/
        try {
            thread1.join();
            System.out.println("我想在thread结束后再执行，我做到了");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}

class JoinThread1 extends Thread{
    @Override
    public void run(){
        try {
            int secondValue = (int)(Math.random()*10000);
            System.out.println(secondValue);
            Thread.sleep(secondValue);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
class JoinThread2 extends Thread{

    @Override
    public void run() {
        for(int i=0;i<10000;i++){
            System.out.println(Thread.currentThread().getName()+"的值为 :"+i);
            if(i==1000){
                try {
                    join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
