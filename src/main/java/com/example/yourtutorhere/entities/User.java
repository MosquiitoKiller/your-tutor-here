package com.example.yourtutorhere.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
public class User implements UserDetails {
    @Id
    private Long id;

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
    }

    @ManyToMany(fetch= FetchType.EAGER)
    private List<Role> roles;

    public Long getId() {
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
        return getRoles();
    }

    @Override
    public String getPassword() {
        return password;
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

    public List<Role> getRoles() {
        return roles;
    }
}
