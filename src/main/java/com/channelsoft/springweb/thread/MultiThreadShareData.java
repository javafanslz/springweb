package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> MultiThreadShareData</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/7</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MultiThreadShareData {
    private int j = 0;
    public static void main(String[] args){
        MultiThreadShareData threadShareData = new MultiThreadShareData();
        Desc desc = threadShareData.new Desc();
        Inc inc = threadShareData.new Inc();
            for(int i=0;i<2;i++){
                new Thread(inc).start();
                new Thread(desc).start();
            }
    }

    public synchronized void inc(){
        j ++;
    }

    public synchronized void des(){
        j--;
    }


   class Desc implements Runnable {
       @Override
       public void run() {
           for (int i = 0; i < 100; i++) {
               System.out.println("减之前 j:" + j);
               des();
               System.out.println("减之后 j:" + j);
           }
       }
   }

       class Inc implements Runnable{
           @Override
           public void run(){
               for(int i=0;i<100;i++){
                   System.out.println("加之前 j:"+j);
                   inc();
                   System.out.println("加之后 j:"+j);
               }
           }
   }

}
