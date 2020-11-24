package se.kth.sda.wellbean.project;

import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Table (name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Long creatorId;

    @ManyToMany
    private List<User> members;

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

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public List<User> addMember(User member) {
        this.members.add(member);
        return members;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }
}
