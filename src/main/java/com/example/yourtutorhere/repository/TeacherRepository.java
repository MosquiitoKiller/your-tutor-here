package com.example.yourtutorhere.repository;

import com.example.yourtutorhere.entities.Teacher;
import com.example.yourtutorhere.entities.UserInfo;
import org.bson.types.ObjectId;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeacherRepository extends MongoRepository<Teacher, ObjectId> {
    Teacher findTeacherByUserInfo(UserInfo userInfo);
}