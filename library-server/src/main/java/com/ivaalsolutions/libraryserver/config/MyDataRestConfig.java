package com.ivaalsolutions.libraryserver.config;

import com.ivaalsolutions.libraryserver.entity.Book;
import com.ivaalsolutions.libraryserver.entity.History;
import com.ivaalsolutions.libraryserver.entity.Message;
import com.ivaalsolutions.libraryserver.entity.Review;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    // For CORS mapping
    @Value("${allowed-origins}")
    private String allowedOrigins;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.POST,
                HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.PUT};

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(History.class);
        config.exposeIdsFor(Message.class);

        disableHttpMethods(Book.class, config, unsupportedActions);
        disableHttpMethods(Review.class, config, unsupportedActions);
        disableHttpMethods(History.class, config, unsupportedActions);
        disableHttpMethods(Message.class, config, unsupportedActions);

        // Configure CORS mapping
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class<?> theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions)
                )
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));
    }
}
