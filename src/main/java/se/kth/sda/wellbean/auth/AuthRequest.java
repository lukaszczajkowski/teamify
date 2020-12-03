package se.kth.sda.wellbean.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class AuthRequest {
    private String email;
    private String password;

    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    //@JsonIgnore
    public String getPassword() {
        return password;
    }

    //@JsonIgnore
    public void setPassword(String password) {
        this.password = password;
    }
}
