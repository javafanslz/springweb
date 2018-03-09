package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> ExtendsSynchronized</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/9</dd>
 * </dl>
 *当存在父子继承的时候 子类可以调用父类的同步方法
 * @author lizhu
 */
public class ExtendsSynchronized {
    public static void main(String[] args){
        ExtendsSynchronizedThread thread = new ExtendsSynchronizedThread();
        thread.start();
    }

}

class Main{
    public int i = 10;
    synchronized public void operateIMainMethod(){
        try {
            i--;
            System.out.println("Main ptint i="+i);
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class Sub extends Main{
    synchronized public void operateISubMethod(){
        try {
            while(i >0){
                System.out.println("sub print i="+i);
                Thread.sleep(100);
                this.operateIMainMethod();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class ExtendsSynchronizedThread extends Thread{
    @Override
    public void run(){
        Sub sub = new Sub();
        sub.operateISubMethod();
    }
}