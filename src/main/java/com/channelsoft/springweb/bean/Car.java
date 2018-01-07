package com.channelsoft.springweb.bean;

/**
 * @Author: lizhu
 * @ClassName: Car
 * @Desciption: Date:2018/1/7
 */
public class Car {
    private String name;
    private int speed;

    public Car() {
        System.out.println("实例化");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    @Override
    public String toString() {
        return "Car{" +
                "name='" + name + '\'' +
                ", speed=" + speed +
                '}';
    }
}
