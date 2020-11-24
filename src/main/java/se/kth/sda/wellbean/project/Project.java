package se.kth.sda.wellbean.project;

import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table (name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne
    private User creator;

    @ManyToMany
    private Set<User> users;

    public Project() {
    }

    public Project(String title) {
        this.title = title;
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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> members) {
        this.users = members;
    }

    public Set<User> addMember(User member) {
        this.users.add(member);
        return users;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }


}
