package net.bitacademy.java41.controls;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.AuthService;
import net.bitacademy.java41.services.Eger1Service;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/eger1")
public class Eger1Control {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;
	@Autowired Eger1Service eger1Service;

	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session) throws Exception {
		session.invalidate();
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success");

		return jsonResult;
	}

	@RequestMapping("/myStoreList")
	@ResponseBody
	public Object storeList(Double x, Double y) throws Exception {
		List<Store> list = eger1Service.storeList(x,y);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(list);
		return jsonResult;
	}

	@RequestMapping(value="/chatInfo")
	@ResponseBody
	public Object chatInfo(
			HttpSession session) throws Exception {
		int sno = -1; 
		sno =  (int) session.getAttribute("chatSno");
		JsonResult jsonResult = null;
		if (sno >  -1) {
			jsonResult = new JsonResult().setStatus("success")
					.setData(sno);
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}
	
	
	@RequestMapping(value="/loginInfo")
	@ResponseBody
	public Object loginInfo(
			HttpSession session) throws Exception {
		Client client = (Client) session.getAttribute("client");
		JsonResult jsonResult = null;
		if (client != null) {
			jsonResult = new JsonResult().setStatus("success")
					.setData(client);
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}

	@RequestMapping("/NaverApi")
	@ResponseBody
	public Object NaverApi(int sno,
			HttpSession session) throws Exception {
		JsonResult jsonResult = null;
		try {
			Client client = (Client) session.getAttribute("client");
			sc.setAttribute(String.valueOf(sno), client.getBarcode());
			jsonResult = new JsonResult().setStatus("success");
		} catch (Throwable e) {
			jsonResult.setStatus("fail");
		} 
		return jsonResult;
	}
}
