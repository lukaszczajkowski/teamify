package se.kth.sda.wellbean.project;

import org.springframework.context.ApplicationEvent;
import se.kth.sda.wellbean.category.Category;

public class ProjectChanged extends ApplicationEvent {
    /**
     * Create a new {@code ApplicationEvent}.
     *
     * @param project the object on which the even
     *                 t initially occurred or with
     *               which the event is associated (never {@code null})
     */
    public ProjectChanged(Project project) {
        super(project);
        System.out.println("Project change noticed");
    }
}
