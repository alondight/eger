package net.bitacademy.java41.dao;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.vo.Category;
import net.bitacademy.java41.vo.Store;

public interface StoreDao {
	List<Category> getCategorys() throws Exception;
	int add(Store store)throws Exception;
	Store getStore(HashMap<String, Object> paramMap) throws Exception;
	int passwordChange(HashMap<String, Object> paramMap) throws Exception;
	int update(Store store) throws Exception;
	void addStoreMileage(int sno)throws Exception;
	
}