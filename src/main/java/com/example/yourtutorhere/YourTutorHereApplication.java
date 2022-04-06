package com.example.yourtutorhere;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class YourTutorHereApplication {

	public static void main(String[] args) {
		SpringApplication.run(YourTutorHereApplication.class, args);
	}
	@Value("${cloudName}")
	private String cloudName;
	@Value("${apiSecret}")
	private String apiSecret;
	@Value("${apiKey}")
	private String apiKey;
	@Bean
	public Cloudinary cloudinaryConfig() {
		return new Cloudinary(ObjectUtils.asMap(
				"cloud_name", cloudName,
				"api_key", apiKey,
				"api_secret", apiSecret));
	}
}
