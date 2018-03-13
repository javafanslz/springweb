package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> JoinException</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 *如果线程处于join的时候  使用interrupt方法会使得程序出现异常
 * @author lizhu
 */
public class JoinException {
    public static void main(String[] args){
        JoinExceptionThreadA threadA = new JoinExceptionThreadA();
        threadA.start();
        JoinExceptionThreadB threadB = new JoinExceptionThreadB(threadA);
        threadB.start();
    }
}
class JoinExceptionThread extends Thread{
    @Override
    public void run(){
        for(int i=0;i<Integer.MAX_VALUE;i++){
            String newString = new String();
            Math.random();
        }
    }
}

class JoinExceptionThreadA extends Thread{
    @Override
    public void run(){
        try {
            JoinExceptionThread exceptionThread = new JoinExceptionThread();
            exceptionThread.start();
            exceptionThread.join();
            System.out.println("线程B在run end出打印了");
        } catch (InterruptedException e) {
            System.out.println("线程B在catch end出打印了");
            e.printStackTrace();
        }
    }
}

class JoinExceptionThreadB extends Thread{
    private JoinExceptionThreadA joinExceptionThreadA;
    public JoinExceptionThreadB(JoinExceptionThreadA joinExceptionThreadA){
        this.joinExceptionThreadA = joinExceptionThreadA;
    }
    @Override
    public void run(){
        joinExceptionThreadA.interrupt();
    }
}
