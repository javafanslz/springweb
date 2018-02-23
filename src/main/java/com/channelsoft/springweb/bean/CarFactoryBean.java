package com.channelsoft.springweb.bean;

import org.springframework.beans.factory.FactoryBean;

/**
 * <dl>
 * <dt> CarFactoryNea</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/22</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CarFactoryBean implements FactoryBean<Car> {
    private String carInfo;

    public String getCarInfo() {
        return carInfo;
    }

    public void setCarInfo(String carInfo) {
        this.carInfo = carInfo;
    }

    @Override
    public Car getObject() throws Exception {
        Car car = new Car();
        String[] carInfos = carInfo.split(",");
        car.setSpeed(Integer.parseInt(carInfos[0]));
        car.setName(carInfos[1]);
        return car;
    }

    @Override
    public Class<?> getObjectType() {
        return Car.class;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}
