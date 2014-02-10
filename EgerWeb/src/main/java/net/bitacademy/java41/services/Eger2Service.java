package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Event;

public interface Eger2Service {
	List<Event> getCouponeList(String barcode) throws Exception;
}
