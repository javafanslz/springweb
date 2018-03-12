package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> ProductorAndConsumer</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *
 * 基于等待/通知模式 的生产者/消费者模式
 * @author lizhu
 */
public class ProductorAndConsumer {
    private String lock;
    public ProductorAndConsumer(String lock){
        this.lock = lock;
    }

    public void setValue(){
        synchronized (lock){
                try {
                    if(!("").equals(ValueObject.value)) {
                        lock.wait();
                    }
                    String value = System.currentTimeMillis() + "_"+System.nanoTime();
                    System.out.println("set的值为"+value);
                    ValueObject.value = value;
                    lock.notify();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
        }

    }
}

class Consumer{
    private String lock;
    public Consumer(String lock){
        this.lock = lock;
    }
    public void getValue(){
        synchronized (lock){
            try {
                if(("").equals(ValueObject.value)) {
                    lock.wait();
                }
                System.out.println("get的值为"+ValueObject.value);
                ValueObject.value = "";
                lock.notify();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}
class ValueObject{
    public static String value = "";
}
class PAndCMain{
    public static void main(String[] args){
        String lock = new String("");
        final ProductorAndConsumer productorAndConsumer = new ProductorAndConsumer(lock);
        final Consumer consumer = new Consumer(lock);
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true){
                    productorAndConsumer.setValue();
                }
            }
        }).start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true) {
                    consumer.getValue();
                }
            }
        }).start();
    }
}
