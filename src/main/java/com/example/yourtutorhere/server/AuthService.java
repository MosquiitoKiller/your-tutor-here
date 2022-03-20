package com.example.yourtutorhere.server;


import com.example.yourtutorhere.config.JWTUtil;
import com.example.yourtutorhere.models.LoginInput;
import com.example.yourtutorhere.entities.User;
import com.example.yourtutorhere.models.UserInput;
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
import java.util.Optional;

@Service
@Transactional
public class AuthService implements UserDetailsService {
    @Autowired
    public UserRepository userRepository;
    @Autowired private JWTUtil jwtUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByMail(username).orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format("com.example.demo.User.User with email {0} cannot be found.", username)));
    }

    public User register(UserInput user){
        User user2 = new User(user.getFirstName(),user.getMiddleName(),user.getLastName(),user.getDateOfBirth(),user.getCountry(),user.getTown(),user.getPhone(),user.isTelegram(),user.isWhatsApp(),user.isViber(),user.getMail(),user.getPassword());
        String cryptedPassword = bCryptPasswordEncoder.encode(user2.getPassword());
        user2.setPassword(cryptedPassword);
        return userRepository.save(user2);
    }
    public ResponseEntity<String> login (LoginInput loginInput){
        Optional<User> user = userRepository.findByMail(loginInput.getEmail());
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
