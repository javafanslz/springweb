package com.channelsoft.springweb.thread.threadpool;

import java.util.concurrent.*;

/**
 * <dl>
 * <dt> BasicThreadPool</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 *Executor:负责线程使用和调度的根接口
 * ExecutorService:Executor的子接口，线程池的主要接口
 * ThreadPoolExecutor：ExecutorService的实现类
 * scheduledExecutorService：ExecutorService的子接口，负责线程的调度
 * ScheduledThreadPoolExecutor：既继承了ThreadPoolExecutor，同时实现了ScheduledExecutorService
 * @author lizhu
 */
public class BasicThreadPool {

    public static void main(String[] args){
        Executors.newFixedThreadPool(10);
        //ExecutorService service = new ThreadPoolExecutor(10,10,5, TimeUnit.SECONDS);
    }
}
