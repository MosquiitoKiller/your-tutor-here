package com.example.yourtutorhere.controller;

import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.UserInput;
import com.example.yourtutorhere.server.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user/info")
    public User getUserInfo(){
        return userService.findByEmail(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
    }
    @PostMapping("/user/info")
    public User setUserInfo(@RequestBody UserInput userInput){
        return userService.updateUser(userInput);
    }
}
