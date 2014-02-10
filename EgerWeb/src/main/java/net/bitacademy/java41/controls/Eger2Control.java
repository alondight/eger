package net.bitacademy.java41.controls;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.Eger2Service;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/eger2")
public class Eger2Control {
	@Autowired ServletContext sc;
	@Autowired Eger2Service eger2Service;
	
	@RequestMapping("/mycouponelist")
	@ResponseBody
	public Object mycouponelist(
			HttpSession session) throws Exception {
		
		JsonResult jsonResult = new JsonResult();
		
		try {
			Client client = (Client) session.getAttribute("client");
			jsonResult.setData(
					eger2Service.getCouponeList(client.getBarcode()));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
}
