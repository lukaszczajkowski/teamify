package se.kth.sda.wellbean.server.events;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Data
@Document
public class ServerEvent {

    @Id
    private String id;

    private String message;
    private Date timestamp;

    public ServerEvent() {
    }

    public ServerEvent(String message) {
        this.message = message;
        this.timestamp = Calendar.getInstance().getTime();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
