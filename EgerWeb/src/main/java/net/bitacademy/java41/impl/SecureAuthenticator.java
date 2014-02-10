package net.bitacademy.java41.impl;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

//import javax.mail.Authenticator;
//import javax.mail.PasswordAuthentication;

/**
 * 인증자
 * 아이디와 암호를 입력받아 인증자를 성성
 * 
 * @author sdk
 *
 */
public class SecureAuthenticator extends Authenticator {

	private String id = null;
	private String password = null;
	
	public SecureAuthenticator(String id, String password) {
		this.id = id;
		this.password = password;
	}
	
	@Override
	protected PasswordAuthentication getPasswordAuthentication() {
		return new PasswordAuthentication(id, password); 
	}
}
