package se.kth.sda.wellbean.calendar;

import se.kth.sda.wellbean.bean.Bean;
import se.kth.sda.wellbean.meeting.Meeting;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Column(name = "start")
    private LocalDateTime start;

    @Column(name = "finish")
    private LocalDateTime end;

    @ManyToMany
    private Set<User> users;

    @ManyToOne
    private User creator;

    @ManyToOne
    private Project project;

    @ManyToOne
    private Bean bean;

    @ManyToOne
    private Meeting meeting;


    private boolean allDay;

    //enables to edit an event's date by dragging
    private boolean editable;

    public Event() {
        this.users = new HashSet<>();
    }

    public Event(Long id, String title, String description, LocalDateTime start, LocalDateTime end) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime finish) {
        this.end = finish;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Set<User> addMember(User user) {
        if(this.users == null) {
            this.users = new HashSet<>();
        }
        this.users.add(user);
        return users;
    }

    public void removeMember(User user) {
        this.users.remove(user);
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public boolean isAllDay() {
        return allDay;
    }

    public void setAllDay(boolean allDay) {
        this.allDay = allDay;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public void setBean(Bean bean) {
        this.bean = bean;
    }

    public Bean getBean() {
        return bean;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", start=" + start +
                ", end=" + end +
                ", users=" + users +
                ", creator=" + creator +
                ", project=" + project +
                ", allDay=" + allDay +
                ", editable=" + editable +
                '}';
    }
}
