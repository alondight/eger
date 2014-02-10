package net.bitacademy.java41.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;

public interface EventDao {
	
	Mileage getCheckMileage(int sno) throws Exception;
	int setMileage(Map<String, Object> paramMap) throws Exception;
	List<Stamp> getCheckStamp(int sno)throws Exception;
	int setStampLevel1(Map<String, Object> paramMap) throws Exception;
	int orderStampLevel2(Map<String, Object> paramMap) throws Exception;
	int serchStamp(Map<String, Object> paramMap) throws Exception;
	void deleteStamp(int sno)throws Exception;
	List<Event> couponesList(int sno) throws Exception;
	int setCoupone(Event event) throws Exception;
	void deleteCoupone(int coupone_no) throws Exception;
	void deleteClientCoupone(int coupone_no) throws Exception;
	void setStampCoupone(Event event) throws Exception;
	void deleteStampCoupone(int sno)throws Exception;
	List<Integer> selectStampCouponeNo(int sno)throws Exception;
	List<String> getCdeviceList(List<Integer> list)throws Exception;
	
	
	
}