package com.example.yourtutorhere.server;

import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.repository.TeacherRepository;
import com.example.yourtutorhere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

@Service
public class UserService  {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeacherRepository teacherRepository;


    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format("com.example.demo.User.User with email {0} cannot be found.", email)));
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }


}
