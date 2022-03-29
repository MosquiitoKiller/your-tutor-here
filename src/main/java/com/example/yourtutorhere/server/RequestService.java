package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.Request;
import com.example.yourtutorhere.repository.RequestRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    public List<Request> getAll(){
        return requestRepository.findAll();
    }

    public Request findById(ObjectId id){
        Optional<Request> request = requestRepository.findById(id);
        return request.get();
    }
}

