package com.channelsoft.springweb.thread;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;

/**
 * @Author: lizhu
 * @ClassName: ShortCommingOfSyn
 * @Desciption: Date:2018/3/11
 * Syncronized方法的弊端
 *
 * 同步代码块和同步方法的相同点和不同点
 * 相同：同步方法和同步代码块都可以控制同一时间只有一个线程可以访问
 * 对于同一个方法中的多个同步方法，一个线程持有这个对象的锁，无论是同步
 * 代码块或者是同步方法持有的都是整个对象的锁
 *
 * 不同点：
 * 对于同步代码块，其他线程可以访问非同步代码块的代码
 *
 *
 */
public class ShortCommingOfSyn {
    public static void main(String[] args){
        Task task = new Task();
        MyThread1 myThread1 = new MyThread1(task);
        myThread1.start();
        MyThread2 myThread2 = new MyThread2(task);
        myThread2.start();

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        long beginTime = CommonUtil.beginTime1;
        if(CommonUtil.beginTime2 <CommonUtil.beginTime1){
            beginTime = CommonUtil.beginTime2;
        }
        long endTime = CommonUtil.endTime1;
        if(CommonUtil.endTime2 >CommonUtil.endTime1){
            endTime = CommonUtil.endTime2;
        }
        System.out.println("耗时 " +((endTime - beginTime)/1000) );
    }
}


class Task{
    private String getDate1;
    private String getDate2;

    public synchronized void doLongTimeTask(){
        try {
            System.out.println("begin task");
            Thread.sleep(3000);
            getDate1 = "长时间处理任务后从远程返回值1 threadName = "+Thread.currentThread().getName();
            getDate2 = "长时间处理任务后从远程返回值2 threadName = "+Thread.currentThread().getName();
            System.out.printf(getDate1);
            System.out.println(getDate2);
            System.out.println("end task");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class CommonUtil {

    public static long beginTime1;
    public static long endTime1;
    public static long beginTime2;
    public static long endTime2;
}

class MyThread1 extends  Thread{

    private Task task;
    public MyThread1(Task task){
        this.task = task;
    }
    @Override
    public void run(){
        super.run();
        CommonUtil.beginTime1 = System.currentTimeMillis();
        task.doLongTimeTask();
        CommonUtil.endTime1 = System.currentTimeMillis();
    }
}

class MyThread2 extends  Thread{

    private Task task;
    public MyThread2(Task task){
        this.task = task;
    }
    @Override
    public void run(){
        super.run();
        CommonUtil.beginTime2 = System.currentTimeMillis();
        task.doLongTimeTask();
        CommonUtil.endTime2 = System.currentTimeMillis();
    }
}