package net.bitacademy.java41.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.vo.Store;


public interface Eger3Service {
	List<Store> getStoreList(String barcode) throws Exception;
	List<Store> storesearch(String inputsname, String string)throws Exception;
	HashMap<String, Object> getStoreView(String barcode, int sno) throws Exception;
	int stampToEvent(int scno, int stamp_rate) throws Exception;
}
