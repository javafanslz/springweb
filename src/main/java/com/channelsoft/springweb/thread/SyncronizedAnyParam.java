package com.channelsoft.springweb.thread;

/**
 * @Author: lizhu
 * @ClassName: SyncronizedAnyParam
 * @Desciption: Date:2018/3/11
 *syncronized(非this对象x)
 * 对多个想成同时执行syncronized(x){} 同步代码块呈同步效果
 * 当其他线程执行x对象中syncronized方法时呈现同步效果
 * 当其他线程执行x对象方法里面syncronized(this)带买块时也称同步效果
 *
 */
public class SyncronizedAnyParam{
    public static void main(String[] args){
        TestService testService = new TestService();

        ThreadTestServiceA threadTestServiceA = new ThreadTestServiceA(testService);
        threadTestServiceA.start();
        ThreadTestServiceB threadTestServiceB = new ThreadTestServiceB(testService);
        threadTestServiceB.start();

    }
}

class TestService{
    private String userNameParam;
    private String passwordParam;
    private String anyString = new String();

    public void setUserNamePassword(String userName,String password){
        try{
            synchronized (anyString){
                System.out.println("线程名称为："+Thread.currentThread().getName() + "在"
                + System.currentTimeMillis()+"进入同步块");
                userNameParam = userName;
                Thread.sleep(3000);
                System.out.println("线程名称为："+Thread.currentThread().getName() + "在"
                        + System.currentTimeMillis()+"离开同步块");

            }

        }catch (Exception e){

        }

    }
}

class ThreadTestServiceA extends Thread {

    private TestService testService;

    public ThreadTestServiceA(TestService testService){
        this.testService = testService;
    }

    @Override
    public void run(){
        testService.setUserNamePassword("a","aa");

    }
}

class ThreadTestServiceB extends Thread {

    private TestService testService;

    public ThreadTestServiceB(TestService testService){
        this.testService = testService;
    }

    @Override
    public void run(){
        testService.setUserNamePassword("b","bb");

    }
}