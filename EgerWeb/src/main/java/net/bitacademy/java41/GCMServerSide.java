package net.bitacademy.java41;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.MulticastResult;
import com.google.android.gcm.server.Result;
import com.google.android.gcm.server.Sender;

public class GCMServerSide {
	public void sendMessage() throws IOException {


		
		
		Sender sender = new Sender("AIzaSyAvg-Nk0y4jMpYO56rRj3cTGJRMs-TPYTE");
		String regId ="APA91bGc-toZkGhLWUCzm2npxNIWnh5QmZiBBCSCNM9l-b81yIlJmlmWra4mq7lFO9iMOJgb1BZCg8thxNEWBEqX6eNobfA6sfuP4G8gG0EQhvKi1ieCp0_D_1EefiQ-ns_pTkyQLazW1YU9hUis0XRHU8D3JxYVXEla1Ub7F-b18vqyiKTBT7M";
//		Message message = new Message.Builder().addData("message", "push Eger notify").build();
		 Message message = new Message.Builder()
		  .collapseKey(
		    String.valueOf(Math.random() % 100 + 1)) //중복체크
		    .delayWhileIdle(false).timeToLive(1800) //절전모드사용여부? 대기시간
		    .addData("message", "push Eger notifyTest")
		    .build();
		
		
		
		List<String> list = new ArrayList<String>();
		list.add(regId);
		MulticastResult multiResult = sender.send(message, list, 5);

		if (multiResult != null) {
			List<Result> resultList = multiResult.getResults();
			for (Result result : resultList) {
				System.out.println(result.getMessageId());
			}
		}

		
		

	}
	
	
	
	
	public static void main(String[] args) throws Exception {
		GCMServerSide s = new GCMServerSide();
		s.sendMessage();
	}
}
