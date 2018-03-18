package com.channelsoft.springweb.designpattern.factorymethod;

/**
 * @Author: lizhu
 * @ClassName: IDCard
 * @Desciption: Date:2018/3/18
 */
public class IDCard extends Product {
    private String owner;

    public IDCard(String owner){
        System.out.println("制作"+owner+"的id卡");
        this.owner = owner;
    }
    @Override
    public void use() {
        System.out.println("使用"+owner+"的id卡");
    }

    public IDCard getOwner(){
        return this;
    }
}
