package se.kth.sda.wellbean.task;

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
    @Column (name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;


    // Each task can have many users and each user can have many tasks
    //@ManyToMany(mappedBy = "task")
    @ManyToMany
    private List<User> members;

    // one task has many comments
    @OneToMany
    private List<Comment> comments;

    @ManyToOne
    private Project project;

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

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    
    public Category getCategories() {
        return categories;
    }

    public void setCategories(Category categories) {
        this.categories = categories;
    }
}
