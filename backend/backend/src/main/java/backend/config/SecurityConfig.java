package backend.config;

import backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(401, "Unauthorized");
                        })
                )
                .authorizeHttpRequests(auth -> auth
                        // Public APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // User Management
                        .requestMatchers("/api/users", "/api/users/**").hasRole("ADMIN")

                        // Roles
                        .requestMatchers("/api/roles", "/api/roles/**").hasRole("ADMIN")

                        // Dashboard
                        .requestMatchers("/api/dashboard", "/api/dashboard/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")

                        // Threat APIs
                        .requestMatchers(HttpMethod.GET, "/api/threats", "/api/threats/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")
                        .requestMatchers(HttpMethod.POST, "/api/threats", "/api/threats/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.PUT, "/api/threats", "/api/threats/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.DELETE, "/api/threats", "/api/threats/**")
                        .hasRole("ADMIN")

                        // IOC APIs
                        .requestMatchers(HttpMethod.GET, "/api/ioc", "/api/ioc/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")
                        .requestMatchers(HttpMethod.POST, "/api/ioc", "/api/ioc/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.PUT, "/api/ioc", "/api/ioc/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.DELETE, "/api/ioc", "/api/ioc/**")
                        .hasRole("ADMIN")

                        // Alert APIs
                        .requestMatchers(HttpMethod.GET, "/api/alerts", "/api/alerts/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")
                        .requestMatchers(HttpMethod.POST, "/api/alerts", "/api/alerts/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.PUT, "/api/alerts", "/api/alerts/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.DELETE, "/api/alerts", "/api/alerts/**")
                        .hasRole("ADMIN")

                        // Vulnerability APIs
                        .requestMatchers(HttpMethod.GET, "/api/vulnerabilities", "/api/vulnerabilities/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")

                        .requestMatchers(HttpMethod.POST, "/api/vulnerabilities", "/api/vulnerabilities/**")
                        .hasAnyRole("ADMIN", "ANALYST")

                        .requestMatchers(HttpMethod.PUT, "/api/vulnerabilities", "/api/vulnerabilities/**")
                        .hasAnyRole("ADMIN", "ANALYST")

                        // Report APIs
                        .requestMatchers("/api/reports", "/api/reports/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")

                        // Playbook APIs
                        .requestMatchers(HttpMethod.GET, "/api/playbooks", "/api/playbooks/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")
                        .requestMatchers(HttpMethod.POST, "/api/playbooks", "/api/playbooks/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.PUT, "/api/playbooks", "/api/playbooks/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.DELETE, "/api/playbooks", "/api/playbooks/**")
                        .hasRole("ADMIN")

                        // Incident APIs
                        .requestMatchers(HttpMethod.GET, "/api/incidents", "/api/incidents/**")
                        .hasAnyRole("ADMIN", "ANALYST", "VIEWER")
                        .requestMatchers(HttpMethod.POST, "/api/incidents", "/api/incidents/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.PUT, "/api/incidents", "/api/incidents/**")
                        .hasAnyRole("ADMIN", "ANALYST")
                        .requestMatchers(HttpMethod.DELETE, "/api/incidents", "/api/incidents/**")
                        .hasRole("ADMIN")

                        // Allow Preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()

                        .anyRequest()
                        .authenticated()
                )
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(form -> form.disable());

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}
