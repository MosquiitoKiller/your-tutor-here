package com.example.yourtutorhere.models;

import lombok.Data;

@Data
public class TeacherInput {

    private boolean learnInHome;
    private boolean learnInStudent;
    private boolean remote;

    private String education;
    private String subject;
    private int price;

    private String img;
    private String aboutTeacher;
}
