package com.channelsoft.springweb.factory;

import com.channelsoft.springweb.bean.Car;

/**
 * <dl>
 * <dt> CarFactory</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/18</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CarFactory {

    private static Car car;
    public static Car buildCar(){
        if(car != null){
            return car;
        }else{
            car = new Car();
            car.setName("奥迪");
            car.setSpeed(100);
            return car;
        }
    }
}
