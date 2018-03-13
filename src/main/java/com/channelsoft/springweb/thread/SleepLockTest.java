package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> SleepLockTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 *验证sleep不会释放锁
 * @author lizhu
 */
public class SleepLockTest {
    public static void main(String[] args){
        Sleep sleep = new Sleep();
        SleepThread thread = new SleepThread(sleep);
        SleepThread1 thread1 = new SleepThread1(sleep);
        thread.start();
        thread1.start();

    }
}


class Sleep{
    public synchronized void testMethod() {
        System.out.println("进入到测试方法");
        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("离开这个方法");
    }
}

class SleepThread extends  Thread{
    private Sleep sleep;
    public SleepThread(Sleep sleep){
        this.sleep = sleep;
    }
    @Override
    public void run(){
      sleep.testMethod();
    }
}

class SleepThread1 extends  Thread{
    private Sleep sleep;
    public SleepThread1(Sleep sleep){
        this.sleep = sleep;
    }
    @Override
    public void run(){
        sleep.testMethod();
    }
}
