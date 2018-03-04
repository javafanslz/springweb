package com.channelsoft.springweb.thread;

import com.channelsoft.springweb.bean.Car;

import java.awt.*;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

/**
 * @Author: lizhu
 * @ClassName: TraditionalTimerTest
 * @Desciption: Date:2018/3/3
 */
public class TraditionalTimerTest {
    public static void main(String[] args){
       new Timer().schedule(new MyTask(),2000);
     //  Calendar calendar = Calendar.getInstance();
      // calendar.setTime(new Date());
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
