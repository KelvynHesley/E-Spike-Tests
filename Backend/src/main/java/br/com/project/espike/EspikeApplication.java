package br.com.project.espike;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages =  "br.com.project.espike")
public class EspikeApplication {

    public static void main(String[] args) {
        SpringApplication.run(EspikeApplication.class, args);
    }

}
