package com.example.yourtutorhere.models;

import java.util.Date;
import java.util.List;

public class ChangeUserModel {
    private String mail;
    private String firstName;
    private String middleName;
    private String lastName;
    private Date dateOfBirth;
    private String country;
    private String town;
    private String phone;
    private Boolean telegram;
    private Boolean whatsApp;
    private Boolean viber;
    private String password;
    private List<String> roles;

    public ChangeUserModel(String mail,
                           String firstName,
                           String middleName,
                           String lastName,
                           Date dateOfBirth,
                           String country,
                           String town,
                           String phone,
                           Boolean telegram,
                           Boolean whatsApp,
                           Boolean viber,
                           String password,
                           List<String> roles) {
        this.mail = mail;
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
        this.password = password;
        this.roles = roles;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

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

    public Boolean isTelegram() {
        return telegram;
    }

    public void setTelegram(Boolean telegram) {
        this.telegram = telegram;
    }

    public Boolean isWhatsApp() {
        return whatsApp;
    }

    public void setWhatsApp(Boolean whatsApp) {
        this.whatsApp = whatsApp;
    }

    public Boolean isViber() {
        return viber;
    }

    public void setViber(Boolean viber) {
        this.viber = viber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
