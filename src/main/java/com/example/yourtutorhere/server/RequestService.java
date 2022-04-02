package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.Request;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.RequestInput;
import com.example.yourtutorhere.repository.RequestRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private UserService userService;

    public List<Request> getAll(){
        return requestRepository.findAll();
    }

    public Request findById(ObjectId id){
        Optional<Request> request = requestRepository.findById(id);
        return request.get();
    }

    public Request addRequest(RequestInput requestInput){
        User currentUser = userService.getCurrentUser();
        Request request = new Request(requestInput.getText(),
                String.valueOf(new Date()),
                requestInput.getLearnInHome(),
                requestInput.getLearnInStudent(),
                requestInput.getRemote(),
                currentUser.getUserInfo().getTown(),
                requestInput.getSubject());
        currentUser.getRequestList().add(request);
        userService.save(currentUser);
        return requestRepository.save(request);
    }

    public Request updateRequest(RequestInput requestInput){

        Request request = requestRepository.findById(requestInput.getId()).orElse(null);
        if(request==null) return null;

        if (requestInput.getText()!=null) request.setText(requestInput.getText());
        if (requestInput.getLearnInHome()!=null) request.setLearnInHome(requestInput.getLearnInHome());
        if (requestInput.getLearnInStudent()!=null) request.setLearnInStudent(requestInput.getLearnInStudent());
        if (requestInput.getRemote()!=null) request.setRemote(requestInput.getRemote());
        if (requestInput.getSubject()!=null) request.setSubject(requestInput.getSubject());
        User user = userService.getCurrentUser();
        List<Request> requestList = user.getRequestList();
        for (int i=0;i<requestList.size();++i) {
            if (requestList.get(i).getId().equals(request.getId())){
                requestList.set(i,request);
                break;
            }
        }
        user.setRequestList(requestList);
        userService.save(user);
        return requestRepository.save(request);
    }

}
