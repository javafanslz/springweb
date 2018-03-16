package com.channelsoft.springweb.designPattern.iterator;

/**
 * <dl>
 * <dt> ArrayListBookShelfIterator</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ArrayListBookShelfIterator<E> implements Iterator<E> {

    private BookShelfArrayList<E> bookShelfArrayList;
    private int index;

    public ArrayListBookShelfIterator(BookShelfArrayList<E> bookShelfArrayList){
        this.bookShelfArrayList = bookShelfArrayList;
    }

    @Override
    public boolean hasNext() {
        return index < bookShelfArrayList.getLenth();
    }

    @Override
    public E next() {
        E e = bookShelfArrayList.getElement(index);
        index++;
        return e;
    }
}
