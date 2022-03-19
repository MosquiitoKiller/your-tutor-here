package com.example.yourtutorhere.entities;

import java.util.Date;

public class UserInput {
    private String firstName;
    private String middleName;
    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isTelegram() {
        return telegram;
    }

    public void setTelegram(boolean telegram) {
        this.telegram = telegram;
    }

    public boolean isWhatsApp() {
        return whatsApp;
    }

    public void setWhatsApp(boolean whatsApp) {
        this.whatsApp = whatsApp;
    }

    public boolean isViber() {
        return viber;
    }

    public void setViber(boolean viber) {
        this.viber = viber;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserInput(String firstName, String middleName, String lastName, Date dateOfBirth, String country, String town, String phone, boolean telegram, boolean whatsApp, boolean viber, String mail, String password) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.country = country;
        this.town = town;
        this.phone = phone;
        this.telegram = telegram;
        this.whatsApp = whatsApp;
        this.viber = viber;
        this.mail = mail;
        this.password = password;
    }

    private Date dateOfBirth;
    private String country;
    private String town;
    private String phone;
    private boolean telegram;
    private boolean whatsApp;
    private boolean viber;
    private String mail;
    private String password;

}

