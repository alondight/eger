package net.bitacademy.java41.vo;

import java.util.Date;

public class CCoupone {
	private int coupone_no;
	private int scno;
	private int coupone_level;
	private Date coupone_usedate;

	private String etime;
	private String econtent;
	private String econdition;



	public int getCoupone_no() {
		return coupone_no;
	}
	public CCoupone setCoupone_no(int coupone_no) {
		this.coupone_no = coupone_no;
		return this;
	}
	public int getScno() {
		return scno;
	}
	public CCoupone setScno(int scno) {
		this.scno = scno;
		return this;
	}
	public int getCoupone_level() {
		return coupone_level;
	}
	public CCoupone setCoupone_level(int coupone_level) {
		this.coupone_level = coupone_level;
		return this;
	}
	public Date getCoupone_usedate() {
		return coupone_usedate;
	}
	public CCoupone setCoupone_usedate(Date coupone_usedate) {
		this.coupone_usedate = coupone_usedate;
		return this;
	}
	public String getEtime() {
		return etime;
	}
	public CCoupone setEtime(String etime) {
		this.etime = etime;
		return this;
	}
	public String getEcontent() {
		return econtent;
	}
	public CCoupone setEcontent(String econtent) {
		this.econtent = econtent;
		return this;
	}
	public String getEcondition() {
		return econdition;
	}
	public CCoupone setEcondition(String econdition) {
		this.econdition = econdition;
		return this;
	}








}
