package com.channelsoft.springweb.thread;
import java.util.Random;

/**
 * <dl>
 * <dt> ThreadLocalTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/5</dd>
 * </dl>
 *ThreadLocal
 * 把变量绑定到当前线程，使得每个线程中的变量为本线程共享
 * @author lizhu
 */
public class ThreadLocalTest {
    private static ThreadLocal<Integer> map = new ThreadLocal<>();
    public static void main(String[] args){
        for(int i=1;i<=2;i++){
            new Thread(new Runnable() {
                @Override
                public void run() {
                    int data = new Random().nextInt();
                    map.set(data);
                    MyThreadScopeData myThreadScopeData = MyThreadScopeData.getInstans();
                    myThreadScopeData.setName("lizhu");
                    myThreadScopeData.setAge(data);
                    new A().get();
                    new B().get();
                }
            }){

            }.start();
        }

    }

    static class A{
        public void get(){
            MyThreadScopeData myThreadScopeData = MyThreadScopeData.getInstans();
            System.out.println("A from thread "+Thread.currentThread().getName()
                    + "get name is:"+myThreadScopeData.getName()+" age is :"+myThreadScopeData.getAge());
        }
    }

    static class B{
        public void get(){
            MyThreadScopeData myThreadScopeData = MyThreadScopeData.getInstans();
            System.out.println("B from thread "+Thread.currentThread().getName()
                    + "get name is:"+myThreadScopeData.getName()+" age is :"+myThreadScopeData.getAge());
        }
    }
}

class MyThreadScopeData{

    private MyThreadScopeData(){}

    private static MyThreadScopeData myThreadScopeData = null;
    private static ThreadLocal<MyThreadScopeData> map = new ThreadLocal<>();
    public static MyThreadScopeData getInstans(){
        if(map.get() == null){
            myThreadScopeData = new MyThreadScopeData();
            map.set(myThreadScopeData);
        }
        return map.get();

    }
    private String name ;
    private int age;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

