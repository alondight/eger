package net.bitacademy.java41.services;

import net.bitacademy.java41.dao.QuartzDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


public class QuartzServiceImpl extends QuartzService {
	@Autowired	QuartzDao quartzDao;

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	protected void quartz() throws Exception{
		System.out.println("------------------------success------------------");
		try {
			quartzDao.deleteOldCcoupone();
			quartzDao.deleteOldEventCCoupone();
			quartzDao.deleteOldEvent();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
