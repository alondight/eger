package net.bitacademy.java41.services;

import java.util.ArrayList;
import java.util.List;

import net.bitacademy.java41.dao.ClientDao;
import net.bitacademy.java41.dao.Eger4Dao;
import net.bitacademy.java41.vo.Store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class Eger1ServiceImpl implements Eger1Service{
	@Autowired PlatformTransactionManager txManager;
	@Autowired ClientDao clientDao;
	@Autowired Eger4Dao eger4Dao;

	
	@Override
	public List<Store> storeList(Double x, Double y) throws Exception {
		try {
			List<Store> li = new ArrayList<Store>();
			List<Store> list =  eger4Dao.list();
			Double distance = null;
			int nearCount = -1;
			if(list.size() > 4){
				for(Store s: list){
					Double distancetest = this.Distance(x, y, s.getXlocation(), s.getYlocation());
					s.setDistance(distancetest);
				}
				for(int i=0; i < 4; i++){
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
				return list;
			}
		} catch (Exception e) {
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

}
