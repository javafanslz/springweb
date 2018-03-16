package com.channelsoft.springweb.designPattern.iterator;

import java.util.ArrayList;

/**
 * <dl>
 * <dt> BookShelfArrayList</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class BookShelfArrayList<E> implements Aggregate<E> {

    public ArrayList<E> arrayList;

    @Override
    public Iterator<E> iterator() {
        return new ArrayListBookShelfIterator<>(this);
    }

    public BookShelfArrayList(int capacity){
        this.arrayList = new ArrayList<>(capacity);
    }

    public void  appendElement(E e){
        arrayList.add(e);
    }

    public int getLenth(){
        return arrayList.size();
    }

    public E getElement(int index){
        return arrayList.get(index);
    }
}
