package net.bitacademy.java41.dao;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.vo.CCoupone;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;
import net.bitacademy.java41.vo.StoreClient;

public interface MemberListDao {
	List<StoreClient> memberList(int sno) throws Exception;
	List<Integer> memberSCNO(int sno) throws Exception;
	void addClientCoupone(HashMap<String,Object> paramMap) throws Exception;
	List<CCoupone> membercount(int scno) throws Exception;
	void payCount(HashMap<String, Object> paramMap) throws Exception;
	Mileage findRate(int sno)throws Exception;
	StoreClient getStoreClient(int scno)throws Exception;
	void stackMileage(HashMap<String, Object> paramMap)throws Exception;
	void changeMileage(HashMap<String, Object> paramMap)throws Exception;
	void usingPoint(HashMap<String, Object> paramMap)throws Exception;
	void stackStamp(HashMap<String, Object> paramMap)throws Exception;
	List<Stamp> findStampRate(int sno)throws Exception;
	void addStampCoupone(HashMap<String, Object> paramMap)throws Exception;
	Event getStampEvent(int sno) throws Exception;
	List<Event> getStampEventLevel2(int sno)throws Exception;
	String getCdevice(String barcode)throws Exception;
	String getStoreName(int sno)throws Exception;

}