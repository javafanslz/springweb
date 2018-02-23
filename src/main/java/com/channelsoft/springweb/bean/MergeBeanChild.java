package com.channelsoft.springweb.bean;

import java.util.Set;

/**
 * <dl>
 * <dt> MergeBeanChild</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/20</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MergeBeanChild {

    private Set<String> set;

    @Override
    public String toString() {
        return "MergeBeanChild{" +
                "set=" + set +
                '}';
    }

    public Set<String> getSet() {
        return set;
    }

    public void setSet(Set<String> set) {
        this.set = set;
    }
}
