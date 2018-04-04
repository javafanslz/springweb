package com.channelsoft.springweb.designPattern.factorymethod;

/**
 * @Author: lizhu
 * @ClassName: Main
 * @Desciption: Date:2018/3/18
 */
public class Main {
    public static void main(String[] args){
        Factory factory = new IDCardFactory();
        Product product = factory.create("lizhu");
        Product product1 = factory.create("zhangke");
        product.use();
        product1.use();
    }
}
