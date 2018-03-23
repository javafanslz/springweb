package com.channelsoft.springweb.io.inputstream;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * <dl>
 * <dt> ObjectInputStreamTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/23</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ObjectInputStreamTest {
    public static void main(String[] args){
        List<Person> list = new ArrayList<>();
        Person p = new Person();
        p.setName("lizhu");
        p.setAge(23);
        list.add(p);
        File file = new File("f:\\b.txt");
        try {
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(file));
            objectOutputStream.writeObject(list);
            ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(file));
            List<Person> person = (List<Person>)objectInputStream.readObject();
            System.out.println(person.get(0).getName());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
