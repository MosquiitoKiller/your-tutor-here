package com.example.yourtutorhere.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document("user2")
public class User implements UserDetails {
    @Id
    ObjectId id= ObjectId.get();
    private String firstName;
    private String middleName;
    private String lastName;
    private Date dateOfBirth;
    private String country;
    private String town;
    private String phone;
    private boolean telegram;
    private boolean whatsApp;
    private boolean viber;
    private String mail;
    private String password;
    private List<String> roles;

    public User() {
    }

    public User(String firstName,
                String middleName,
                String lastName,
                Date dateOfBirth,
                String country,
                String town,
                String phone,
                boolean telegram,
                boolean whatsApp,
                boolean viber,
                String mail,
                String password) {
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
        roles = new ArrayList<>();
        roles.add("ROLE_USER");
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setTelegram(boolean telegram) {
        this.telegram = telegram;
    }

    public void setWhatsApp(boolean whatsApp) {
        this.whatsApp = whatsApp;
    }

    public void setViber(boolean viber) {
        this.viber = viber;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public ObjectId getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public String getCountry() {
        return country;
    }

    public String getTown() {
        return town;
    }

    public String getPhone() {
        return phone;
    }

    public boolean isTelegram() {
        return telegram;
    }

    public boolean isWhatsApp() {
        return whatsApp;
    }

    public boolean isViber() {
        return viber;
    }

    public String getMail() {
        return mail;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities
                = new ArrayList<>();
        for (String role: roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    @Override
    public String getUsername() {
        return getMail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public List<String> getRoles() {
        return roles;
    }
}
