package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.ChangeUserModel;
import com.example.yourtutorhere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User changeUser(ChangeUserModel userModel){
        if (userModel.getEmail()==null) return null;
        User user = userRepository.findByEmail(userModel.getEmail()).orElse(null);
        if (user == null) return null;
        System.out.println(userModel.getRoles());
        if (userModel.getRoles()!=null) user.setRoles(userModel.getRoles());

        return userRepository.save(user);
    }
}
