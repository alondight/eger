package net.bitacademy.java41.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.EventDao;
import net.bitacademy.java41.dao.MemberListDao;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.Sender;

@Service
public class EventServiceImpl implements EventService{
	@Autowired PlatformTransactionManager txManager;
	@Autowired EventDao eventDao;
	@Autowired MemberListDao memberListDao;

	
	public static final String API_KEY = "AIzaSyAvg-Nk0y4jMpYO56rRj3cTGJRMs-TPYTE";
	
	//Mileage
	public Mileage getCheckMileage(int sno) throws Exception {
		return eventDao.getCheckMileage(sno);
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int mileagePercent(Mileage mileage) throws Exception{
		try{

			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sno", mileage.getSno());
			paramMap.put("cash_mileAge_rate",mileage.getCash_mileAge_rate());
			paramMap.put("card_mileAge_rate", mileage.getCard_mileAge_rate());
			return eventDao.setMileage(paramMap);
		} catch (Exception e){
			throw e;
		}
	}

	//스탬프
	@Override
	public List<Stamp> getLoadStamp(int sno) throws Exception {
		return eventDao.getCheckStamp(sno);
	}

	//스탬프 레벨1변경
	@Override
	public void stampLevel1Add(int sno, int stamp_Rate,
			java.lang.String stamp_Content, java.lang.String stamp_start,
			java.lang.String stamp_end) throws Exception {
		try{
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sno", sno);
			paramMap.put("stamp_Rate", stamp_Rate);
			paramMap.put("stamp_Content", stamp_Content);
			paramMap.put("stamp_start", stamp_start);
			paramMap.put("stamp_end", stamp_end);
			paramMap.put("stamp_Level", 1);

			this.deleteStamp(sno);
			eventDao.setStampLevel1(paramMap);

			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));

			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);

			eventDao.setStampCoupone(event);
		} catch (Exception e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	private void deleteEvent(int sno) throws Exception{
		try {
			eventDao.deleteStampCoupone(sno);
		} catch (Exception e) {
			throw e;
		}

	}

	//스탬프 레벨2변경
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void orderStamp(int sno, int stamp_Rate, String stamp_Content,String stamp_start,String stamp_end) throws Exception {
		try{
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("sno", sno);
			paramMap1.put("stamp_Rate", stamp_Rate);
			paramMap1.put("stamp_Content", stamp_Content);
			paramMap1.put("stamp_start", stamp_start);
			paramMap1.put("stamp_end", stamp_end);
			paramMap1.put("stamp_Level", 2);

			this.deleteStamp(sno);
			eventDao.orderStampLevel2(paramMap1);

			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));
			
			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);

			eventDao.setStampCoupone(event);

		} catch (Exception e){
			throw e;
		}

	}
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void orderStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start,String stamp_end, int stamp_Rate2, String stamp_Content2,
			String stamp_start2,String stamp_end2) throws Exception {
		try{
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("sno", sno);
			paramMap1.put("stamp_Rate", stamp_Rate);
			paramMap1.put("stamp_Content", stamp_Content);
			paramMap1.put("stamp_start", stamp_start);
			paramMap1.put("stamp_end", stamp_end);
			paramMap1.put("stamp_Level", 2);

			HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
			paramMap2.put("sno", sno);
			paramMap2.put("stamp_Rate", stamp_Rate2);
			paramMap2.put("stamp_Content", stamp_Content2);
			paramMap2.put("stamp_start", stamp_start2);
			paramMap2.put("stamp_end", stamp_end2);
			paramMap2.put("stamp_Level", 2);



			this.deleteStamp(sno);
			eventDao.orderStampLevel2(paramMap1);
			eventDao.orderStampLevel2(paramMap2);

			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));
			Event event2 = new Event().setSno(sno).setEcontent(stamp_Content2)
					.setEtime(stamp_start2+"~"+stamp_end2).setEcondition(String.valueOf(stamp_Rate2));


			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);

			eventDao.setStampCoupone(event);
			eventDao.setStampCoupone(event2);
		} catch (Exception e){
			throw e;
		}

	}
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void orderStamp(int sno, int stamp_Rate, String stamp_Content,String stamp_start,String stamp_end
			,int stamp_Rate2, String stamp_Content2, String stamp_start2,String stamp_end2,
			int stamp_Rate3, String stamp_Content3, String stamp_start3,String stamp_end3) throws Exception{
		try{
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("sno", sno);
			paramMap1.put("stamp_Rate", stamp_Rate);
			paramMap1.put("stamp_Content", stamp_Content);
			paramMap1.put("stamp_start", stamp_start);
			paramMap1.put("stamp_end", stamp_end);
			paramMap1.put("stamp_Level", 2);

			HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
			paramMap2.put("sno", sno);
			paramMap2.put("stamp_Rate", stamp_Rate2);
			paramMap2.put("stamp_Content", stamp_Content2);
			paramMap2.put("stamp_start", stamp_start2);
			paramMap2.put("stamp_end", stamp_end2);
			paramMap2.put("stamp_Level", 2);

			HashMap<String,Object> paramMap3 = new HashMap<String, Object>();
			paramMap3.put("sno", sno);
			paramMap3.put("stamp_Rate", stamp_Rate3);
			paramMap3.put("stamp_Content", stamp_Content3);
			paramMap3.put("stamp_start", stamp_start3);
			paramMap3.put("stamp_end", stamp_end3);
			paramMap3.put("stamp_Level", 2);

			this.deleteStamp(sno);
			eventDao.orderStampLevel2(paramMap1);
			eventDao.orderStampLevel2(paramMap2);
			eventDao.orderStampLevel2(paramMap3);


			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));
			Event event2 = new Event().setSno(sno).setEcontent(stamp_Content2)
					.setEtime(stamp_start2+"~"+stamp_end2).setEcondition(String.valueOf(stamp_Rate2));
			Event event3 = new Event().setSno(sno).setEcontent(stamp_Content3)
					.setEtime(stamp_start3+"~"+stamp_end3).setEcondition(String.valueOf(stamp_Rate3));

			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);

			eventDao.setStampCoupone(event);
			eventDao.setStampCoupone(event2);
			eventDao.setStampCoupone(event3);
		} catch (Exception e){
			throw e;
		}
	}

	//스탬프 레벨3변경
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void serchStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start,String stamp_end) throws Exception {
		try{
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("sno", sno);
			paramMap1.put("stamp_Rate", stamp_Rate);
			paramMap1.put("stamp_Content", stamp_Content);
			paramMap1.put("stamp_start", stamp_start);
			paramMap1.put("stamp_end", stamp_end);
			paramMap1.put("stamp_Level", 3);

			this.deleteStamp(sno);
			eventDao.serchStamp(paramMap1);


			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));
			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);

			eventDao.setStampCoupone(event);
		} catch (Exception e){
			throw e;
		}

	}
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void serchStamp(int sno, int stamp_Rate, String stamp_Content,
			String stamp_start,String stamp_end, int stamp_Rate2, String stamp_Content2,
			String stamp_start2,String stamp_end2) throws Exception {
		try{
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("sno", sno);
			paramMap1.put("stamp_Rate", stamp_Rate);
			paramMap1.put("stamp_Content", stamp_Content);
			paramMap1.put("stamp_start", stamp_start);
			paramMap1.put("stamp_end", stamp_end);
			paramMap1.put("stamp_Level", 3);

			HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
			paramMap2.put("sno", sno);
			paramMap2.put("stamp_Rate", stamp_Rate2);
			paramMap2.put("stamp_Content", stamp_Content2);
			paramMap2.put("stamp_start", stamp_start2);
			paramMap2.put("stamp_end", stamp_end2);
			paramMap2.put("stamp_Level", 3);

			this.deleteStamp(sno);
			eventDao.serchStamp(paramMap1);
			eventDao.serchStamp(paramMap2);


			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));

			Event event2 = new Event().setSno(sno).setEcontent(stamp_Content2)
					.setEtime(stamp_start2+"~"+stamp_end2).setEcondition(String.valueOf(stamp_Rate2));


			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);


			eventDao.setStampCoupone(event);
			eventDao.setStampCoupone(event2);
		} catch (Exception e){
			throw e;
		}

	}


	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void serchStamp(int sno, int stamp_Rate, String stamp_Content,String stamp_start,String stamp_end,
			int stamp_Rate2, String stamp_Content2, String stamp_start2,String stamp_end2,
			int stamp_Rate3, String stamp_Content3, String stamp_start3,String stamp_end3) throws Exception{
		try{
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("sno", sno);
			paramMap1.put("stamp_Rate", stamp_Rate);
			paramMap1.put("stamp_Content", stamp_Content);
			paramMap1.put("stamp_start", stamp_start);
			paramMap1.put("stamp_end", stamp_end);
			paramMap1.put("stamp_Level", 3);

			HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
			paramMap2.put("sno", sno);
			paramMap2.put("stamp_Rate", stamp_Rate2);
			paramMap2.put("stamp_Content", stamp_Content2);
			paramMap2.put("stamp_start", stamp_start2);
			paramMap2.put("stamp_end", stamp_end2);
			paramMap2.put("stamp_Level", 3);

			HashMap<String,Object> paramMap3 = new HashMap<String, Object>();
			paramMap3.put("sno", sno);
			paramMap3.put("stamp_Rate", stamp_Rate3);
			paramMap3.put("stamp_Content", stamp_Content3);
			paramMap3.put("stamp_start", stamp_start3);
			paramMap3.put("stamp_end", stamp_end3);
			paramMap3.put("stamp_Level", 3);



			this.deleteStamp(sno);
			eventDao.serchStamp(paramMap1);
			eventDao.serchStamp(paramMap2);
			eventDao.serchStamp(paramMap3);


			Event event = new Event().setSno(sno).setEcontent(stamp_Content)
					.setEtime(stamp_start+"~"+stamp_end).setEcondition(String.valueOf(stamp_Rate));

			Event event2 = new Event().setSno(sno).setEcontent(stamp_Content2)
					.setEtime(stamp_start2+"~"+stamp_end2).setEcondition(String.valueOf(stamp_Rate2));

			Event event3 = new Event().setSno(sno).setEcontent(stamp_Content3)
					.setEtime(stamp_start3+"~"+stamp_end3).setEcondition(String.valueOf(stamp_Rate3));

			List<Integer> Coupone_no = eventDao.selectStampCouponeNo(sno);

			for(Integer i : Coupone_no){
				eventDao.deleteClientCoupone(i);
			}
			this.deleteEvent(sno);


			eventDao.setStampCoupone(event);
			eventDao.setStampCoupone(event2);
			eventDao.setStampCoupone(event3);
		} catch (Exception e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void deleteStamp(int sno) throws Exception {
		try{
			eventDao.deleteStamp(sno);
		} catch (Exception e){
			throw e;
		}

	}
	public List<Event> getLoadCoupones(int sno) throws Exception {
		try{
			return eventDao.couponesList(sno);
		} catch (Exception e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void couponeprint(Event event) throws Exception{
		try{
			eventDao.setCoupone(event);
			List<Integer> list = memberListDao.memberSCNO(event.getSno());
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("coupone_no",event.getCoupone_no() );
			paramMap.put("list", list);
			memberListDao.addClientCoupone(paramMap);
			
			ArrayList<String> cdeviceList = (ArrayList<String>) eventDao.getCdeviceList(list);
			Sender sender = new Sender(API_KEY);
			Message message = new Message.Builder().addData("message","새로운 쿠폰이 도착하였습니다." ).build();
			sender.send(message, cdeviceList, 5);
		} catch (Exception e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void removeCoupone(int coupone_no) throws Exception{
		try {
			eventDao.deleteClientCoupone(coupone_no);
			eventDao.deleteCoupone(coupone_no);
		} catch (Exception e) {
			throw e;
		} 
	}

}
