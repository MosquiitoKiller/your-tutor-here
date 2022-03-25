package com.example.yourtutorhere.controller;

import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.ChangeUserModel;
import com.example.yourtutorhere.server.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/1")
    String getUserInfo() {
        return "I am ADMIN";
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return adminService.getAll();
    }

    @PatchMapping("/users")
    User changeUser(@RequestBody ChangeUserModel userModel){
        System.out.println(userModel.getMail());
        return adminService.changeUser(userModel);
    }
}
