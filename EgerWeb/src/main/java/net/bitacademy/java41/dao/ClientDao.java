package net.bitacademy.java41.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.Store;

public interface ClientDao {
	Client getClient(Map<String,String> paramMap) throws Exception;
	int add(Client client) throws Exception;
	List<Store> getStoreClient(String barcode)throws Exception;
	String signUpcheck(String cemail)throws Exception;
	Client passwordChange(String cemail, int password) throws Exception;
	int clientPasswordChange(Map<String, String> paramMap) throws Exception;
	int cPasswordChange(HashMap<String, Object> paramMap) throws Exception;
	void setCDevice(Map<String,String> paramMap) throws Exception;
}