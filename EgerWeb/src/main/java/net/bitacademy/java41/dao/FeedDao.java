package net.bitacademy.java41.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.vo.Feed;

public interface FeedDao {
	int addFeed(Map<String, Object> paramMap) throws Exception;
	List<Feed> feedList(int sno) throws Exception;
	void removeFeed(int fno) throws Exception;
}