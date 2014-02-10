package net.bitacademy.java41.dao;

public interface QuartzDao {
	void deleteOldCcoupone() throws Exception;
	void deleteOldEventCCoupone() throws Exception;
	void deleteOldEvent() throws Exception;
	
}