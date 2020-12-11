package se.kth.sda.wellbean.bean;


import javax.persistence.*;

@Entity
public class BeansPreSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column
    private Long eventCount;

    @Column
    private Long duration;
    public BeansPreSet() {}

    public BeansPreSet(String description, long eventCount, String title, long duration) {
        this.title = title;
        this.description = description;
        this.eventCount = eventCount;
        this.duration = duration;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setEventCount(Long eventCount) {
        this.eventCount = eventCount;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getEventCount() {
        return eventCount;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }
}
