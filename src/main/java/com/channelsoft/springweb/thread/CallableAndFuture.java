package com.channelsoft.springweb.thread;

import java.util.concurrent.*;

/**
 * <dl>
 * <dt> CallableAndFuture</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/8</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CallableAndFuture {
    public static void main(String[] args){
       ExecutorService executorService  = Executors.newSingleThreadExecutor();
       Future<String> f = executorService.submit(
                new Callable<String>() {

                    @Override
                    public String call() throws Exception {
                        Thread.sleep(2000);
                        return "Hello";
                    }
                });

        System.out.println("等待结果");
        try {
            System.out.println("得到结果"+f.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
