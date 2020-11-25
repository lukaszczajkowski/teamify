package se.kth.sda.wellbean.project;

import se.kth.sda.wellbean.category.Category;
import se.kth.sda.wellbean.task.Task;
import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
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

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Task> tasks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Category> categories;

    public Project() {
        this.tasks = new HashSet<>();
    }


    public Project(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Project(Long id, String title, User creator, Set<User> users) {
        this.id = id;
        this.title = title;
        this.creator = creator;
        this.users = users;
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

    public Set<User> removeUser(User member) {
        this.users.remove(member);
        return users;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Set<Task> addTask(Task task) {
        if(this.tasks == null) {
            this.tasks = new HashSet<>();
        }
        tasks.add(task);
        return this.tasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return id.equals(project.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
