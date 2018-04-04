package com.channelsoft.springweb.designPattern.factorymethod;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: lizhu
 * @ClassName: IDCardFactory
 * @Desciption: Date:2018/3/18
 */
public class IDCardFactory extends Factory {
    private List<IDCard> list = new ArrayList<>();

    @Override
    public Product createProduct(String owner) {
        return new IDCard(owner);
    }

    @Override
    public void registerProduct(Product product) {
        list.add(((IDCard)product).getOwner());
    }

    public List<IDCard> getList(){
        return list;
    }
}
