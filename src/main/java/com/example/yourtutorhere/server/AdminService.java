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
        if (userModel.getMail()==null) return null;
        User user = userRepository.findByMail(userModel.getMail()).orElse(null);
        if (user == null) return null;

        if (userModel.getFirstName()!=null) user.setFirstName(userModel.getFirstName());
        if (userModel.getMiddleName()!=null) user.setMiddleName(userModel.getMiddleName());
        if (userModel.getLastName()!=null) user.setLastName(userModel.getLastName());
        if (userModel.getDateOfBirth()!=null) user.setDateOfBirth(userModel.getDateOfBirth());
        if (userModel.getCountry()!=null) user.setCountry(userModel.getCountry());
        if (userModel.getTown()!=null) user.setTown(userModel.getTown());
        if (userModel.getPhone()!=null) user.setPhone(userModel.getPhone());
        if (userModel.isTelegram()!=null) user.setTelegram(userModel.isTelegram());
        if (userModel.isWhatsApp()!=null) user.setWhatsApp(userModel.isWhatsApp());
        if (userModel.isViber()!=null) user.setViber(userModel.isViber());
        if (userModel.getPassword()!=null) user.setPassword(userModel.getPassword());
        if (userModel.getRoles()!=null) user.setRoles(userModel.getRoles());

        return userRepository.save(user);
    }
}
