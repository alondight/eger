package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Feed;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;

public interface Eger4Service {
	List<Store> categoryselect(int cateno) throws Exception; 
	List<Store> zoneselect(String zoneName) throws Exception; 
	List<Store> categoryAndZoneSelect(int cateno, String zoneName) throws Exception;
	List<Store> storesearch(String inputsname) throws Exception; 
	List<Store> todayAddStoreList(Double x, Double y)throws Exception;;
	List<Store> storeList(Double x, Double y) throws Exception;
	Store storeview(int sno) throws Exception; 
	List<Feed> feedList(int sno) throws Exception;
	int storeadd(int sno, String barcode) throws Exception; 
	int feedAdd(String fcontent, int sno, String barcode, int fscore) throws Exception;
	int feeddelete(int fno) throws Exception;
	StoreClient storeMemberCheck(int sno, String barcode) throws Exception;
	List<Feed> feedscore(int sno) throws Exception;
}
