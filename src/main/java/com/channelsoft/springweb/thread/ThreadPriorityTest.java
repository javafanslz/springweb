package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> ThreadPriorityTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/9</dd>
 * </dl>
 *线程的优先级具有继承性
 * @author lizhu
 */
public class ThreadPriorityTest {
    public static void main(String[] args){
        System.out.println(Thread.currentThread().getName()+"main thread begin priority ="+Thread.currentThread().getPriority());
        Thread.currentThread().setPriority(6);
        System.out.println(Thread.currentThread().getName()+"main thread end priority ="+Thread.currentThread().getPriority());
        Priority1 priority1 = new Priority1();
        priority1.start();
    }
}
class Priority1 extends Thread{
    @Override
    public void run(){
        System.out.println(this.getName()+"Priority1 run priority = "+this.getPriority());
        Priority2 priority2 = new Priority2();
        priority2.start();
    }
}

class Priority2 extends Thread{
    @Override
    public void run(){
        System.out.println(this.getName()+"Priority2 run priority = "+this.getPriority());
    }
}