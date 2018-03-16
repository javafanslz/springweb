package com.channelsoft.springweb.designPattern.iterator;

/**
 * <dl>
 * <dt> BookShelf</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class BookShelf<E> implements Aggregate<E> {

    private Book[] books;

    private int last = 0;

    public BookShelf(int maxsize){
        this.books = new Book[maxsize];
    }

    @Override
    public Iterator iterator() {
        return new BookShelfIterator(this);
    }

    public Book getIndex(int index){
        if(index <0 || index >books.length){
            throw new ArrayIndexOutOfBoundsException();
        }
        return books[index];
    }

    public void appendBook(Book book){
        if(last >= books.length){
            throw new ArrayIndexOutOfBoundsException();
        }
        books[last++] = book;
    }

    public int getLength(){
        return books.length;
    }

    public int currentPosition(){
        return last;
    }
}
