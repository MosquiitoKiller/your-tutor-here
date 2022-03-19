package com.example.yourtutorhere.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {
    @GetMapping("/admin/1")
    String getUserInfo() {
        return "I am ADMIN";
    }
}
