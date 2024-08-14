package justartschool.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Value("${jwt.secret-key}")
    private String jwtSecretKey;

    @Bean
    public String jwtSecretKey() {
        return jwtSecretKey;
    }
}
