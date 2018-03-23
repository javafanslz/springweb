package com.channelsoft.springweb.thread.queue;

import java.util.Collection;

/**
 * <dl>
 * <dt> MyBlockingQueue</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/14</dd>
 * </dl>
 *
 * @author lizhu
 */
public interface MyBlockingQueue<E> extends MyQueue<E> {
    /**
     * 向队列中添加一个元素 如果队列满就堵塞
     * @param e
     * @throws InterruptedException 如果当等待的时候被中断就会抛出异常
     */
    void put(E e) throws InterruptedException;

    /**
     * 从队列中去一个元素 如果队列为空 则阻塞
     * @return
     * @throws InterruptedException 如果被中断会抛出异常
     */
    E take() throws InterruptedException;

    int remainingCapacity();

    /**
     * 从队里中删除指定元素
     *删除一个，如果不存在就会抛出异常
     * @param o
     * @return
     */
    boolean remove(Object o);

    /**
     * 是否包含
     * @param o
     * @return
     */
    boolean contains(Object o);

    /**
     * 把集合中分元素移除到 c中，如若队列中不存在或者 c不存在会报错
     * 效率要比poll快
     * @param c
     * @return
     */
    int drainTo(Collection<? super E> c);

    /**
     *
     * @param c
     * @param maxElements
     * @return
     */
    int drainTo(Collection<? super E> c,int maxElements);


}
