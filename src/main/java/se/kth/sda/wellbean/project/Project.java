package se.kth.sda.wellbean.project;

import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.category.Category;
import se.kth.sda.wellbean.task.Task;
import se.kth.sda.wellbean.user.User;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
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

    @Column
    private long teamBeanScore;

    @ManyToOne
    private User creator;

    @ManyToMany
    private Set<User> users;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Task> tasks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Category> categories;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Event> events;

    @ElementCollection
    private List<Long> categoriesPositioning;

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

    public void setTeamBeanScore(long teamBeanScore) {
        this.teamBeanScore = teamBeanScore;
    }

    public long getTeamBeanScore() {
        return teamBeanScore;
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

    public List<Long> getCategoriesPositioning() {
        return categoriesPositioning;
    }

    public void setCategoriesPositioning(List<Long> categoriesPositioning) {
        this.categoriesPositioning = categoriesPositioning;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
