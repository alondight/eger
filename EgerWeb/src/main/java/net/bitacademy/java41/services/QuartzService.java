package net.bitacademy.java41.services;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.quartz.QuartzJobBean;


public class QuartzService extends  QuartzJobBean {
	private	QuartzServiceImpl quartzServiceImpl;
	
	@Async
	protected void executeInternal(JobExecutionContext ctx)
			throws JobExecutionException{
		quartzServiceImpl= (QuartzServiceImpl) ctx.getJobDetail()
                .getJobDataMap().get("quartzServiceImpl");
		try {
			quartzServiceImpl.quartz();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
