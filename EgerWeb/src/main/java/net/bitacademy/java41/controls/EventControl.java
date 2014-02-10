package net.bitacademy.java41.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.services.EventService;
import net.bitacademy.java41.vo.Event;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.Mileage;
import net.bitacademy.java41.vo.Stamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/event")
public class EventControl {
	@Autowired ServletContext sc;
	@Autowired EventService eventService;



	@RequestMapping("/loadMileage")
	@ResponseBody
	public Object checkMileage(int sno) throws Exception {


		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData(eventService.getCheckMileage(sno)).setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping(value="/mileageadd", method=RequestMethod.POST)
	@ResponseBody
	public Object mileageadd(
			Mileage mileage,
			HttpSession session
			) throws Exception {
		JsonResult jsonResult = new JsonResult();

		try{

			eventService.mileagePercent(mileage);
			jsonResult.setStatus("success");

		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}


	@RequestMapping("/loadStamp")
	@ResponseBody
	public Object loadStamp(
			int sno) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try {

			List<Stamp> list = eventService.getLoadStamp(sno);
			jsonResult.setData(list).setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}

	@RequestMapping(value="/Level1Choose", method=RequestMethod.POST)
	@ResponseBody
	public Object Level1Choose(
			int sno,
			int stamp_Rate,
			String stamp_Content,
			String stamp_start,
			String stamp_end
			) throws Exception {

		JsonResult jsonResult = new JsonResult();

		try{
			eventService.stampLevel1Add(sno,stamp_Rate, stamp_Content, stamp_start, stamp_end);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping(value="/Level2Choose", method=RequestMethod.POST)
	@ResponseBody
	public Object Level2Choose(
			int sno,
			String stamp_Rate,
			String stamp_Content,
			String stamp_start,
			String stamp_end,
			String stamp_Rate2,
			String stamp_Content2,
			String stamp_start2,
			String stamp_end2,
			String stamp_Rate3,
			String stamp_Content3,
			String stamp_start3,
			String stamp_end3
			) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try{
			if(stamp_Rate !="" && stamp_Content != null && stamp_start != null && stamp_end != null
					&&	stamp_Rate2 !="" && stamp_Content2 != null && stamp_start2 != null && stamp_end2 != null
					&&	stamp_Rate3 !="" && stamp_Content3 != null && stamp_start3 != null && stamp_end3 != null){
				eventService.orderStamp( sno, Integer.parseInt(stamp_Rate), stamp_Content, stamp_start, stamp_end
						,Integer.parseInt(stamp_Rate2),stamp_Content2,stamp_start2, stamp_end2,
						Integer.parseInt(stamp_Rate3),stamp_Content3,stamp_start3,stamp_end3);
				jsonResult.setStatus("success");

			}else if(stamp_Rate !="" && stamp_Content != null && stamp_start != null && stamp_end != null
					&&	stamp_Rate2 !="" && stamp_Content2 != null && stamp_start2 != null && stamp_end2 != null){
				
				eventService.orderStamp( sno, Integer.parseInt(stamp_Rate), stamp_Content, stamp_start, stamp_end
						,Integer.parseInt(stamp_Rate2),stamp_Content2,stamp_start2,stamp_end2);
				jsonResult.setStatus("success");

			}else if(stamp_Rate !="" && stamp_Content != null && stamp_start != null && stamp_end != null){

				eventService.orderStamp( sno, Integer.parseInt(stamp_Rate), stamp_Content, stamp_start, stamp_end);
				jsonResult.setStatus("success");
			}else{

				jsonResult.setStatus("userfail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping(value="/Level3Choose", method=RequestMethod.POST)
	@ResponseBody
	public Object Level3Choose(
			int sno,
			String stamp_Rate,
			String stamp_Content,
			String stamp_start,
			String stamp_end,
			String stamp_Rate2,
			String stamp_Content2,
			String stamp_start2,
			String stamp_end2,
			String stamp_Rate3,
			String stamp_Content3,
			String stamp_start3,
			String stamp_end3,
			HttpSession session
			) throws Exception {

		JsonResult jsonResult = new JsonResult();

		try{
			if(stamp_Rate !="" && stamp_Content != null && stamp_start != null && stamp_end != null
					&&	stamp_Rate2 !="" && stamp_Content2 != null && stamp_start2 != null && stamp_end2 != null
					&&	stamp_Rate3 !="" && stamp_Content3 != null && stamp_start3 != null && stamp_end3 != null){

				eventService.serchStamp(sno, Integer.parseInt(stamp_Rate), stamp_Content, stamp_start, stamp_end
						,Integer.parseInt(stamp_Rate2),stamp_Content2,stamp_start2,stamp_end2,Integer.parseInt(stamp_Rate3),stamp_Content3
						,stamp_start3,stamp_end3);
				jsonResult.setStatus("success");

			}else if(stamp_Rate !="" && stamp_Content != null && stamp_start != null && stamp_end != null
					&&	stamp_Rate2 !="" && stamp_Content2 != null && stamp_start2 != null && stamp_end2 != null){
				eventService.serchStamp(sno, Integer.parseInt(stamp_Rate), stamp_Content, stamp_start, stamp_end
						,Integer.parseInt(stamp_Rate2),stamp_Content2,stamp_start2,stamp_end2);
				jsonResult.setStatus("success");

			}else if(stamp_Rate !="" && stamp_Content != null && stamp_start != null && stamp_end != null){
				eventService.serchStamp(sno, Integer.parseInt(stamp_Rate), stamp_Content, stamp_start, stamp_end);
				jsonResult.setStatus("success");
			} else {
				jsonResult.setStatus("userfail");
			}
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping("/loadCoupone")
	@ResponseBody
	public Object loadCoupone(
			int sno) throws Exception {
		JsonResult jsonResult = new JsonResult();
		List<Event> list = eventService.getLoadCoupones(sno);
		try {
			jsonResult = new JsonResult().setStatus("success").setData(list);
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}

	@RequestMapping(value="/couponeadd", method=RequestMethod.POST)
	@ResponseBody
	public Object couponeadd(
			Event event
			) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try{
			eventService.couponeprint(event);
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}

	@RequestMapping("/delete")
	@ResponseBody
	public Object deleteCoupone(int coupone_no) throws Exception {
		JsonResult jsonResult = new JsonResult();

		try {
			eventService.removeCoupone(coupone_no);
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
