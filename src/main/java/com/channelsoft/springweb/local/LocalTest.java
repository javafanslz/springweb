package com.channelsoft.springweb.local;

import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Locale;

/**
 * <dl>
 * <dt> LocalTest</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/1/30</dd>
 * </dl>
 *
 * @author lizhu
 */
public class LocalTest {
    public static void main(String[] args) {
        //1中文   中国大陆
        Locale locale = new Locale("zh","CN");
        //2中国
        Locale locale1 = new Locale("zh");
        //3相当于1
        Locale locale2 = Locale.US;
        //4 相当于2
        Locale locale3 = Locale.CHINESE;

        NumberFormat c = NumberFormat.getCurrencyInstance(locale2);
        double a = 1234.567;
        System.out.println(c.format(a));
        DateFormat dateFormat = DateFormat.getDateInstance(DateFormat.DEFAULT,locale2);
        System.out.println(dateFormat.format(new Date()));

        String pattern1 = "{0}你好,你有{1}";
        String pattern2 = "{0}Hello,you have{1}";

        Object[] param = {"John",1.0E3};

        String msg1 = MessageFormat.format(pattern1,param);

        MessageFormat format = new MessageFormat(pattern2,locale2);
        String msg2 = format.format(param);

        System.out.println(msg1);
        System.out.println(msg2);

    }
}
