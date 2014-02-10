package net.bitacademy.java41.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.Eger3Service;
import net.bitacademy.java41.vo.CMileage;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Stamp;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/eger3")
public class Eger3Control {
	@Autowired ServletContext sc;
	@Autowired Eger3Service eger3Service;

	@RequestMapping("/myStoreList")
	@ResponseBody
	public Object myStoreList(
			HttpSession session) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try {
			Client client = (Client)session.getAttribute("client");
			jsonResult.setData(
					eger3Service.getStoreList(client.getBarcode()));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(e);
//			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}
	@RequestMapping("/storesearch")
	@ResponseBody
	public Object storesearch(String inputsname,HttpSession session) throws Exception {
		Client client = (Client) session.getAttribute("client");
		List<Store> store = eger3Service.storesearch(inputsname,client.getBarcode());
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(store);
		return jsonResult;
	}

	
	@SuppressWarnings("unchecked")
	@RequestMapping("/myStoreview")
	@ResponseBody
	public Object myStoreview(
			int sno, HttpSession session) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try {
			Client client = (Client) session.getAttribute("client");
			HashMap<String,Object> param = eger3Service.getStoreView(client.getBarcode(),sno);
			StoreClient storeclient = (StoreClient) param.get("StoreClient");
			List<CMileage> list = (List<CMileage>) param.get("CMileage");
			List<Event> event =(List<Event>) param.get("Event");
			List<Stamp> stamp =(List<Stamp>) param.get("Stamp");
			jsonResult.setStatus("success").setData(storeclient).setData2(list).setData3(event).setData4(stamp);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}
	
	@RequestMapping("/stampToEvent")
	@ResponseBody
	public Object stampToEvent(int scno, int stamp_rate) throws Exception {
		int count  = eger3Service.stampToEvent(scno,stamp_rate);
		JsonResult jsonResult;
		if(count>0){
			 	jsonResult = new JsonResult().setStatus("success");
		}else{
			 	jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	

}
