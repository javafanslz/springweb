package com.channelsoft.springweb.thread;

/**
 * @Author: lizhu
 * @ClassName: TraditionalThreadCommunicaiton
 * @Desciption: Date:2018/3/4
 * https://www.2cto.com/kf/201603/492037.html
 */
public class TraditionalThreadCommunicaiton {

    public static void main(String[] args){
        new TraditionalThreadCommunicaiton().init();
    }


    public void init(){
        final Business business = new Business();
        new Thread(new Runnable() {
            @Override
            public void run() {
                for(int i=1;i<=50;i++){
                    business.sub(i);
                }
            }
        }).start();
        for(int i=1;i<=50;i++){
            business.main(i);
        }

    }


    class Business{
        private boolean isSub = true;

        /**
         * 解释为甚么需要使用while循环
         * java对于wait的线程在notify()的时候会重新检查是否符合唤醒的条件，如果不符合会继续wait
         * 因此需要使用while循环，否则会出现问题
         * 两个生产者一个消费者模式的时候，如果生产的容器已经满了，两个生产者属于wait的时候
         * 消费者从容器中取走一个，此时使用notifyAll()方法，此时会导致两个生产者同时生产，会导致异常
         * @param i
         */

        public synchronized void main(int i){
            while(isSub){
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            for(int j=1;j<=10;j++){
                System.out.println("thread main 第"+i+"次循环 j为"+j);
            }
            isSub = true;
            this.notify();
        }

        public synchronized void sub(int i){
            while(!isSub){
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            for(int j=1;j<=100;j++){
                System.out.println("thread sub 第"+i+"次循环 j为"+j);
            }
            isSub = false;
            this.notify();
        }

    }
}
