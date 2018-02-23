package com.channelsoft.springweb.bean.definition;

import javax.swing.*;

/**
 * <dl>
 * <dt> ChartBean</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/29</dd>
 * </dl>
 *
 * @author lizhu
 */
public class ChartBean extends JPanel{
    private int titlePosition = 1;
    private boolean inverse;

    public int getTitlePosition() {
        return titlePosition;
    }

    public void setTitlePosition(int titlePosition) {
        this.titlePosition = titlePosition;
    }

    public boolean isInverse() {
        return inverse;
    }

    public void setInverse(boolean inverse) {
        this.inverse = inverse;
    }
}
