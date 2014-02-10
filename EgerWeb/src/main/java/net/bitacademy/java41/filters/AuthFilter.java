package net.bitacademy.java41.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.bitacademy.java41.vo.Client;

public class AuthFilter implements Filter {

	@Override
	public void destroy() {}

	@Override
	public void doFilter(
			ServletRequest req, ServletResponse resp,
			FilterChain next) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		
		Client client = 
				(Client)request.getSession().getAttribute("client");
		if (client != null || /*로그인 했다면*/
				request.getServletPath().startsWith("/auth") || /* 로그인/로그아웃 요청인 경우*/ 
				request.getServletPath().startsWith("/auth/signup")) /* 회원가입인 경우 */
		{ 
			next.doFilter(req, resp);
			
		} else {
			response.sendRedirect(
					request.getServletContext().getContextPath() + 
					"/auth/login");
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {}

}
