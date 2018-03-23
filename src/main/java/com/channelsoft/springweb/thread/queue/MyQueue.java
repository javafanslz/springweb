package com.channelsoft.springweb.thread.queue;

import java.util.Collection;

/**
 * <dl>
 * <dt> MyQueue</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/14</dd>
 * </dl>
 *
 * @author lizhu
 */
public interface MyQueue<E> extends Collection<E> {
    /**
     * 队列中添加一个元素 若队列满就会抛出异常
     * @param e
     * @return
     */
    @Override
    boolean add(E e);

    /**
     * 队列中添加一个元素 队列满返回false
     * @param e
     * @return
     */
    boolean offer(E e);


    /**
     *取出队列中第一个元素   如果为空则抛出异常 不删除
     * @return
     */
    E element();

    /**
     * 取出队列中第一个元素  为空返回null 不删除
     * @return
     */
    E peek();

    /**
     * 从队列中取出并删除第一个元素  为空则返回null
     * @return
     */
    E poll();

    /**
     * 从队列中取出并删除第一个元素 为空抛出异常
     * @return
     */
    E remove();



}
