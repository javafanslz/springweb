package com.channelsoft.springweb.proxy;

/**
 * <dl>
 * <dt> ForumService</dt>
 * <dd>Description:</dd>
 * <dd>Copyright: Copyright (C) 2016</dd>
 * <dd>Company: 青牛（北京）技术有限公司</dd>
 * <dd>CreateDate:2018/2/6</dd>
 * </dl>
 *
 * @author lizhu
 */
public interface ForumService {
    void removeTopic(int topicId);
    void removeForum(int forumId);
}
