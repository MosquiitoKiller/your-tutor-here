package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.Teacher;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.repository.TeacherRepository;
import com.example.yourtutorhere.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class TeacherService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.getAllByTeacherIsNotNull();
    }

    public User findById(ObjectId objectId){
        return userRepository.getUserByTeacherIsNotNullAndId(objectId);
    }
}
