package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> DirttReadTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/9</dd>
 * </dl>
 *多线程的脏读
 * 主要原因是因为 线程调用对象的synchronized 方法 但此时可以其他线程可以调用其他非同步方法
 * 导致脏读
 * @author lizhu
 */
public class DirttReadTest {
    public static void main(String[] args){
        try {
            PublicVar publicVar = new PublicVar();
            DirtyThreadA dirtyThreadA = new DirtyThreadA(publicVar);
            dirtyThreadA.start();
            Thread.sleep(200);
            publicVar.getValue();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}


class PublicVar{
    public String userName = "A";
    public String password = "AA";

    public synchronized void setValue(String userName,String password){
        try{
            this.userName = userName;
            Thread.sleep(5000);
            this.password = password;
            System.out.println("setValue method thread name = "+Thread.currentThread().getName()
            + "userName = "+this.userName+"password = "+this.password );
        }catch (InterruptedException e){
            e.printStackTrace();
        }
    }

    public synchronized void getValue(){
        System.out.println("getValue method thread name = "+Thread.currentThread().getName()
        +" userName = "+this.userName +" password = "+this.password);
    }
}

class DirtyThreadA extends Thread{
    private PublicVar publicVar;
    public DirtyThreadA(PublicVar publicVar){
        this.publicVar = publicVar;
    }

    @Override
    public void run(){
        publicVar.setValue("B","BB");
    }

}