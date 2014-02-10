package net.bitacademy.java41.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.FeedService;
import net.bitacademy.java41.vo.Feed;
import net.bitacademy.java41.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/feed")
public class FeedControl {
	@Autowired ServletContext sc;
	@Autowired FeedService feedService;

	@RequestMapping(value="/feedadd", method=RequestMethod.POST)
	@ResponseBody
	public Object feedadd(
			String fcontent,
			int sno,
			HttpSession session
			) throws Exception {
		JsonResult jsonResult = new JsonResult();


		int count = feedService.feedAdd(fcontent,sno);

		if(count > 0) {
			jsonResult = new JsonResult().setStatus("success");
		}else {
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}


	@RequestMapping("/feedList")
	@ResponseBody
	public Object feedList(int sno) throws Exception {


		JsonResult jsonResult = new JsonResult();
		List<Feed> list = feedService.feedList(sno);
		List<String> datetime = new ArrayList<String>();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss a");
		for(Feed f : list){
			datetime.add(sdf.format(f.getFreg_date()));
		}
		
		jsonResult = new JsonResult().setStatus("success").setData(list).setData2(datetime);

		return jsonResult;
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Object delete(int fno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		
		try {
			feedService.removeFeed(fno);
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
