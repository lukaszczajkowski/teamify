package se.kth.sda.wellbean.meeting;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;

public class JWTTokenZoomAPI {
    String secret = "8QsX6OZwy1iIFLp1k8ar41dZQ561f1tOQ2Wm";
    String apiKey = "YtMju52wQ0yMU3DjAC4U4w";
    HashMap<String, Object> header = new HashMap<>();
    String jwtToken = null ;
    private static final long TOKEN_MAX_AGE_MILLI_SECONDS = 3 * 24 * 60 * 60 * 1000;
    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm. HS256 ;

    public String getJWTToken() {
        Date expiresAt = getExpirationDate();
        header.put("alg", "HS256");
        header.put("type", "JWT");
        SecretKey key = Keys. hmacShaKeyFor (secret.getBytes(StandardCharsets. UTF_8 ));
        jwtToken = Jwts. builder ()
                .setHeader(header)
                .setIssuer( apiKey )
                .setExpiration( expiresAt) // new Date( new Date().getTime()+80000000))
                .signWith(key, signatureAlgorithm).compact();

        return jwtToken;
    }
    private Date getExpirationDate() {
        // JWT tokens has to be rotated
        Date expiresAt = new Date();
        expiresAt.setTime(expiresAt.getTime() + TOKEN_MAX_AGE_MILLI_SECONDS);
        return expiresAt;
    }

}
