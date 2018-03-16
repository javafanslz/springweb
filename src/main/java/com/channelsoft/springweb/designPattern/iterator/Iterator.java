package com.channelsoft.springweb.designPattern.iterator;

/**
 * <dl>
 * <dt> Iterator</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public interface Iterator<E> {

    /**
     * if has next element return true or else return false
     * @return
     */
    boolean hasNext();

    /**
     * return current element and point to the next element
     * @return
     */
    E next();
}
