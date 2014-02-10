package net.bitacademy.java41.controls;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.AuthService;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.JsonResult;
import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.BarcodeImageHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/auth")
public class UserAuthControl {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;

	long currTime = 0;
	int count = 0;
	
	
	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session) throws Exception {
		session.invalidate();
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success");
		return jsonResult;
	}
	
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	@ResponseBody
	public Object signup(
			String email,
			String password,
			String regid,
			HttpSession session
			) throws Exception {
		
		String barcode = this.getNewBarcode();
		this.outputtingBarcodeAsPNG(barcode);
		
		Client client = new Client()
								.setCemail(email)
								.setCpassword(password)
								.setBarcode(barcode)
								.setCdevice(regid);
		
		int count = authService.signUp(client);
		
		JsonResult jsonResult = null;
		if (count > 0) {
			session.setAttribute("client", client);
			jsonResult = new JsonResult().setStatus("success");
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}
	


	@RequestMapping(value="/login",
			method=RequestMethod.POST)
	@ResponseBody
	public Object login(
			String email,
			@RequestParam("password") String pwd,
			HttpServletResponse response,
			String regid,
			HttpSession session) throws Exception {
		Client client = authService.getClient(email, pwd,regid);

		JsonResult jsonResult = null;
		if (client != null) {
			session.setAttribute("client", client);
			jsonResult = new JsonResult().setStatus("success").setData(client);
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}
	
	
	@RequestMapping(value="/cPasswordChange")
	@ResponseBody
	public Object cPasswordChange(HttpSession session,
			String password) throws Exception {
		Client client = (Client) session.getAttribute("client");
		int count =  authService.cPasswordChange(client.getBarcode(),password);

		JsonResult jsonResult = null;
		if (count > 0) {
			client.setCpassword(password);
			session.setAttribute("client", client);
			jsonResult = new JsonResult().setStatus("success").setData(client);

		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}
	
	
	
	
	@RequestMapping(value="/clientPasswordChange",
			method=RequestMethod.POST)
	@ResponseBody
	public Object clientPasswordChange(
			String email,
			String md5Password,
			String password) throws Exception {
		int count = authService.clientPasswordChange(email, md5Password, password);
		JsonResult jsonResult = null;
		if (count > 0) {
			jsonResult = new JsonResult().setStatus("success");
		} else {
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	
	
	synchronized private String getNewBarcode() {
		long millis = System.currentTimeMillis();
		if (currTime != millis) {
			currTime = millis;
			count = 0;
		}
		return  ""+millis + (++count);
	}
	
	public void outputtingBarcodeAsPNG(String code) throws BarcodeException {
		Barcode barcode = BarcodeFactory.createCode128B(code);
		try {
			String path = sc.getAttribute("rootRealPath") + "file/barcode/" + code +".png";
			File f = new File(path);
			BarcodeImageHandler.savePNG(barcode, f);
		} catch (Exception e) {
		}
	}
}
