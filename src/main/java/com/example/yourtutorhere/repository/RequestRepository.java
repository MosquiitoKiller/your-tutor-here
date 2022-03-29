package com.example.yourtutorhere.repository;

import com.example.yourtutorhere.entities.Request;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RequestRepository extends MongoRepository<Request, ObjectId> {

}