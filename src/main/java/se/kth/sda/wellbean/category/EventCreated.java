package se.kth.sda.wellbean.category;

import org.springframework.context.ApplicationEvent;
import se.kth.sda.wellbean.baseEntity.BaseEntity;

public class EventCreated extends ApplicationEvent {
    /**
     * Create a new {@code ApplicationEvent}.
     *
     * @param entity the object on which the event initially occurred or with
     *               which the event is associated (never {@code null})
     */
    public EventCreated(BaseEntity entity) {
        super(entity);
    }
}
