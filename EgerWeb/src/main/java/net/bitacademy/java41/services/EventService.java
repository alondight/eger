package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;

public interface EventService {
	
	Mileage getCheckMileage(int sno) throws Exception;
	int mileagePercent(Mileage mileage)throws Exception;
	List<Stamp> getLoadStamp(int sno)throws Exception;
	void stampLevel1Add(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start, String stamp_end) throws Exception;
	
	
	void deleteStamp(int sno)throws Exception;
	void orderStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start, String stamp_end)throws Exception;
	void orderStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start, String stamp_end, int stamp_Rate2, String stamp_Content2,
			String stamp_start2, String stamp_end2)throws Exception;
	void orderStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start, String stamp_end, int stamp_Rate2, String stamp_Content2, String stamp_start2, String stamp_end2, int stamp_Rate3, String stamp_Content3, String stamp_start3, String stamp_end3) throws Exception;
	void serchStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start,String stamp_end, int stamp_Rate2, String stamp_Content2,
			String stamp_start2,String stamp_end2)throws Exception;
	void serchStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start,String stamp_end)throws Exception;
	void serchStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start,String stamp_end, int stamp_Rate2, String stamp_Content2, String stamp_start2,String stamp_end2, int stamp_Rate3, String stamp_Content3, String stamp_start3,String stamp_end3) throws Exception;
	List<Event> getLoadCoupones(int sno) throws Exception;
	void couponeprint(Event event) throws Exception;
	void removeCoupone(int coupone_no) throws Exception;
	
	
	
	
	
	
	
	
	
	




	
	
}

