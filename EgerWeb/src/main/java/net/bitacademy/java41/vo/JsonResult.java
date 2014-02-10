package net.bitacademy.java41.vo;

public class JsonResult {
	private String status;
	private Object data;
	private Object data2;
	private Object data3;
	private Object data4;
	
	
	
	public String getStatus() {
		return status;
	}
	public JsonResult setStatus(String status) {
		this.status = status;
		return this;
	}
	public Object getData() {
		return data;
	}
	public JsonResult setData(Object data) {
		this.data = data;
		return this;
	}
	
	public Object getData2() {
		return data2;
	}
	public JsonResult setData2(Object data2) {
		this.data2 = data2;
		return this;
	}
	public Object getData3() {
		return data3;
	}
	public JsonResult setData3(Object data3) {
		this.data3 = data3;
		return this;
	}
	public Object getData4() {
		return data4;
	}
	public JsonResult setData4(Object data4) {
		this.data4 = data4;
		return this;
	}
	
}
