package se.kth.sda.wellbean.meeting;

import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long id;

    @ManyToOne
    private User host;

    @Column
    private String topic;

    @Column
    private String agenda;

    @Column
    private Long type;

    @Column(columnDefinition="TEXT")
    private String start_url;

    @Column(columnDefinition="TEXT")
    private String join_url;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private Set<Event> event;

    @Column
    private LocalDateTime startTime;

    @Column
    private Long duration;

    @Column
    private String password;


    public Meeting() {}
    public Meeting(Long id, String topic, String agenda,Long type, LocalDateTime startTime,
                   Long duration,String password, String start_url, String join_url) {
        this.id=id;
        this.topic=topic;
        this.agenda=agenda;
        this.type=type;
        this.startTime=startTime;
        this.duration=duration;
        this.password=password;
        this.start_url = start_url;
        this.join_url = join_url;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setType(long type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public Long getType() {
        return type;
    }

    public Long getDuration() {
        return duration;
    }

    public String getPassword() {
        return password;
    }


    public void setHost(User host) {
        this.host = host;
    }

    public User getHost() {
        return host;
    }


    public String getAgenda() {
        return agenda;
    }

    public void setAgenda(String agenda) {
        this.agenda = agenda;
    }

    public void setStart_url(String start_url) {
        this.start_url = start_url;
    }

    public String getStart_url() {
        return start_url;
    }

    public void setJoin_url(String join_url) {
        this.join_url = join_url;
    }

    public String getJoin_url() {
        return join_url;
    }

}
