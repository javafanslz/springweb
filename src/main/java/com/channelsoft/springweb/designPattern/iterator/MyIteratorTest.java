package com.channelsoft.springweb.designPattern.iterator;

/**
 * <dl>
 * <dt> MyIteratorTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/16</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MyIteratorTest {
    public static void main(String[] args){
       /* BookShelf bookShelf = new BookShelf(10);
        Book book = new Book();
        book.setName("a");
        Book book1 = new Book();
        book1.setName("b");
        bookShelf.appendBook(book);
        bookShelf.appendBook(book1);
        Iterator<Book> iterator = bookShelf.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next().getName());
        }*/

       BookShelfArrayList<Book> bookBookShelfArrayList = new BookShelfArrayList<>(2);
        Book book = new Book();
        book.setName("a");
        Book book1 = new Book();
        book1.setName("b");
        Book book2 = new Book();
        book2.setName("c");
        bookBookShelfArrayList.appendElement(book);
        bookBookShelfArrayList.appendElement(book1);
        bookBookShelfArrayList.appendElement(book2);
        Iterator<Book> i = bookBookShelfArrayList.iterator();
        while(i.hasNext()){
            System.out.println(i.next().getName());
        }

    }
}
