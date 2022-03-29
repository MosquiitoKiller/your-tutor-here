package com.example.yourtutorhere.entities;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

/**
 * Сущность Роль
 */
//@Entity
//@Data
//@Table(name = "roles_user")
//public class Role implements GrantedAuthority {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//
//    @Transient
//    @ManyToMany(mappedBy = "roles")
//    private Set<User> users;
//    public Role() {
//    }
//
//    public Role(Long id) {
//        this.id = id;
//    }
//
//    public Role(Long id, String name) {
//        this.id = id;
//        this.name = name;
//    }
//
//
//    @Override
//    public String getAuthority() {
//        return getName();
//    }
//}

public enum Role {
    ROLE_USER,
    ROLE_TEACHER,
    ADMIN
}