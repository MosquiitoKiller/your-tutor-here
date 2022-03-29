package com.example.yourtutorhere.models;

import lombok.Data;

import java.util.Date;

@Data
public class UserInput {
    private String firstName;
    private String middleName;
    private String lastName;
    private String dateOfBirth;
    private String town;
    private String phone;
    private boolean telegram;
    private boolean whatsApp;
    private boolean viber;
    private int age;
    private String email;
    private String password;

}
