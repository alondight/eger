package net.bitacademy.java41.controls;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.AuthService;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/web2")
public class Web2Control {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;
	long currTime = 0;
	int count = 0;


	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session) throws Exception {
		session.invalidate();
		JsonResult jsonResult = new JsonResult().setStatus("success");
		return jsonResult;
	}


	@RequestMapping(value="/loginInfo")
	@ResponseBody
	public Object loginInfo(HttpSession session) throws Exception {
		Store store = (Store) session.getAttribute("store");
		JsonResult jsonResult = null;
		if (store != null) {
			jsonResult = new JsonResult().setStatus("success")
					.setData(store);
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}



	@RequestMapping(value="/passwordChange")
	@ResponseBody
	public Object passwordChange(HttpSession session,
			String password) throws Exception {
		Store store = (Store) session.getAttribute("store");
		int count =  authService.passwordChange(store.getSno(),password);


		JsonResult jsonResult = null;
		if (count > 0) {
			store.setSpassword(password);
			session.setAttribute("store", store);
			jsonResult = new JsonResult().setStatus("success");

		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}

	//파일업로드 및 회원가입
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody
	public Object update(
			HttpServletRequest request
			,Store store
			,HttpSession session) throws Exception {
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("agentInstallFile");

		if(photo != null){
			String filename = this.getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "file/store/" + filename;
			photo.transferTo(new File(path));
			store.setSppath(filename);
		}
		int count = authService.update(store);

		JsonResult jsonResult = null;
		if (count > 0) {
			Store updateStore = authService.getStore(store.getSno(),store.getSpassword());
			session.setAttribute("store", updateStore);
			jsonResult = new JsonResult().setStatus("success");
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}

	@RequestMapping(value="/deleteSession", method=RequestMethod.POST)
	@ResponseBody
	public Object deleteSession(
			String sno,HttpSession session) throws Exception {
		JsonResult jsonResult = null;
		try{
			sc.removeAttribute(sno);
			jsonResult = new JsonResult().setStatus("success");
		}catch(Exception e){
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/receiveBarcode", method=RequestMethod.POST)
	@ResponseBody
	public Object receiveBarcode(
			String sno,HttpSession session) throws Exception {
		JsonResult jsonResult = null;
		try{
			String barcode = (String) sc.getAttribute(sno);
			jsonResult = new JsonResult().setStatus("success").setData(barcode);
		}catch(Exception e){
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}


	//파일이름얻기
	synchronized private String getNewFileName() {
		long millis = System.currentTimeMillis(); //1000
		if (currTime != millis) {
			currTime = millis;
			count = 0;
		}
		return "SPHOTO" + millis + "_" + (++count);
	}

}
