package com.channelsoft.springweb.thread;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * @Author: lizhu
 * @ClassName: ThreadScopeShareData
 * @Desciption: Date:2018/3/4
 */
public class ThreadScopeShareData {
    private static Map<Thread,Integer> map = new HashMap<>();
    public static void main(String[] args){
        for(int i=1;i<=2;i++){
            new Thread(new Runnable() {
                @Override
                public void run() {
                    int data = new Random().nextInt();
                    map.put(Thread.currentThread(),data);
                    new A().get();
                    new B().get();
                }
            }){

            }.start();
        }

    }

    static class A{
        public void get(){
            System.out.println("A from thread "+Thread.currentThread().getName()
                    + "get data is:"+map.get(Thread.currentThread()));
        }
    }

    static class B{
        public void get(){
            System.out.println("B from thread "+Thread.currentThread().getName()
                    + "get data is:"+map.get(Thread.currentThread()));
        }
    }


}
