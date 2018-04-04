package com.channelsoft.springweb.annotation;

import java.lang.annotation.*;

/**
 * <dl>
 * <dt> MyAnnotation</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/27</dd>
 * </dl>
 *
 * @author lizhu
 */
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE})
public @interface MyAnnotation {
    int age() default 18;
    String name() default "";
}
