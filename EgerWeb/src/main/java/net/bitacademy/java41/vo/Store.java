package net.bitacademy.java41.vo;

import java.sql.Date;
import java.util.List;

public class Store {
	private int sno;
	private String sname;
	private String spassword;
	private String stel;
	private String s_address;
	private String s_detail_address;
	private String stime;
	private String sppath;
	private String scontent;
	private int cateno;
	private Date sreg_date;
	private Double xlocation;
	private Double ylocation;
	private int stackstamp;
	private int stackmileage;
	private int feedcount;
	private int membercount;
	private int couponCount;
	private Double distance;
	private List<Stamp> stamp ;
	private Mileage mileage ;
	private List<Event> event ;
	
	private String starScoreAvg;
	
	
	
	public List<Event> getEvent() {
		return event;
	}
	public Store setEvent(List<Event> event) {
		this.event = event;
		return this;
	}
	public List<Stamp> getStamp() {
		return stamp;
	}
	public Store setStamp(List<Stamp> stamp) {
		this.stamp = stamp;
		return this;
	}
	public Mileage getMileage() {
		return mileage;
	}
	public Store setMileage(Mileage mileage) {
		this.mileage = mileage;
		return this;
	}
	
	
	
	public Double getDistance() {
		return distance;
	}
	public Store setDistance(Double distance) {
		this.distance = distance;
		return this;
	}
	public int getFeedcount() {
		return feedcount;
	}
	public Store setFeedcount(int feedcount) {
		this.feedcount = feedcount;
		return this;
	}
	public int getMembercount() {
		return membercount;
	}
	public Store setMembercount(int membercount) {
		this.membercount = membercount;
		return this;
	}
	public int getStackstamp() {
		return stackstamp;
	}
	public Store setStackstamp(int stackstamp) {
		this.stackstamp = stackstamp;
		return this;
	}
	public int getStackmileage() {
		return stackmileage;
	}
	public Store setStackmileage(int stackmileage) {
		this.stackmileage = stackmileage;
		return this;
	}
	public Double getXlocation() {
		return xlocation;
	}
	public Store setXlocation(Double xlocation) {
		this.xlocation = xlocation;
		return this;
	}
	public Double getYlocation() {
		return ylocation;
	}
	public Store setYlocation(Double ylocation) {
		this.ylocation = ylocation;
		return this;
	}
	public int getSno() {
		return sno;
	}
	public Store setSno(int sno) {
		this.sno = sno;
		return this;
	}
	public String getSname() {
		return sname;
	}
	public Store setSname(String sname) {
		this.sname = sname;
		return this;
	}
	public String getSpassword() {
		return spassword;
	}
	public Store setSpassword(String spassword) {
		this.spassword = spassword;
		return this;
	}
	public String getStel() {
		return stel;
	}
	public Store setStel(String stel) {
		this.stel = stel;
		return this;
	}
	public String getS_address() {
		return s_address;
	}
	public Store setS_address(String s_address) {
		this.s_address = s_address;
		return this;
	}
	public String getS_detail_address() {
		return s_detail_address;
	}
	public Store setS_detail_address(String s_detail_address) {
		this.s_detail_address = s_detail_address;
		return this;
	}
	public String getStime() {
		return stime;
	}
	public Store setStime(String stime) {
		this.stime = stime;
		return this;
	}
	public String getSppath() {
		return sppath;
	}
	public Store setSppath(String sppath) {
		this.sppath = sppath;
		return this;
	}
	public String getScontent() {
		return scontent;
	}
	public Store setScontent(String scontent) {
		this.scontent = scontent;
		return this;
	}
	public int getCateno() {
		return cateno;
	}
	public Store setCateno(int cateno) {
		this.cateno = cateno;
		return this;
	}
	public Date getSreg_date() {
		return sreg_date;
	}
	public Store setSreg_date(Date sreg_date) {
		this.sreg_date = sreg_date;
		return this;
	}
	public String getStarScoreAvg() {
		return starScoreAvg;
	}
	public Store setStarScoreAvg(String starScoreAvg) {
		this.starScoreAvg = starScoreAvg;
		return this;
	}
	public int getCouponCount() {
		return couponCount;
	}
	public Store setCouponCount(int couponCount) {
		this.couponCount = couponCount;
		return this;
	}

}
