package com.example.yourtutorhere.controller;


import com.example.yourtutorhere.entities.LoginInput;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.entities.UserInput;
import com.example.yourtutorhere.server.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    User signUp(@RequestBody UserInput user) {
        return authService.register(user);
    }
    @PostMapping("/login")
    ResponseEntity<String> auth(@RequestBody LoginInput loginInput, HttpServletResponse httpServletResponse) {
        return authService.login(loginInput);
    }
//    @GetMapping("/users")
//    User getAllUsers() {
//        User user = new User("test","test","test",new Date(),"Usa","Moscow","12355435",true,true,true,"mike7677877@gmail.com","qwewqeqwe");
//        return user;
//    }
}
