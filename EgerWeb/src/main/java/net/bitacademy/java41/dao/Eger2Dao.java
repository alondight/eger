package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.Event;

public interface Eger2Dao {
	List<Event> listByMycoupone(String barcode) throws Exception;
}