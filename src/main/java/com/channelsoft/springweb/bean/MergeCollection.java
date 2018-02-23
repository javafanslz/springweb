package com.channelsoft.springweb.bean;

import java.util.Set;

/**
 * <dl>
 * <dt> MergeCollection</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/20</dd>
 * </dl>
 *
 * @author lizhu
 */
public class MergeCollection  {

    private Set<String> set;

    public MergeCollection(){

    }

    @Override
    public String toString() {
        return "MergeCollection{" +
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
