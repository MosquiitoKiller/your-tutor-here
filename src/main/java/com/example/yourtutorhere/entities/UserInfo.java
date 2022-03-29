package com.example.yourtutorhere.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Date;


@Data
@AllArgsConstructor
public class UserInfo  {
    private String firstName;
    private String middleName;
    private String lastName;
    private int age;
    private String phone;
    private String town;
    private String dateOfBirth;
    private boolean viber;
    private boolean telegram;
    private boolean whatsApp;

}

