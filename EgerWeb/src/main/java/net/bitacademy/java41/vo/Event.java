package net.bitacademy.java41.vo;

import java.util.Date;

public class Event {
	private int coupone_no;
	private int sno;
	private String econtent;
	private String etime;
	private String econdition;
	private Date e_reg_date;
	private int e_coupone_level;
	private int coupone_level;
	private Date coupone_usedate;
	private String sname;
	private String sppath;
	private String s_address;
	private int COUPONE_LEVEL;
	
	
	public String getS_address() {
		return s_address;
	}
	public Event setS_address(String s_address) {
		this.s_address = s_address;
		return this;
	}
	public String getSname() {
		return sname;
	}
	public Event setSname(String sname) {
		this.sname = sname;
		return this;
	}
	public String getSppath() {
		return sppath;
	}
	public Event setSppath(String sppath) {
		this.sppath = sppath;
		return this;
	}
	public int getCoupone_level() {
		return coupone_level;
	}
	public Event setCoupone_level(int coupone_level) {
		this.coupone_level = coupone_level;
		return this;
	}
	public Date getCoupone_usedate() {
		return coupone_usedate;
	}
	public Event setCoupone_usedate(Date coupone_usedate) {
		this.coupone_usedate = coupone_usedate;
		return this;
	}
	
	
	
	
	
	public int getE_coupone_level() {
		return e_coupone_level;
	}
	public Event setE_coupone_level(int e_coupone_level) {
		this.e_coupone_level = e_coupone_level;
		return this;
	}
	public Date getE_reg_date() {
		return e_reg_date;
	}
	public Event setE_reg_date(Date e_reg_date) {
		this.e_reg_date = e_reg_date;
		return this;
	}
	
	public int getCoupone_no() {
		return coupone_no;
	}
	public Event setCoupone_no(int coupone_no) {
		this.coupone_no = coupone_no;
		return this;
	}
	public int getSno() {
		return sno;
	}
	public Event setSno(int sno) {
		this.sno = sno;
		return this;
	}
	public String getEcontent() {
		return econtent;
	}
	public Event setEcontent(String econtent) {
		this.econtent = econtent;
		return this;
	}
	public String getEtime() {
		return etime;
	}
	public Event setEtime(String etime) {
		this.etime = etime;
		return this;
	}
	public String getEcondition() {
		return econdition;
	}
	public Event setEcondition(String econdition) {
		this.econdition = econdition;
		return this;
	}
	public int getCOUPONE_LEVEL() {
		return COUPONE_LEVEL;
	}
	public Event setCOUPONE_LEVEL(int cOUPONE_LEVEL) {
		COUPONE_LEVEL = cOUPONE_LEVEL;
		return this;
	}
	
	
	
	
	
}
