package com.channelsoft.springweb.thread;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @Author: lizhu
 * @ClassName: TraditionalThreadSyn
 * @Desciption: Date:2018/3/4
 */
public class LockTest {

    public static void main(String[] args){
        new LockTest().init();
    }

    public void init(){
        final OutPuter outPuter = new OutPuter();
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true){
                    outPuter.print("lidazhu");
                }

            }
        }){

        }.start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true){
                    outPuter.print("zhangxiaoke");
                }
            }
        }){

        }.start();
    }


    static class OutPuter{
       /* public void print(String name){
           synchronized (this){
               for(int i=0;i<name.length();i++){
                   System.out.print(name.charAt(i));
               }
               System.out.println();
           }
        }
*/
       Lock lock = new ReentrantLock();
       public void print(String name){
           //synchronized (OutPuter.class){
           lock.lock();
           try{
               for(int i=0;i<name.length();i++){
                   System.out.print(name.charAt(i));
               }
               System.out.println();
           }finally {
               lock.unlock();
           }
           //}
       }
        /**
         * 这里的synchronized和print方法 可以同步的原因是因为拿到的是同一个锁  也就是调用的this对象
         * @param name
         */
        public synchronized void print2(String name){
                for(int i=0;i<name.length();i++){
                    System.out.print(name.charAt(i));
                }
                System.out.println();
        }

        /**
         * 这里的synchronized和print方法 可以同步的原因是因为拿到的是同一个锁  是Class对象
         * @param name
         */
        public static void print3(String name){
                for(int i=0;i<name.length();i++){
                    System.out.print(name.charAt(i));
                }
                System.out.println();
        }
    }
}
