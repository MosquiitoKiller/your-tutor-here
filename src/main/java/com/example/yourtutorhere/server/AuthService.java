package com.example.yourtutorhere.server;


import com.example.yourtutorhere.config.JWTUtil;
import com.example.yourtutorhere.entities.Role;
import com.example.yourtutorhere.entities.Teacher;
import com.example.yourtutorhere.entities.UserInfo;
import com.example.yourtutorhere.models.LoginInput;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.UserInput;
import com.example.yourtutorhere.repository.TeacherRepository;
import com.example.yourtutorhere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AuthService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired private JWTUtil jwtUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format("com.example.demo.User.User with email {0} cannot be found.", username)));
    }

    public User register(UserInput userInput){
        UserInfo userInfo = new UserInfo(userInput.getFirstName(),
                userInput.getMiddleName(),
                userInput.getLastName(),
                userInput.getAge(),
                userInput.getPhone(),
                userInput.getTown(),
                userInput.isViber(),
                userInput.isTelegram(),
                userInput.isWhatsApp());
        User user = new User(userInput.getEmail(),userInput.getPassword(),userInfo);
        System.out.println(userInput.isTeacher());
        if (userInput.isTeacher()){
            Teacher teacher = new Teacher(userInput.getTeacherInput().isLearnInHome(),
                    userInput.getTeacherInput().isLearnInStudent(),
                    userInput.getTeacherInput().isRemote(),
                    userInput.getTeacherInput().getEducation(),
                    userInput.getTeacherInput().getSubject(),
                    userInput.getTeacherInput().getPrice(),
                    cloudinaryService.uploadFile(userInput.getTeacherInput().getImg()),
                    userInput.getTeacherInput().getAboutTeacher(),
                    userInfo);
            System.out.println(teacher);
            teacherRepository.save(teacher);
            user.setTeacher(teacher);

            List<Role> list = Arrays.asList(Role.ROLE_USER,Role.ROLE_TEACHER);
            user.setRoles(list);
        }
        else{
            user.setRoles(Collections.singletonList(Role.ROLE_USER));
        }

        String cryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(cryptedPassword);
        return userRepository.save(user);
    }
    public ResponseEntity<String> login (LoginInput loginInput){
        Optional<User> user = userRepository.findByEmail(loginInput.getEmail());
        if(user.isPresent()){
            if (bCryptPasswordEncoder.matches(loginInput.getPassword(), user.get().getPassword())) {
                String token = jwtUtil.generateToken(loginInput.getEmail());
                return new ResponseEntity(token, HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity("", HttpStatus.NOT_FOUND);
        }
        return null;
    }
}
