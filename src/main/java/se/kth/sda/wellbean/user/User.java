package se.kth.sda.wellbean.user;

import org.hibernate.validator.constraints.Length;
import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.comment.Comment;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.task.Task;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="account")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Email(message = "Invalid email address! Please provide a valid email address")
    @NotEmpty(message = "Please provide an email address")
    @Column(name = "email", unique = true)
    private String email;


    @Length(min = 5, max=100, message = "Password length most be between 5-100 characters")
    @Column(name = "password")
    private String password;

    @Length(min = 3, max=100, message = "Name must be between 3-100 characters")
    @Column(name = "name")
    private String name;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "previouslogintime")
    private LocalDateTime previousLoginTime = LocalDateTime.now();

    @Column
    private long beanScore;

    @ManyToMany
    private List<Task> tasks;

    @ManyToMany
    private Set<Project> projects;

    @OneToMany(mappedBy = "creator")
    private Set<Project> createdProjects;

    @ManyToMany
    private Set<Event> events;

    @OneToMany(mappedBy = "creator")
    private Set<Event> createdEvents;

    @OneToMany(mappedBy = "user")
    private List<Comment> createdComments;

    // Hibernate needs a default constructor to function
    public User() {}

    public User(@Email(message = "Invalid email address! Please provide a valid email address") @NotEmpty(message = "Please provide an email address") String email, @Length(min = 5, max = 100, message = "Password length most be between 5-100 characters") String password, @Length(min = 3, max = 100, message = "Name must be between 3-100 characters") String name, LocalDateTime previousLoginTime) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.previousLoginTime=previousLoginTime;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getPreviousLoginTime() {
        return previousLoginTime;
    }

    public void setPreviousLoginTime(LocalDateTime previousLoginTime) {
        this.previousLoginTime = previousLoginTime;
    }

    public void setBeanScore(long beanScore) {
        this.beanScore = beanScore;
    }

    public long getBeanScore() {
        return beanScore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", tasks=" + tasks +
                ", projects=" + projects +
                ", createdProjects=" + createdProjects +
                ", events=" + events +
                ", createdEvents=" + createdEvents +
                ", createdComments=" + createdComments +
                '}';
    }
}
