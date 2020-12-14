package se.kth.sda.wellbean.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import se.kth.sda.wellbean.baseEntity.BaseEntity;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.server.events.ServerEventService;
import se.kth.sda.wellbean.task.Task;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.Set;

@Entity
//@EntityListeners(CategoryListener.class)
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private long id;
    @Column()
    private String title;

    @ManyToOne
    private Project project;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Task> task;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Task> tasks;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

    public Category() {
    }
    public Category(long id, String title)
    {
        this.id=id;
        this.title=title;
    }



    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getTitle() {
        return title;
    }

    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }

    @PrePersist
    public void prePersist() {
        this.dateCreated = OffsetDateTime.now();
        this.lastUpdated = this.dateCreated;
    }

    @PreUpdate
    public void preUpdate() {
        this.lastUpdated = OffsetDateTime.now();
    }

}
