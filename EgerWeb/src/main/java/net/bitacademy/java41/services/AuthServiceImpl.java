package net.bitacademy.java41.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

import javax.mail.MessagingException;

import net.bitacademy.java41.MailHandler;
import net.bitacademy.java41.dao.ClientDao;
import net.bitacademy.java41.dao.StoreDao;
import net.bitacademy.java41.impl.SecureMailHandler;
import net.bitacademy.java41.vo.Category;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.Store;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService{
	@Autowired PlatformTransactionManager txManager;
	@Autowired StoreDao storeDao;
	@Autowired ClientDao clientDao;



	public Store getStore(int sno, String password) throws Exception{
		HashMap<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sno", sno);
		paramMap.put("password", password);
		Store store = storeDao.getStore(paramMap);

		return store;
	}



	@Override
	public List<Category> getCategorys() throws Exception {
		try {
			return storeDao.getCategorys();
		} catch (Exception e) {
			throw e;
		}

	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int signUp(Store store) throws Exception {
		URL googleUrl;
		StringBuffer sb = new StringBuffer();
		
		try {
			String query=store.getS_address().substring(7).trim().replaceAll(" ","");
			//					naverUrl = new URL(
			//							"http://openapi.map.naver.com/api/geocode.php?key=c14ddb5b56c4a672da8f8e539a300880&encoding=utf-8&coord=LatLng&query="+query);
			googleUrl = new URL(
					"http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address="+query);
			BufferedReader in = new BufferedReader(new InputStreamReader( googleUrl.openStream()));
			String inputLine;
			while ((inputLine = in.readLine()) != null)
				sb.append( inputLine.trim());
			in.close();
			JSONObject jsonObj = new JSONObject(sb.toString());
			//	org.json.JSONObject jsonObj = XML.toJSONObject( sb.toString());
			sb.delete(0,sb.capacity());
			JSONArray aa = jsonObj.getJSONArray("results");
			Double aax = aa.getJSONObject(0).
					getJSONObject("geometry").getJSONObject("location").getDouble("lat");
			Double aay = aa.getJSONObject(0).
					getJSONObject("geometry").getJSONObject("location").getDouble("lng");
			store.setXlocation(aax);
			store.setYlocation(aay);
			
			int count= storeDao.add(store);
			storeDao.addStoreMileage(store.getSno());

			return count;
		} catch (Exception e) {
			throw e;
		}
	}


	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int passwordChange(int sno, String password) throws Exception {
		try {

			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sno", sno);
			paramMap.put("password", password);
			return storeDao.passwordChange(paramMap);

		} catch (Exception e) {
			throw e;
		}
	}



	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int update(Store store) throws Exception {
		try {

			return storeDao.update(store);

		} catch (Exception e) {
			throw e;
		}
	}



	//클라이언트
	public Client getClient(String email, String password, String regid) throws Exception{
		HashMap<String,String> paramMap = new HashMap<String, String>();
		paramMap.put("email", email);
		paramMap.put("password", password);
		Client client = clientDao.getClient(paramMap);
		
		if(client != null){
				if( regid != client.getCdevice()){
				HashMap<String,String> paramMap2 = new HashMap<String, String>();
				paramMap2.put("regid", regid);
				paramMap2.put("barcode", client.getBarcode());
				clientDao.setCDevice(paramMap2);
				}
		}
			return client;
	}




	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int signUp(Client client) throws Exception {

		try {
			String email = clientDao.signUpcheck(client.getCemail());
			if(email == null){
				return clientDao.add(client);
			}else{
				return 0;
			}
		} catch (Exception e) {
			throw e;
		} 
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int clientPasswordChange(String email, String md5Password, String password) throws Exception {
		try {
			MailHandler mail = new SecureMailHandler("eger.eventmanager@gmail.com", "qlxmwkqk41rl");
			mail.setMailServer("smtp.gmail.com");
			mail.setSender("eger.eventmanager@gmail.com");
			mail.setSenderName("Eger 운영자");
			mail.setReceiver(email);
			mail.setSubject(email + "회원님의 변경된 비밀번호입니다.");
			mail.setContent("변경된 비밀번호: " + password + " \n어플을 실행해 변경된 비밀번호로 다시 로그인해주세요.\n\n");
			mail.SendMail();
			
			HashMap<String,String> paramMap = new HashMap<String, String>();
			paramMap.put("email", email);
			paramMap.put("password", md5Password);
			return clientDao.clientPasswordChange(paramMap);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			System.out.println("입력된 문자로 변환 불가능");
			throw e;
		} catch (MessagingException e) {
			e.printStackTrace();
			System.out.println("인식할 수 없는 문자 발견");
			throw e;
		} catch (Exception e) {
			throw e;
		}
	}

	
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int cPasswordChange(String barcode, String password)
			throws Exception {
		try {

			HashMap<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("barcode", barcode);
			paramMap.put("password", password);
			return clientDao.cPasswordChange(paramMap);

		} catch (Exception e) {
			throw e;
		}	
	}
	
}
