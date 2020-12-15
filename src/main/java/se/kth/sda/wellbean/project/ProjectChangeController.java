package se.kth.sda.wellbean.project;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.notification.NotificationService;
import se.kth.sda.wellbean.user.UserService;

@RestController
public class ProjectChangeController {
    private final ProjectService projectService;
    private final AuthService authService;
    private final UserService userService;
    private final NotificationService notificationService;
    private final Flux<ProjectChanged> events;
    private final ProjectChangedEventProcessor projectChangedEventProcessor;
    private final ProjectMapper mapper;

    public ProjectChangeController(ProjectService projectService,
                             AuthService authService,
                             UserService userService,
                             NotificationService notificationService,
                             ProjectChangedEventProcessor projectChangedEventProcessor,
                             ProjectMapper mapper) {
        this.projectService = projectService;
        this.authService = authService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.projectChangedEventProcessor = projectChangedEventProcessor;
        this.mapper = mapper;
        this.events = Flux.create(projectChangedEventProcessor).share();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/sse/project", produces = "text/event-stream;charset=utf-8")
    public ResponseEntity<Flux<ProjectDto>> stream() {
        System.out.println("Start listening to the project collection.");

        return ResponseEntity.ok().body(events.map(event -> {
            ProjectDto dto = this.mapper.entityToDto((Project) event.getSource());
            System.out.println("Mapping category " + dto.getTitle());
            return dto;
        }));
    }
}
