package com.channelsoft.springweb.thread;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @Author: lizhu
 * @ClassName: TraditionalThreadCommunicaiton
 * @Desciption: Date:2018/3/4
 * https://www.2cto.com/kf/201603/492037.html
 */
public class ConditionCommunicaiton {
    public static void main(String[] args) throws InterruptedException {
        ConditionMyService service = new ConditionMyService();
        ConditoinThread thread = new ConditoinThread(service);
        thread.start();
        Thread.sleep(3000);
        service.signal();
    }

}

class ConditionMyService{
    private Lock lock = new ReentrantLock();
    public Condition condition = lock.newCondition();

    public void await(){
        try {
            lock.lock();
            System.out.println("await的时间为"+System.currentTimeMillis());
            condition.await();
            System.out.printf("停止await");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            lock.unlock();
        }
    }

    public void signal(){
        try{
            lock.lock();
            System.out.println("signal的时间为"+System.currentTimeMillis());
            condition.signal();
        }finally {
            lock.unlock();
        }
    }
}

class ConditoinThread extends Thread{
    private ConditionMyService myService;
    public ConditoinThread(ConditionMyService myService){
        this.myService = myService;
    }
    @Override
    public void run(){
        myService.await();
    }
}
