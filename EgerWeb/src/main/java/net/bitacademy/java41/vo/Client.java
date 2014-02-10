package net.bitacademy.java41.vo;

import java.util.Date;

public class Client {
	private String barcode;
	private String cpassword;
	private String cemail;
	private Date creg_date;
	private String cdevice;
	
	
	public String getCdevice() {
		return cdevice;
	}
	public Client setCdevice(String cdevice) {
		this.cdevice = cdevice;
		return this;
	}
	public String getBarcode() {
		return barcode;
	}
	public Client setBarcode(String barcode) {
		this.barcode = barcode;
		return this;
	}
	public String getCpassword() {
		return cpassword;
	}
	public Client setCpassword(String cpassword) {
		this.cpassword = cpassword;
		return this;
	}
	public String getCemail() {
		return cemail;
	}
	public Client setCemail(String cemail) {
		this.cemail = cemail;
		return this;
	}
	public Date getCreg_date() {
		return creg_date;
	}
	public Client setCreg_date(Date creg_date) {
		this.creg_date = creg_date;
		return this;
	}


	



}
