package se.kth.sda.wellbean.category;

import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Data
public class CategoryDto {
    @NonNull
    private UUID id;
    @NonNull
    private String title;

    public CategoryDto() {
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

    @Override
    public String toString() {
        return "CategoryDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
