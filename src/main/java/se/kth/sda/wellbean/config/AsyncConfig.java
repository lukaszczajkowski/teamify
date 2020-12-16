package se.kth.sda.wellbean.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.Executors;

@Configuration
@EnableAsync
public class AsyncConfig  implements AsyncConfigurer {

    @Bean
    protected WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
                final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
                executor.setCorePoolSize(1);
                executor.setMaxPoolSize(10);
                executor.setThreadNamePrefix("flux-project-events-");
                executor.initialize();
                configurer.setDefaultTimeout(-1);
                configurer.setTaskExecutor(executor);
            }
        };
    }

    @Bean
    protected ConcurrentTaskExecutor getTaskExecutor() {
        return new ConcurrentTaskExecutor(Executors.newFixedThreadPool(500));
    }
}
