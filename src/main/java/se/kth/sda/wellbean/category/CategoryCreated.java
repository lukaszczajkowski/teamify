package se.kth.sda.wellbean.category;

import org.springframework.context.ApplicationEvent;

public class CategoryCreated extends ApplicationEvent {
    /**
     * Create a new {@code ApplicationEvent}.
     *
     * @param category the object on which the event initially occurred or with
     *               which the event is associated (never {@code null})
     */
    public CategoryCreated(Category category) {
        super(category);
    }
}
