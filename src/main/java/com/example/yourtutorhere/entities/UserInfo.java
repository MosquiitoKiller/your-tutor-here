package com.example.yourtutorhere.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfo  {
    private String firstName;
    private String middleName;
    private String lastName;
    private int age;
    private String phone;
    private String town;
    private boolean viber;
    private boolean telegram;
    private boolean whatsApp;

}
