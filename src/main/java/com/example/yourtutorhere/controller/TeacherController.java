package com.example.yourtutorhere.controller;

import com.example.yourtutorhere.entities.Teacher;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.server.TeacherService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/teachers")
    public List<User> getTeachers(){
        return teacherService.getAll();
    }

    @GetMapping("/teacher/info")
    public Teacher getTeacherInfo(){
        return  teacherService.getCurrentTeacher();
    }
    @GetMapping("/teachers/{teacherId}")
    public User getTeacherById(@PathVariable ObjectId teacherId){
        return teacherService.findById(teacherId);
    }
}
