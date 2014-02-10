package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.dao.Eger2Dao;
import net.bitacademy.java41.vo.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Eger2ServiceImpl implements Eger2Service{
	@Autowired Eger2Dao eger2Dao;

	public List<Event> getCouponeList(String barcode) throws Exception {
		return eger2Dao.listByMycoupone(barcode);
	}
}
