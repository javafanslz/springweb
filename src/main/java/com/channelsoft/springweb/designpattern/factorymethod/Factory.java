package com.channelsoft.springweb.designPattern.factorymethod;

/**
 * @Author: lizhu
 * @ClassName: Factory
 * @Desciption: Date:2018/3/18
 */
public abstract class Factory {
    public final Product create(String owner){
        Product p = createProduct(owner);
        registerProduct(p);
        return p;
    }

    public abstract Product createProduct(String owner);

    public abstract void registerProduct(Product product);
}
