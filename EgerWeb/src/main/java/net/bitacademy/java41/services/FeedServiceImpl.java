package net.bitacademy.java41.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.FeedDao;
import net.bitacademy.java41.vo.Feed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedServiceImpl implements FeedService{
	@Autowired PlatformTransactionManager txManager;
	@Autowired FeedDao feedDao;

	
	
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int feedAdd(String fcontent,int sno) throws Exception{
		try{
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sno", sno);
			paramMap.put("fcontent", fcontent);
			return feedDao.addFeed(paramMap);
		} catch (Exception e){
			throw e;
		}
	}
	
	
	public List<Feed> feedList(int sno) throws Exception {
		try{
			return feedDao.feedList(sno);
		}catch(Exception e){
			throw e;
		}
	}


	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void removeFeed(int fno) throws Exception {
		try{
			 feedDao.removeFeed(fno);
		}catch(Exception e){
			throw e;
		}
		
	}
	
}
