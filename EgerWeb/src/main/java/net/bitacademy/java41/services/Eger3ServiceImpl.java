package net.bitacademy.java41.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.Eger3Dao;
import net.bitacademy.java41.dao.Eger4Dao;
import net.bitacademy.java41.dao.MemberListDao;
import net.bitacademy.java41.vo.CMileage;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Stamp;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.android.gcm.server.Message;

@Service
public class Eger3ServiceImpl implements Eger3Service{
	@Autowired Eger3Dao eger3Dao;
	@Autowired Eger4Dao eger4Dao;
	@Autowired MemberListDao memberListDao;

	public List<Store> getStoreList(String barcode) throws Exception {
		
		List<Store> list= eger3Dao.getStoreList(barcode);
		HashMap<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("barcode", barcode);

		for(Store s: list){
			int feedCount = eger4Dao.feedCount(s.getSno());
			s.setFeedcount(feedCount);
			int memberCount = eger4Dao.memberCount(s.getSno());
			s.setMembercount(memberCount);
			s.setMileage(eger4Dao.mileageRate(s.getSno()));
			s.setStamp(eger4Dao.stampRate(s.getSno()));
			
			paramMap.put("sno", s.getSno());
			s.setCouponCount(eger3Dao.couponCount(paramMap));
		}
		return list;
	}
	public List<Store> storesearch(String inputsname,String barcode) throws Exception {
		try {
			
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("barcode", barcode);
			paramMap.put("inputsname", "%"+inputsname+"%");
			List<Store> list= eger3Dao.storesearch(paramMap);

			for(Store s: list){
				int feedCount = eger4Dao.feedCount(s.getSno());
				s.setFeedcount(feedCount);
				int memberCount = eger4Dao.memberCount(s.getSno());
				s.setMembercount(memberCount);
				s.setMileage(eger4Dao.mileageRate(s.getSno()));
				s.setStamp(eger4Dao.stampRate(s.getSno()));
			}
			return list;
		} catch (Exception e) {
			throw e;
		} 
	}
	
	public HashMap<String, Object> getStoreView(String barcode, int sno) throws Exception {
		HashMap<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("barcode", barcode);
		paramMap.put("sno", sno);
		StoreClient storeclient = eger3Dao.getScno(paramMap); 
		List<CMileage> list = eger3Dao.getCmileage(storeclient.getScno());
		List<Event> event = eger3Dao.getEvent(storeclient.getScno());
		List<Stamp> stamp = eger3Dao.getStamp(sno);
		HashMap<String,Object> param = new HashMap<String, Object>();
		param.put("StoreClient",storeclient);
		param.put("CMileage", list);
		param.put("Event", event);
		param.put("Stamp", stamp);
		
		return param;
	}
	@Override
	public int stampToEvent(int scno, int stamp_rate) throws Exception {
		try {
			
			StoreClient storeClient = memberListDao.getStoreClient(scno);
			int stackStamp = storeClient.getStackstamp()-stamp_rate;
			HashMap<String,Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("scno",scno);
			paramMap1.put("stackStamp",stackStamp);
			memberListDao.stackStamp(paramMap1);
			
			List<Event> eventList = memberListDao.getStampEventLevel2(storeClient.getSno());
			for(int i =0; i < eventList.size(); i++){
				if(stamp_rate == Integer.parseInt(eventList.get(i).getEcondition())){
					HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
					paramMap2.put("coupone_no",eventList.get(i).getCoupone_no());
					paramMap2.put("scno",scno);
					memberListDao.addStampCoupone(paramMap2);
				}
			}
			
			return 1;
		} catch (Exception e) {
			throw e;
		} 
	}
}
