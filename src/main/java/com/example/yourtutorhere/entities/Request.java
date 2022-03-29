package com.example.yourtutorhere.entities;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("request")
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Request implements Serializable {

    @Id
    private ObjectId id =ObjectId.get();
    private String text;
    private String date;
    private UserInfo userInfo;
    private boolean learnInHome;
    private boolean learnInStudent;
    private boolean remote;

    private String country;
    private String city;
    private String object;

}

