package com.example.yourtutorhere.models;

import com.example.yourtutorhere.entities.Role;
import lombok.Data;

import java.util.List;

@Data
public class ChangeUserModel {
    private String email;
    private List<Role> roles;
}
