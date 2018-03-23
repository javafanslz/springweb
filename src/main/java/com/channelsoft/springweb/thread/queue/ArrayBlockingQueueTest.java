package com.channelsoft.springweb.thread.queue;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * <dl>
 * <dt> ArrayBlockingQueueTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/13</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ArrayBlockingQueueTest {
    public static void main(String[] args){
        List<String> list = new ArrayList<String>();
        list.add("first");
        list.add("second");
        list.add("third");
        //list.add("fouth");
        ArrayBlockingQueue<String> arrayBlockingQueue = new ArrayBlockingQueue<String>(3,false,list);
        try {
            System.out.println(arrayBlockingQueue.take());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
