package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Category;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.Store;

public interface AuthService {
	int signUp(Store store) throws Exception;
	List<Category> getCategorys() throws Exception;
	Store getStore(int sno, String pwd) throws Exception;
	int passwordChange(int sno, String password) throws Exception;
	int update(Store store) throws Exception;
	Client getClient(String email, String password, String regid) throws Exception;
	int signUp(Client client) throws Exception;
	int clientPasswordChange(String email, String md5Password, String password) throws Exception;
	int cPasswordChange(String barcode, String password)  throws Exception;
}
