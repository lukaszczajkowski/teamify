package se.kth.sda.wellbean.task;

import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Data
public class TaskDto {
    @NonNull
    private UUID id;

    @NonNull
    private String title;

    @NonNull
    private String description;

    public TaskDto() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
}
