package com.channelsoft.springweb.thread;

/**
 * <dl>
 * <dt> InnerClassSyncronized</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/3/12</dd>
 * </dl>
 *内部类同步测试
 * @author lizhu
 */
public class InnerClassSyncronized {
    private String userName;
    private String password;
    class PrivateClass{
        private String age;
        private String address;

        public String getAge() {
            return age;
        }

        public void setAge(String age) {
            this.age = age;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

class Run{
    public static void main(String[] args){
        InnerClassSyncronized innerClassSyncronized = new InnerClassSyncronized();
        innerClassSyncronized.setPassword("passwordParam");
        innerClassSyncronized.setUserName("usernameParam");
        System.out.println(innerClassSyncronized.getUserName() +" " + innerClassSyncronized.getPassword());
        InnerClassSyncronized.PrivateClass privateClass =  innerClassSyncronized.new PrivateClass();
        privateClass.setAddress("addressParam");
        privateClass.setAge("ageParam");
        System.out.println(privateClass.getAge() +" "+privateClass.getAddress());
    }
}
