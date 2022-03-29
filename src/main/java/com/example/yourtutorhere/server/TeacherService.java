package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.Teacher;
import com.example.yourtutorhere.repository.TeacherRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class TeacherService {
    @Autowired
    TeacherRepository teacherRepository;

    public List<Teacher> getAll(){
        return teacherRepository.findAll();
    }

    public Teacher findById(ObjectId objectId){
        Optional<Teacher> teacher = teacherRepository.findById(objectId);
        return teacher.get();
    }
}

