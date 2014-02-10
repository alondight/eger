package net.bitacademy.java41.vo;

import java.util.Date;

public class CMileage {
	private int cmileno;
	private int scno;
	private int changemile;
	private Date mile_reg_date;
	
	
	public int getCmileno() {
		return cmileno;
	}
	public CMileage setCmileno(int cmileno) {
		this.cmileno = cmileno;
		return this;
	}
	public int getScno() {
		return scno;
	}
	public CMileage setScno(int scno) {
		this.scno = scno;
		return this;
	}
	public int getChangemile() {
		return changemile;
	}
	public CMileage setChangemile(int changemile) {
		this.changemile = changemile;
		return this;
	}
	public Date getMile_reg_date() {
		return mile_reg_date;
	}
	public CMileage setMile_reg_date(Date mile_reg_date) {
		this.mile_reg_date = mile_reg_date;
		return this;
	}
	
	
	
	
}
