package se.kth.sda.wellbean.bean;

import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Bean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;
    @Column(name = "completed")
    private boolean completed = false;

    @OneToMany(mappedBy = "bean", cascade = CascadeType.ALL)
    private Set<Event> event;

    @OneToOne
    private User user;

    @Column
    private LocalDate createdDate = LocalDate.now();

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


    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
