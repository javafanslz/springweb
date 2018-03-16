package com.channelsoft.springweb.designPattern.iterator;

/**
 * <dl>
 * <dt> Aggregate</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public interface Aggregate<E> {

    Iterator<E> iterator();
}
