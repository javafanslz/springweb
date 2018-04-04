package com.channelsoft.springweb.annotation;

import com.channelsoft.springweb.test.TestPo;

import javax.servlet.http.HttpServletRequest;
import java.lang.annotation.Annotation;
import java.lang.annotation.Documented;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;

/**
 * <dl>
 * <dt> TestAnnotation</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/27</dd>
 * </dl>
 *
 * @author lizhu
 */

public class TestAnnotation {
  public static void main(String[] args) throws NoSuchFieldException {
    Class c = Test.class;
    if(c.isAnnotationPresent(MyAnnotation.class)){
      MyAnnotation myAnnotation = (MyAnnotation) c.getAnnotation(MyAnnotation.class);
      System.out.println(myAnnotation.name()+"@@@@"+myAnnotation.age());
    }
  }
}

@MyAnnotation(name = "lizhu")
class Test{

}
