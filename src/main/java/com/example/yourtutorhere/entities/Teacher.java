package com.example.yourtutorhere.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;


@Data
@Document("teachers")
@NoArgsConstructor
@AllArgsConstructor
public class Teacher implements Serializable {
    @Id
    private ObjectId id = ObjectId.get();

    private boolean learnInHome;
    private boolean learnInStudent;
    private boolean remote;

    private String education;
    private String subject;
    private int price;

    private UserInfo userInfo;
    private String img;
    private String aboutTeacher;

    public Teacher(boolean learnInHome, boolean learnInStudent, boolean remote, String education, String subject, int price, String img, String aboutTeacher, UserInfo userInfo) {
        this.learnInHome = learnInHome;
        this.learnInStudent = learnInStudent;
        this.remote = remote;
        this.education = education;
        this.subject = subject;
        this.price = price;
        this.img = img;
        this.aboutTeacher = aboutTeacher;
        this.userInfo = userInfo;
    }
}
