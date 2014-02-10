package net.bitacademy.java41.dao;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Feed;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;

public interface Eger4Dao {
	
	List<Store> categoryselect(int cateno) throws Exception; 
	List<Store> zoneselect(String zoneName) throws Exception; 
	List<Store> categoryAndZoneSelect(HashMap<String, Object> paramMap) throws Exception;
	List<Store> storesearch(String inputsname) throws Exception;
	List<Store> todayAddStoreList() throws Exception;
	List<Store> list() throws Exception; 
	int feedCount(int sno)throws Exception;
	int memberCount(int sno) throws Exception;
	Mileage mileageRate(int sno)throws Exception;
	List<Stamp> stampRate(int sno)throws Exception;
	Store view(int sno) throws Exception; 
	List<Event> storeViewEvent(int sno)throws Exception;
	List<Feed> feedList(int sno) throws Exception;
	StoreClient storecheck(HashMap<String, Object> paramMap) throws Exception;
	int storeadd(HashMap<String, Object> paramMap) throws Exception; 
	int addFeed(HashMap<String, Object> paramMap) throws Exception;
	int feeddelete(int fno) throws Exception;
	StoreClient storeMemberCheck(HashMap<String, Object> paramMap) throws Exception;
	List<Feed> feedscore(int sno) throws Exception;
	String storeStarScore(int sno) throws Exception;
	
	List<Integer> storeCouponCheck(int sno)throws Exception;
	void autoCouponAdd(HashMap<String, Object> paramMap3)throws Exception;
	int scnoCheck(HashMap<String, Object> paramMap2)throws Exception;
}