package net.bitacademy.java41.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.ServletContext;

import net.bitacademy.java41.services.MemberListService;
import net.bitacademy.java41.vo.CCoupone;
import net.bitacademy.java41.vo.JsonResult;
import net.bitacademy.java41.vo.StoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/memberList")
public class MemberListControl {
	@Autowired ServletContext sc;
	@Autowired MemberListService memberListService;

	@RequestMapping("/memberList")
	@ResponseBody
	public Object memberList(int sno) throws Exception {


		JsonResult jsonResult = new JsonResult();
		try {
			List<StoreClient> list = memberListService.memberList(sno);
			List<String> datetime = new ArrayList<String>();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			for(StoreClient f : list){
				datetime.add(sdf.format(f.getSc_reg_date()));
			}
			jsonResult.setStatus("success").setData(list).setData2(datetime);

		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}


	@RequestMapping("/membercount")
	@ResponseBody
	public Object membercount(int scno) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try {
			List<CCoupone> list = memberListService.membercount(scno);
			jsonResult.setStatus("success").setData(list);

		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}



	@RequestMapping("/payCount")
	@ResponseBody
	public Object payCount(
			int scno,
			String usingcouponeno,
			int sno,
			String cashpay,
			String cardpay,
			String usingPoint,
			boolean bool
			) throws Exception {

		JsonResult jsonResult = new JsonResult();
		try {
			int cash = 0;
			int card = 0;
			int point= 0;
			if(usingcouponeno != ""){
				List<Integer> list = new ArrayList<Integer>();
				StringTokenizer tokens = new StringTokenizer(usingcouponeno,",");
				while(tokens.hasMoreElements()){
					list.add(Integer.parseInt(tokens.nextToken()));
				}
				memberListService.payCount(scno,list);
			}
			if(bool){
				memberListService.stackStamp(scno,sno);
			}
			if(cashpay != ""){
				cash = Integer.parseInt(cashpay);
			}
			if(cardpay !=""){
				card = Integer.parseInt(cardpay);
			}
			if(usingPoint!=""){
				point = Integer.parseInt(usingPoint);
			}

			memberListService.StackMileage(cash,card,point,sno,scno);	

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
