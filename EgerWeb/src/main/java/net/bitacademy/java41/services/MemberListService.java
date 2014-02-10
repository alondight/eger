package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.CCoupone;
import net.bitacademy.java41.vo.StoreClient;

public interface MemberListService {
	List<StoreClient> memberList(int sno)throws Exception;
	List<CCoupone> membercount(int scno)throws Exception;
	void payCount(int scno, List<Integer> list)throws Exception;
	void StackMileage(int cashpay, int cardpay, int usingPoint, int sno, int scno)throws Exception;
	void stackStamp(int scno, int sno)throws Exception;
	
}

