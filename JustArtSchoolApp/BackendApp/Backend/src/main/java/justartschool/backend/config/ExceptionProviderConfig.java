package justartschool.backend.config;

import justartschool.backend.utils.errors.ExceptionProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExceptionProviderConfig {
    @Bean
    public ExceptionProvider exceptionProvider() {
        return new ExceptionProvider();
    }
}
