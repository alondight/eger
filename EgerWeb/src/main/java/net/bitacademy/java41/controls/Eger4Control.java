package net.bitacademy.java41.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.Eger4Service;
import net.bitacademy.java41.vo.Client;
import net.bitacademy.java41.vo.Feed;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Store;
import net.bitacademy.java41.vo.StoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/eger4")
public class Eger4Control {
	@Autowired ServletContext sc;
	@Autowired Eger4Service eger4Service;

	
	@RequestMapping(value="/categoryselect", method=RequestMethod.POST)
	@ResponseBody
	public Object categoryselect(int cateno) throws Exception {
		List<Store> store = eger4Service.categoryselect(cateno);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(store);
		return jsonResult;
	}
	
	@RequestMapping(value="/zoneselect", method=RequestMethod.POST)
	@ResponseBody
	public Object zoneselect(String zoneName) throws Exception {
		List<Store> store = eger4Service.zoneselect(zoneName);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(store);
		return jsonResult;
	}
	
	@RequestMapping(value="/categoryAndZoneSelect", method=RequestMethod.POST)
	@ResponseBody
	public Object categoryAndZoneSelect(int cateno, String zoneName) throws Exception {
		List<Store> store = eger4Service.categoryAndZoneSelect(cateno, zoneName);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(store);
		return jsonResult;
	}	

	
	@RequestMapping("/storesearch")
	@ResponseBody
	public Object storesearch(String inputsname) throws Exception {
		List<Store> store = eger4Service.storesearch(inputsname);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(store);
		return jsonResult;
	}
	

	@RequestMapping("/todayAddStoreList")
	@ResponseBody
	public Object todayAddStoreList(Double x, Double y) throws Exception {
		List<Store> list = eger4Service.todayAddStoreList(x,y);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(list);
		return jsonResult;
	}
	
	
	@RequestMapping("/storelist")
	@ResponseBody
	public Object storeList(Double x, Double y) throws Exception {
		List<Store> list = eger4Service.storeList(x,y);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(list);
		return jsonResult;
	}
	
	@RequestMapping("/storeview")
	@ResponseBody
	public Object storeview(int sno,HttpSession session) throws Exception {
		Store store = eger4Service.storeview(sno);
		session.setAttribute("chatSno", sno);
		int saaa = (int) session.getAttribute("chatSno");
		System.out.println(saaa);
		
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(store);
		return jsonResult;
	}
	
	@RequestMapping("/feedlist")
	@ResponseBody
	public Object feedList(int sno) throws Exception {
		List<Feed> list = eger4Service.feedList(sno);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(list);
		return jsonResult;
	}
	
	@RequestMapping("/feedscore")
	@ResponseBody
	public Object feedscore(int sno) throws Exception {
		List<Feed> list = eger4Service.feedscore(sno);
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success").setData(list);
		return jsonResult;
	}
	
	@RequestMapping(value="/storeadd", method=RequestMethod.POST)
	@ResponseBody
	public Object storeadd(
			int sno,
			HttpSession session
			) throws Exception {
		Client client = (Client) session.getAttribute("client");
		
		System.out.println(client.getBarcode());
		System.out.println(sno);
		
		int count = eger4Service.storeadd(sno, client.getBarcode());
		JsonResult jsonResult = null;
		if (count >  0) {
			jsonResult = new JsonResult().setStatus("success");
		} else {
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/storeMemberCheck")
	@ResponseBody
	public Object storeMemberCheck(
			int sno,
			String barcode,
			HttpSession session
			) throws Exception {
		StoreClient count = eger4Service.storeMemberCheck(sno, barcode);
		JsonResult jsonResult = null;
		if (count != null) {
			jsonResult = new JsonResult().setStatus("success");
		} else {
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/feedadd", method=RequestMethod.POST)
	@ResponseBody
	public Object feedadd(
			String fcontent,
			int sno,
			String fscore,
			HttpSession session
			) throws Exception {
		JsonResult jsonResult = new JsonResult();
		Client client = (Client) session.getAttribute("client");
		int feedscore = 0;
		if(fscore != ""){
			feedscore = (int)Double.parseDouble(fscore);
		}
		int count = eger4Service.feedAdd(fcontent,sno,client.getBarcode(),feedscore);
		if(count > 0) {
			jsonResult = new JsonResult().setStatus("success");
		}else {
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}
	
	@RequestMapping("/feeddelete")
	@ResponseBody
	public Object feeddelete(int fno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		
		try {
			eger4Service.feeddelete(fno);
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
