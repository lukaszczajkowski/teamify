package se.kth.sda.wellbean.comment;

import se.kth.sda.wellbean.task.Task;
import se.kth.sda.wellbean.user.User;

import javax.persistence.*;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "body")
    private String body;

    //many comments from a single user
    @ManyToOne
    private User user;

    //many comments to a singe task
    @ManyToOne
    private Task task;

    public Comment() {
    }

    public Comment(Long id, String body, User user, Task task) {
        this.id = id;
        this.body = body;
        this.user = user;
        this.task = task;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}