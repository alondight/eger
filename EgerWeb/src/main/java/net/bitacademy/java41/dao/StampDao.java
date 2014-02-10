package net.bitacademy.java41.dao;

import java.util.Map;

public interface StampDao {
	int setStampLevel1(Map<String, Object> paramMap) throws Exception;
	int orderStampLevel2(Map<String, Object> paramMap) throws Exception;
	int serchStamp(Map<String, Object> paramMap) throws Exception;
//	int setCoupone(Map<String, Object> paramMap) throws Exception;
//	List<Event> couponesList(int sno) throws Exception;
//	void deleteCoupone(int coupone_no) throws Exception;
//	Mileage getCheckMileage(int sno) throws Exception;
}