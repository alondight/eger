package net.bitacademy.java41.dao;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.vo.CMileage;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Stamp;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;


public interface Eger3Dao {
	List<Store> getStoreList(String barcode) throws Exception;
	List<Store> storesearch(HashMap<String, Object> paramMap)throws Exception;
	StoreClient getScno(HashMap<String, Object> paramMap) throws Exception;
	List<CMileage> getCmileage(int scno)throws Exception;
	List<Event> getEvent(int scno) throws Exception;
	List<Stamp> getStamp(int sno) throws Exception;
	int couponCount(HashMap<String, Object> paramMap) throws Exception;
}