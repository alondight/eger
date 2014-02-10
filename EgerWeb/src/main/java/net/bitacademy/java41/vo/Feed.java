package net.bitacademy.java41.vo;

import java.util.Date;

public class Feed {
	private int fno;
	private int sno;
	private int fscore;
	private String barcode;
	private String fcontent;
	private Date freg_date;
	private double sumfscore;
	
	public int getFno() {
		return fno;
	}
	public Feed setFno(int fno) {
		this.fno = fno;
		return this;
	}
	public int getSno() {
		return sno;
	}
	public Feed setSno(int sno) {
		this.sno = sno;
		return this;
	}
	public int getFscore() {
		return fscore;
	}
	public Feed setFscore(int fscore) {
		this.fscore = fscore;
		return this;
	}
	public String getBarcode() {
		return barcode;
	}
	public Feed setBarcode(String barcode) {
		this.barcode = barcode;
		return this;
	}
	public String getFcontent() {
		return fcontent;
	}
	public Feed setFcontent(String fcontent) {
		this.fcontent = fcontent;
		return this;
	}
	public Date getFreg_date() {
		return freg_date;
	}
	public Feed setFreg_date(Date freg_date) {
		this.freg_date = freg_date;
		return this;
	}
	public double getSumfscore() {
		return sumfscore;
	}
	public Feed setSumfscore(double sumfscore) {
		this.sumfscore = sumfscore;
		return this;
	}
	
	
	
	
	
}
