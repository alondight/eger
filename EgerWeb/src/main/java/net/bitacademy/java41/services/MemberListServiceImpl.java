package net.bitacademy.java41.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.EventDao;
import net.bitacademy.java41.dao.MemberListDao;
import net.bitacademy.java41.vo.CCoupone;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;
import net.bitacademy.java41.vo.StoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.Sender;

@Service
public class MemberListServiceImpl implements MemberListService{
	@Autowired PlatformTransactionManager txManager;
	@Autowired MemberListDao memberListDao;
	@Autowired EventDao eventDao;

	public static final String API_KEY = "AIzaSyAvg-Nk0y4jMpYO56rRj3cTGJRMs-TPYTE";

	public List<StoreClient> memberList(int sno) throws Exception {
		try{
			return memberListDao.memberList(sno);
		}catch(Exception e){
			throw e;
		}
	}

	@Override
	public List<CCoupone> membercount(int scno) throws Exception {
		try{
			return memberListDao.membercount(scno);
		}catch(Exception e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void payCount(int scno, List<Integer> list) throws Exception {
		try{
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("scno",scno);
			paramMap.put("list", list);
			memberListDao.payCount(paramMap);
			
			Sender sender = new Sender(API_KEY);
			StoreClient storeClient = memberListDao.getStoreClient(scno);
			String regid = memberListDao.getCdevice(storeClient.getBarcode());
			Message message = new Message.Builder().addData("message","쿠폰이 사용되었습니다." ).build();
			sender.send(message, regid, 5);
			
		}catch(Exception e){
			throw e;
		}

	}
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void StackMileage(int cashpay, int cardpay, int usingPoint,
			int sno, int scno) throws Exception {

		try{
			Mileage mileage = memberListDao.findRate(sno);
			StoreClient storeClient = memberListDao.getStoreClient(scno);
			int cash = cashpay * mileage.getCash_mileAge_rate()/100;
			int card = cardpay * mileage.getCard_mileAge_rate()/100;
			int changeMileage= cash+card;
			int stackMileage = storeClient.getStackmileage()+changeMileage-usingPoint;
			int usedPoint = -usingPoint;
			
			
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("scno",scno);
			paramMap.put("stackMileage", stackMileage);
			memberListDao.stackMileage(paramMap);

			if(changeMileage != 0){
				HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
				paramMap2.put("scno",scno);
				paramMap2.put("changeMileage", changeMileage);
				memberListDao.changeMileage(paramMap2);
				
				Sender sender = new Sender(API_KEY);
				String regid = memberListDao.getCdevice(storeClient.getBarcode());
				Message message = new Message.Builder().addData("message","마일리지가 "+changeMileage+"원 적립되었습니다." ).build();
				List<String> list = new ArrayList<String>();
				list.add(regid);
				sender.send(message, list, 5);
			}
			if(usingPoint  != 0){
				HashMap<String,Object> paramMap3 = new HashMap<String, Object>();
				paramMap3.put("scno",scno);
				paramMap3.put("usedPoint", usedPoint);
				memberListDao.usingPoint(paramMap3);
				
				Sender sender = new Sender(API_KEY);
				String regid = memberListDao.getCdevice(storeClient.getBarcode());
				Message message = new Message.Builder().addData("message","마일리지가 "+usingPoint+"원 사용되었습니다." ).build();
				List<String> list = new ArrayList<String>();
				list.add(regid);
				sender.send(message, list, 5);
			}
		}catch(Exception e){
			throw e;
		}

	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public void stackStamp(int scno, int sno) throws Exception {
		try{
			StoreClient storeClient = memberListDao.getStoreClient(scno);
			List<Stamp> list = memberListDao.findStampRate(sno);

			int stackStamp = storeClient.getStackstamp()+1;
			int stampLevel = list.get(0).getStamp_level();
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("scno",scno);
			paramMap.put("stackStamp",stackStamp);
			memberListDao.stackStamp(paramMap);

			Sender sender = new Sender(API_KEY);
			String regid = memberListDao.getCdevice(storeClient.getBarcode());
			System.out.println(regid);
			Message message = new Message.Builder().addData("message","스탬프가1개적립되었습니다." ).build();
			sender.send(message, regid, 5);
			
			switch(stampLevel){
			case 1:	
				if(stackStamp == list.get(0).getStamp_rate()){
					HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
					paramMap1.put("scno",scno);
					paramMap1.put("stackStamp",0);
					memberListDao.stackStamp(paramMap1);

					Event event = memberListDao.getStampEvent(sno);
					HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
					paramMap2.put("coupone_no",event.getCoupone_no());
					paramMap2.put("scno",scno);
					memberListDao.addStampCoupone(paramMap2);
					
					
					Sender sender2 = new Sender(API_KEY);
					String regid2 = memberListDao.getCdevice(storeClient.getBarcode());
					Message message2 = new Message.Builder().addData("message","스탬프적립으로 쿠폰이 추가되었습니다." ).build();
					sender2.send(message2, regid2, 5);
				}
				break;
			case 2:
				List<Event> eventList = memberListDao.getStampEventLevel2(sno);
				for(int i =0; i < eventList.size(); i++){
					if(stackStamp == list.get(i).getStamp_rate()){
						HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
						paramMap1.put("coupone_no",eventList.get(i).getCoupone_no());
						paramMap1.put("scno",scno);
						memberListDao.addStampCoupone(paramMap1);
						
						Sender sender2 = new Sender(API_KEY);
						String regid2 = memberListDao.getCdevice(storeClient.getBarcode());
						Message message2 = new Message.Builder().addData("message","스탬프적립으로 쿠폰이 추가되었습니다." ).build();
						sender2.send(message2, regid2, 5);

					}
				}

				if(stackStamp == list.get(eventList.size()-1).getStamp_rate()){
					HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
					paramMap2.put("scno",scno);
					paramMap2.put("stackStamp",0);
					memberListDao.stackStamp(paramMap2);
				}
				break;
			case 3:
				if(stackStamp >= list.get(0).getStamp_rate()){
					
					Sender sender2 = new Sender(API_KEY);
					String regid2 = memberListDao.getCdevice(storeClient.getBarcode());
					Message message2 = new Message.Builder()
					.addData("dialog","적립된 스탬프를 쿠폰으로 사용가능합니다. MyStore에서 확인하세요.")
					.addData("data", String.valueOf(sno))
					.addData("data2",memberListDao.getStoreName(sno))
					.build();
					sender2.send(message2, regid2, 5);
				}
				break;
			}

		}catch(Exception e){
			throw e;
		}

	}


}
