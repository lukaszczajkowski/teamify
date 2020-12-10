package se.kth.sda.wellbean.task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import se.kth.sda.wellbean.category.Category;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.comment.Comment;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;


    // Each task can have many users and each user can have many tasks
    @ManyToMany
    @JsonIgnoreProperties("password")
    private Set<User> members;

    //@ManyToOne
    //private User creator;

    // one task has many comments
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("task")
    private List<Comment> comments;

    // many tasks in one project
    @ManyToOne
    private Project project;

    // many tasks belongs to one category
    @ManyToOne
    private Category category;

    public Task() {
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }


    public Category getCategory() {
        return this.category;
    }


    public void setCategory(Category category) {
        this.category = category;
    } 


    public void addMember(User user) {
        members.add(user);
    }

    public void removeMember(User newMember) {
        members.remove(newMember);
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
