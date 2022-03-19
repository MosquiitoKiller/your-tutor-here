package com.example.yourtutorhere.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/user/1")
    String getUserInfo() {
        return "I am USER";
    }
}
