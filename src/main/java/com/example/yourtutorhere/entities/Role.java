package com.example.yourtutorhere.entities;

import org.springframework.security.core.GrantedAuthority;


import java.util.List;

//@Entity
//public class Role implements GrantedAuthority {
//    @Id
//    private Long id;
//    private String name;
//
//    @Transient
//    @ManyToMany(mappedBy = "roles")
//    private List<User> users;
//
//
//    public String getName() {
//        return name;
//    }
//
//    @Override
//    public String getAuthority() {
//        return getName();
//    }
//
//    public Long getId() {
//        return id;
//    }
//}