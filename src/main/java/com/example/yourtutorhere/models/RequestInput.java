package com.example.yourtutorhere.models;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class RequestInput {
    private ObjectId id;
    private String text;
    private Boolean learnInHome;
    private Boolean learnInStudent;
    private Boolean remote;
    private String subject;
}

