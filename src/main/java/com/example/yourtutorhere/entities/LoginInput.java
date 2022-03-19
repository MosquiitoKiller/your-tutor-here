package com.example.yourtutorhere.entities;

public class LoginInput {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginInput(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
