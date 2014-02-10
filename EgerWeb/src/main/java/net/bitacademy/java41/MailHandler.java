package net.bitacademy.java41;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

/**
 * 메일 핸들러 구현 인터페이스
 * 
 * @author sdk
 *
 */
public interface MailHandler {

	/**
	 * 메일 전송
	 * 
	 * @throws UnsupportedEncodingException 입력된 문자가 변환 될 수 없을 때 발생
	 * @throws MessagingException 메시지 생성중 인식할 수 없는 문자가 있을 때 발생
	 */
	public abstract void SendMail() throws UnsupportedEncodingException, MessagingException;

	/**
	 * 메일 서버
	 * 
	 * @param mailServer
	 */
	public abstract void setMailServer(String mailServer);
	public abstract String getMailServer();

	/**
	 * 보내는 사람 주소
	 * 
	 * @param sender
	 */
	public abstract void setSender(String sender);
	public abstract String getSender();

	/**
	 * 보내는 사람 표시 이름
	 * 
	 * @param senderName
	 */
	public abstract void setSenderName(String senderName);
	public abstract String getSenderName();

	/**
	 * 메일 제목
	 * 
	 * @param subject
	 */
	public abstract void setSubject(String subject);
	public abstract String getSubject();

	/**
	 * 메일 내용
	 * 
	 * @param content
	 */
	public abstract void setContent(String content);
	public abstract String getContent();

	/**
	 * 받는 사람 리스트
	 * 세미콜론(';')으로 구분
	 * 
	 * @param receiver
	 */
	public abstract void setReceiver(String receiver);
	public abstract String getReceiver();

}