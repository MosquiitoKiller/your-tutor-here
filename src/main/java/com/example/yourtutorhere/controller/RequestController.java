package com.example.yourtutorhere.controller;

import com.example.yourtutorhere.entities.Request;
import com.example.yourtutorhere.models.RequestInput;
import com.example.yourtutorhere.server.RequestService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {
    @Autowired
    private RequestService requestService;

    @GetMapping("/requests")
    public List<Request> getRequest(){
        return requestService.getAll();
    }

    @GetMapping("/requests/{requestId}")
    public Request getRequestById(@PathVariable ObjectId requestId){
        return requestService.findById(requestId);
    }

    @PostMapping("/add/request")
    public Request addRequest(@RequestBody RequestInput requestInput){
        return requestService.addRequest(requestInput);
    }

    @PatchMapping("/update/request")
    public Request updateRequest(@RequestBody RequestInput request){
        return requestService.updateRequest(request);
    }

}
