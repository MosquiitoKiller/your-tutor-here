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

    private UserInfo userInfo;

    private boolean learnInHome;
    private boolean learnInStudent;
    private boolean remote;

    private String country;
    private String city;
    private String education;
    private String object;
    private int price;

    private String img;
    private String aboutTeacher;

    public Teacher(UserInfo userInfo,  boolean learnInHome, boolean learnInStudent, boolean remote, String country, String city, String education, String object, int price, String img, String aboutTeacher) {
        this.userInfo = userInfo;
        this.learnInHome = learnInHome;
        this.learnInStudent = learnInStudent;
        this.remote = remote;
        this.country = country;
        this.city = city;
        this.education = education;
        this.object = object;
        this.price = price;
        this.img = img;
        this.aboutTeacher = aboutTeacher;
    }
}

