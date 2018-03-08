package com.channelsoft.springweb.thread;

import com.channelsoft.springweb.bean.Car;

import java.awt.*;
import java.util.*;

/**
 * @Author: lizhu
 * @ClassName: TraditionalTimerTest
 * @Desciption: Date:2018/3/3
 */
public class TraditionalTimerTest {
    public static void main(String[] args){
       //new Timer().schedule(new MyTask(),2000);
     //  Calendar calendar = Calendar.getInstance();
      // calendar.setTime(new Date());
        new Timer().scheduleAtFixedRate(new MyTimerTask2(),1000,10);
        Integer[] i = new Integer[2];
        i[0] = 1;
        i[1] = 2;

        i = Arrays.copyOf(i,2*i.length);
        for(Integer integer:i){
            System.out.println(integer);
        }

    }
}

class MyTask extends TimerTask{
    static int count = 0;

    @Override
    public void run() {
        System.out.println(Calendar.getInstance().get(Calendar.SECOND));
        System.out.println("bombing");
        count = (count+1)%2;
        new Timer(){

        }.schedule(new MyTask(),2000+2000*count);
    }
}


/**
 * 验证TimerTask周期内没有执行完的策略
 */
class MyTimerTask2 extends  TimerTask{
    private static int times = 0;

    @Override
    public void run() {
       // int randomInt = new Random().nextInt();
        ++times;
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(times+"次的秒数"+ Calendar.getInstance().get(Calendar.SECOND));
    }
}
