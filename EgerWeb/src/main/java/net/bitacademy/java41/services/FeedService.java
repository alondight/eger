package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Feed;

public interface FeedService {
	int feedAdd(String fcontent, int sno) throws Exception;
	List<Feed> feedList(int sno) throws Exception;
	void removeFeed(int fno)throws Exception;
}

