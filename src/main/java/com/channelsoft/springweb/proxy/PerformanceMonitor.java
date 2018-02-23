package com.channelsoft.springweb.proxy;

/**
 * <dl>
 * <dt> PerformanceMonitor</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/6</dd>
 * </dl>
 *
 * @author lizhu
 */
public class PerformanceMonitor {
    public static ThreadLocal<MethodPerformance> record = new ThreadLocal();

    public static void begin(String method){
        System.out.println("begin monitor");
        MethodPerformance mp = new MethodPerformance(method);
        record.set(mp);
    }

    public static void end(){
        System.out.println("end monitor");
        MethodPerformance mp = record.get();
        mp.printPerformance();
    }
}
