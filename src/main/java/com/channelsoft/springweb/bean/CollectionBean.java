package com.channelsoft.springweb.bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * <dl>
 * <dt> CollectionBean</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/19</dd>
 * </dl>
 *
 * @author lizhu
 */
public class CollectionBean {

    private List<String> list = new ArrayList<>();

    public CollectionBean(){
        System.out.println(list.size());
    }

    public void introduce(){
        System.out.println("内容"+list.size());
    }

    public List<String> getList() {
        return list;
    }

    public void setList(List<String> list) {
        this.list = list;
    }
}
