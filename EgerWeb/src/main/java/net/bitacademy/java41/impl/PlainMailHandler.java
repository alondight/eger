package net.bitacademy.java41.impl;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

/**
 * 기본적인 메일 전송 
 * UTF-8로 메일을 전송 하므로 한글도 처리 가능
 * 
 * @author sdk
 *
 */
public class PlainMailHandler extends AbstractMailHandler {

	@Override
	protected void initializeMailServer() {
		Properties properties = new Properties();
		properties.put("mail.smtp.host", mailServer);

		Session s = Session.getDefaultInstance(properties);
		message = new MimeMessage(s);
	}

	@Override
	protected void initializeSender() throws UnsupportedEncodingException {
		if(senderName == null)		// 보내는 사람 표시 이름을 초기화 하지 않으면 메일주소로 초기화
			senderName = sender;
		
		senderAddress = new InternetAddress(sender, MimeUtility.encodeText(senderName, "UTF-8", "B"));	// 표시 이름은 인코딩해서 표현
	}

	@Override
	protected void initializeReceiver() throws AddressException {
		makeReceiverAddress(";");
	}

}
