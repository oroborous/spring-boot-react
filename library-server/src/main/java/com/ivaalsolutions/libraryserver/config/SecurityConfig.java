package com.ivaalsolutions.libraryserver.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF (Cross site request forgery)
        http.csrf().disable();

        // Protect endpoints at /api/<type>/secure
        http
                .authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/api/*/secure/**")
                                .authenticated())
                .oauth2ResourceServer()
                .jwt();
        http
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll();

        // Add CORS filters to API endpoints
        http.cors();

        // Add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's to make the
        // response friendly
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
