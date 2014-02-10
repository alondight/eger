package net.bitacademy.java41.vo;

import java.util.Date;

public class StoreClient {
	private int scno;
	private int sno;
	private String barcode;
	private	Date sc_reg_date;
	private int stackstamp;
	private int stackmileage;
	private String sppath;
	private String sname;
	private String s_address;
	
	public String getSname() {
		return sname;
	}
	public StoreClient setSname(String sname) {
		this.sname = sname;
		return this;
	}
	public String getS_address() {
		return s_address;
	}
	public StoreClient setS_address(String s_address) {
		this.s_address = s_address;
		return this;
	}
	public int getScno() {
		return scno;
	}
	public StoreClient setScno(int scno) {
		this.scno = scno;
		return this;
	}
	public int getSno() {
		return sno;
	}
	public StoreClient setSno(int sno) {
		this.sno = sno;
		return this;
	}

	public String getBarcode() {
		return barcode;
	}
	public StoreClient setBarcode(String barcode) {
		this.barcode = barcode;
		return this;
	}
	public Date getSc_reg_date() {
		return sc_reg_date;
	}
	public StoreClient setSc_reg_date(Date sc_reg_date) {
		this.sc_reg_date = sc_reg_date;
		return this;
	}
	public int getStackstamp() {
		return stackstamp;
	}
	public StoreClient setStackstamp(int stackstamp) {
		this.stackstamp = stackstamp;
		return this;
	}
	public int getStackmileage() {
		return stackmileage;
	}
	public StoreClient setStackmileage(int stackmileage) {
		this.stackmileage = stackmileage;
		return this;
	}
	public String getSppath() {
		return sppath;
	}
	public StoreClient setSppath(String sppath) {
		this.sppath = sppath;
		return this;
	}







}
