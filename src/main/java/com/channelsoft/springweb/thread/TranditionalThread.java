package com.channelsoft.springweb.thread;

/**
 * @Author: lizhu
 * @ClassName: TranditionalThread
 * @Desciption: Date:2018/3/3
 */
public class TranditionalThread {
    public static void main(String[] args){
        new Thread(new Runnable() {

            public void run() {
                while(true){
                    System.out.println("2:runnable"+Thread.currentThread().getName());
                }
            }
        }){
            @Override
            public void run(){
                super.run();
                while(true){
                    System.out.println("1:thread"+Thread.currentThread().getName());
                }
            }
        }.start();

    }
}
