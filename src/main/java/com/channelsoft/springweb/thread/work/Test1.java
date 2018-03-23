package com.channelsoft.springweb.thread.work;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * <dl>
 * <dt> Test1</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 *
 * @author lizhu
 */
public class Test1 {
    public static void main(String[] args){
        ExecutorService service = Executors.newFixedThreadPool(4);
        PrintLog printLog = new PrintLog();
        PrintThread[] printThreads = new PrintThread[4];
        for(int i=0;i<4;i++){
            printThreads[i] = new PrintThread(printLog);
            service.execute(printThreads[i]);
        }
    }
}

class PrintLog{
    public void printLog(){
        System.out.println("当前线程为"+Thread.currentThread().getName() +"当前时间为"+(System.currentTimeMillis()/1000));
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
class PrintThread extends Thread{
    private PrintLog printLog;
    public PrintThread(PrintLog printLog){
        this.printLog = printLog;
    }
    public void run(){
        printLog.printLog();
    }
}
