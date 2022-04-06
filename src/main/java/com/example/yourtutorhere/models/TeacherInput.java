package com.example.yourtutorhere.models;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TeacherInput {

    private boolean learnInHome;
    private boolean learnInStudent;
    private boolean remote;

    private String education;
    private String subject;
    private int price;

    private MultipartFile img;
    private String aboutTeacher;
}
