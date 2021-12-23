package lt.codeacademy.blog.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.codeacademy.blog.entity.User;
import lt.codeacademy.blog.security.dto.Login;
import lt.codeacademy.blog.security.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper objectMapper;
    private final JwtService jwtService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        setFilterProcessesUrl("/user/login");
        this.objectMapper = new ObjectMapper();
        this.jwtService = jwtService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            Login login = objectMapper.readValue(request.getReader(), Login.class);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    login.getUsername(),
                    login.getPassword()
            );
            return getAuthenticationManager().authenticate(authenticationToken);
        } catch (Exception e) {
            throw new BadCredentialsException("Bad credentials");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authResult);

        String token = jwtService.getToken((User) authResult.getPrincipal());
        response.addHeader("Authorization", token);

        chain.doFilter(request, response);
    }
}