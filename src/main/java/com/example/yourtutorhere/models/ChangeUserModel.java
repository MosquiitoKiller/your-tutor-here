package com.example.yourtutorhere.models;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ChangeUserModel {
    private String email;
    private String firstName;
    private String middleName;
    private String lastName;
    private Date dateOfBirth;
    private String country;
    private String town;
    private String phone;
    private Boolean telegram;
    private Boolean whatsApp;
    private Boolean viber;
    private String password;
    private List<String> roles;
}
