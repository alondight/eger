package net.bitacademy.java41.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.Eger4Dao;
import net.bitacademy.java41.vo.Feed;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class Eger4ServiceImpl implements Eger4Service{
	@Autowired PlatformTransactionManager txManager;
	@Autowired Eger4Dao eger4Dao;


	public List<Store> categoryselect(int cateno) throws Exception {
		try {
			List<Store> list= eger4Dao.categoryselect(cateno);

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
	public List<Store> zoneselect(String zoneName) throws Exception {
		try {

			List<Store> list= eger4Dao.zoneselect("_______" + zoneName + "%");

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
	public List<Store> categoryAndZoneSelect(int cateno, String zoneName)
			throws Exception {
		try {
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("cateno", cateno);
			paramMap.put("zoneName", "_______" + zoneName + "%");

			List<Store> list= eger4Dao.categoryAndZoneSelect(paramMap);

			for(Store s: list){
				int feedCount = eger4Dao.feedCount(s.getSno());
				s.setFeedcount(feedCount);
				int memberCount = eger4Dao.memberCount(s.getSno());
				s.setMembercount(memberCount);
				s.setMileage(eger4Dao.mileageRate(s.getSno()));
				s.setStamp(eger4Dao.stampRate(s.getSno()));
			}
			return list;
		} catch (Exception e){
			throw e;
		}
	}
	public List<Store> storesearch(String inputsname) throws Exception {
		try {


			List<Store> list= eger4Dao.storesearch("%" + inputsname + "%");

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
	public List<Store> todayAddStoreList(Double x, Double y) throws Exception {
		try {
			List<Store> l = new ArrayList<Store>();
			List<Store> li = new ArrayList<Store>();
			List<Store> list= eger4Dao.todayAddStoreList();
			Double distance = null;
			int membering=0;
			int nearCount = -1;
			int nearMembering = -1;
			if(list.size() > 3){
				for(Store s: list){
					Double distancetest = this.Distance(x, y, s.getXlocation(), s.getYlocation());
					s.setDistance(distancetest);
					int feedCount = eger4Dao.feedCount(s.getSno());
					if(feedCount > 0) {
						s.setFeedcount(feedCount);
					}
					int memberCount = eger4Dao.memberCount(s.getSno());
					if(memberCount > 0){
						s.setMembercount(memberCount);
					}
					
					if(eger4Dao.mileageRate(s.getSno()).getCard_mileAge_rate() > 0
							|| eger4Dao.mileageRate(s.getSno()).getCash_mileAge_rate() > 0){
						s.setMileage(eger4Dao.mileageRate(s.getSno()));
					}
					
					if(eger4Dao.stampRate(s.getSno()).size() > 0){
						s.setStamp(eger4Dao.stampRate(s.getSno()));
					}
				}
				if(list.size() > 10){
					for(int i=0; i < 10; i++){
						for(int j =0; j<list.size(); j++){
							if(distance == null  || list.get(j).getDistance() < distance){
								distance = list.get(j).getDistance();
								nearCount=j;
							}
						}
						distance = null;
						li.add(list.get(nearCount));
						list.remove(nearCount);
					}
				}else{
					int temp = list.size(); 
					
 					for(int i=0; i < temp; i++){
						for(int j =0; j<list.size(); j++){
							if(distance == null  || list.get(j).getDistance() < distance){
								distance = list.get(j).getDistance();
								nearCount=j;
							}
						}
						distance = null;
						li.add(list.get(nearCount));
						list.remove(nearCount);
					}
				}
				for(int z=0; z < 3; z++){
					for(int m =0; m<li.size(); m++){
						if(membering == 0 || li.get(m).getMembercount() > membering){
							membering = li.get(m).getMembercount();
							nearMembering=m;
						}
					}
					membering = 0;
					l.add(li.get(nearMembering));
					li.remove(nearMembering);
				}
				return l;
			}else{
				for(Store s: list){
					int feedCount = eger4Dao.feedCount(s.getSno());
					s.setFeedcount(feedCount);
					int memberCount = eger4Dao.memberCount(s.getSno());
					s.setMembercount(memberCount);
					s.setMileage(eger4Dao.mileageRate(s.getSno()));
					s.setStamp(eger4Dao.stampRate(s.getSno()));
				}
				return list;
			}
		} catch (Exception e) {
			throw e;
		} 
	}

	public List<Store> storeList(Double x, Double y) throws Exception {
		try {
			List<Store> li = new ArrayList<Store>();
			List<Store> list =  eger4Dao.list();
			Double distance = null;
			int nearCount = -1;
			if(list.size() > 10){
				for(Store s: list){
					Double distancetest = this.Distance(x, y, s.getXlocation(), s.getYlocation());
					s.setDistance(distancetest);
					int feedCount = eger4Dao.feedCount(s.getSno());
					s.setFeedcount(feedCount);
					int memberCount = eger4Dao.memberCount(s.getSno());
					s.setMembercount(memberCount);
					s.setMileage(eger4Dao.mileageRate(s.getSno()));
					s.setStamp(eger4Dao.stampRate(s.getSno()));
					String score = eger4Dao.storeStarScore(s.getSno());
					s.setStarScoreAvg(score);
				}
				for(int i=0; i < 10; i++){
					for(int j =0; j<list.size(); j++){
						if(distance == null  || list.get(j).getDistance() < distance){
							distance = list.get(j).getDistance();
							nearCount=j;
						}
					}
					distance = null;
					li.add(list.get(nearCount));
					list.remove(nearCount);
				}
				return li;
			}else{
				for(Store s: list){
					int feedCount = eger4Dao.feedCount(s.getSno());
					s.setFeedcount(feedCount);
					int memberCount = eger4Dao.memberCount(s.getSno());
					s.setMembercount(memberCount);
					s.setMileage(eger4Dao.mileageRate(s.getSno()));
					s.setStamp(eger4Dao.stampRate(s.getSno()));
					s.setStarScoreAvg(eger4Dao.storeStarScore(s.getSno()));
				}
				return list;
			}
		} catch (Exception e) {
			throw e;
		} 
	}

	
	public Store storeview(int sno) throws Exception {
		try {
			Store store =  eger4Dao.view(sno);
			store.setMileage(eger4Dao.mileageRate(sno));
			store.setEvent(eger4Dao.storeViewEvent(sno));
			return store;
		} catch (Exception e) {
			throw e;
		} 
	}

	public List<Feed> feedList(int sno) throws Exception {
		try {
			return eger4Dao.feedList(sno);
		} catch (Exception e) {
			throw e;
		} 
	}
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int storeadd(int sno, String barcode) throws Exception {
		try {
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sno", sno);
			paramMap.put("barcode", barcode);
			paramMap.put("stackstamp", 0);
			paramMap.put("stackmileage", 0);
			int count = eger4Dao.storeadd(paramMap);
			
			List<Integer> list = eger4Dao.storeCouponCheck(sno);
			if(list.size() > 0) {
				HashMap<String,Object> paramMap2 = new HashMap<String, Object>();
				paramMap2.put("barcode",barcode);
				paramMap2.put("sno", sno);
				int scno = eger4Dao.scnoCheck(paramMap2);
				
				
				HashMap<String,Object> paramMap3 = new HashMap<String, Object>();
				paramMap3.put("scno", scno);
				paramMap3.put("list", list);
				eger4Dao.autoCouponAdd(paramMap3);
			}
			
				return count;
		} catch (Exception e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int feedAdd(String fcontent, int sno, String barcode,int fscore) throws Exception {
		try{
			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sno", sno);
			paramMap.put("fcontent", fcontent);
			paramMap.put("barcode", barcode);
			if(fscore == 0 ){
				paramMap.put("fscore", null);
			}else{
				paramMap.put("fscore", fscore);
			}
			return eger4Dao.addFeed(paramMap);
		} catch (Exception e){
			throw e;
		}
	}
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int feeddelete(int fno) throws Exception {
		try{
			return eger4Dao.feeddelete(fno);
		}catch(Exception e){
			throw e;
		}
	}
	public double Distance(double lat1, double lon1, double lat2, double lon2){
		double theta, dist;
		theta = lon1 - lon2;

		dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
				* Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		return dist;
	}

	private double deg2rad(double deg){
		return (double)(deg * Math.PI / (double)180d);
	}

	private double rad2deg(double rad){
		return (double)(rad * (double)180d / Math.PI);
	}
	@Override
	public StoreClient storeMemberCheck(int sno, String barcode) throws Exception {
		HashMap<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sno", sno);
		paramMap.put("barcode", barcode);
		Object check = eger4Dao.storeMemberCheck(paramMap);
		if(check == null){
			return null;
		} else {
			return eger4Dao.storeMemberCheck(paramMap);
		}
	}
	@Override
	public List<Feed> feedscore(int sno) throws Exception {
		try {
			return eger4Dao.feedscore(sno);
		} catch (Exception e) {
			throw e;
		} 
	}
//	@Override
//	public List<Feed> storeStarScore(int sno) throws Exception {
//		try {
//			return eger4Dao.storeStarScore(sno);
//		} catch (Exception e) {
//			throw e;
//		} 
//	}


}
