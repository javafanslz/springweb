package com.channelsoft.springweb.proxy;

/**
 * <dl>
 * <dt> TestForumService</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/6</dd>
 * </dl>
 *
 * @author lizhu
 */
public class TestForumService {
    public static void main(String[] args) {
        ForumService service = new ForumServiceImpl();
        service.removeTopic(10);
        service.removeForum(1010);
    }
}
