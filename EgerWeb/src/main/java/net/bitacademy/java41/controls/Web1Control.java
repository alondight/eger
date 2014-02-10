package net.bitacademy.java41.controls;

import java.io.File;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.AuthService;
import net.bitacademy.java41.vo.Category;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Store;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@SessionAttributes("loginInfo")
@RequestMapping("/web1")
public class Web1Control {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;
	long currTime = 0;
	int count = 0;

	public static final String IP_ADDR = "http://biz.epost.go.kr/KpostPortal/openapi";
	public static final String REG_KEY = "d21421d18ac457ffd1383530315208";
	public static final String TARGET = "post";

	@RequestMapping(value="/loginInfo")
	@ResponseBody
	public Object loginInfo(
			HttpSession session,
			SessionStatus status) throws Exception {
		
		Store store = (Store)session.getAttribute("store");
		
		JsonResult jsonResult = null;
		if (store != null) {
			jsonResult = new JsonResult().setStatus("success")
								.setData(store);
		} else {
			status.setComplete();
			jsonResult = new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}
	
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	@ResponseBody
	public Object signup(
			HttpServletRequest request
			,Store store
			,HttpSession session) throws Exception {

		
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) request;
		MultipartFile photo = multi.getFile("agentInstallFile");

		String filename = this.getNewFileName();
		String path = sc.getAttribute("rootRealPath") + "file/store/" + filename;
		photo.transferTo(new File(path));
		store.setSppath(filename);

		int count = authService.signUp(store);

		JsonResult jsonResult = null;
		if (count > 0) {
			session.setAttribute("store", store);
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
			int sno,
			@RequestParam("spassword") String spassword,
			Boolean saveId,
			HttpServletResponse response,
			HttpSession session,
			Model model,
			SessionStatus status) throws Exception {
		Store store = authService.getStore(sno, spassword);
		if(saveId == true) {
			Cookie cookie = new Cookie("sno",String.valueOf(sno));
			cookie.setMaxAge(60*60);
			response.addCookie(cookie);
		} else {
			Cookie cookie = new Cookie("sno", null);
			cookie.setMaxAge(0); 
			response.addCookie(cookie);
		}

		JsonResult jsonResult = null;
		if (store != null) {
			model.addAttribute("store", store);
			session.setAttribute("store", store);
			jsonResult = new JsonResult().setStatus("success");
		} else {
			status.setComplete();
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}

	@RequestMapping(value="/category")
	@ResponseBody
	public Object category() throws Exception {
		List<Category> list = new ArrayList<Category>();
		list = authService.getCategorys();

		JsonResult	jsonResult = new JsonResult().setStatus("success")
								.setData(list);

		return jsonResult;
	}


	@RequestMapping("/PostApi")
	@ResponseBody
	public Object PostApi(String query) throws Exception {

		URL url = new URL(IP_ADDR+"?regkey="+REG_KEY+"&target="+TARGET+"&query="+URLEncoder.encode(query,"EUC-KR"));
		URLConnection conn = url.openConnection();
		conn.setRequestProperty("accept-language", "ko");
		SAXBuilder builder = new SAXBuilder();
		Document doc= builder.build(conn.getInputStream());
		Element itemlist = doc.getRootElement().getChild("itemlist");
		@SuppressWarnings("unchecked")
		List<Element> list = itemlist.getChildren();


		List<String> addresses = new ArrayList<String>();
		List<String> postcdes = new ArrayList<String>();

		for(int i=0; i<list.size();i++){
			Element item = (Element)list.get(i);
			String address = item.getChildText("address");
			addresses.add(address);

			String postcd = item.getChildText("postcd");
			postcdes.add(postcd);
		}

		JsonResult jsonResult = null;
		jsonResult = new JsonResult().setStatus("success")
				.setData(addresses)
				.setData2(postcdes);


		return jsonResult;
	}

	synchronized private String getNewFileName() {
		long millis = System.currentTimeMillis(); //1000
		if (currTime != millis) {
			currTime = millis;
			count = 0;
		}
		return "SPHOTO" + millis + "_" + (++count);
	}

}
