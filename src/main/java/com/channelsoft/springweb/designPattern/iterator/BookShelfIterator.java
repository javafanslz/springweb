package com.channelsoft.springweb.designPattern.iterator;

/**
 * <dl>
 * <dt> BookShelfIterator</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class BookShelfIterator implements Iterator {

    private BookShelf bookShelf;

    private int index;

    public BookShelfIterator(BookShelf bookShelf){
        this.bookShelf = bookShelf;
    }
    @Override
    public boolean hasNext() {
        return bookShelf.currentPosition() > index ;
    }

    @Override
    public Book next() {
       Book book =  bookShelf.getIndex(index);
        index++;
        return book;
    }
}
