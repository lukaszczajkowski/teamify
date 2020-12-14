package se.kth.sda.wellbean.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import se.kth.sda.wellbean.baseEntity.BaseEntity;
import se.kth.sda.wellbean.category.EventCreated;
import se.kth.sda.wellbean.category.EventCreatedEventProcessor;

@RestController
@Slf4j
public class TaskStreamController {

    private final TaskService taskService;
    private final Flux<EventCreated> events;
    private final EventCreatedEventProcessor eventCreatedEventProcessor;
    private final TaskMapper mapper;

    public TaskStreamController(TaskService taskService,
                                EventCreatedEventProcessor eventCreatedEventProcessor,
                                TaskMapper mapper) {
        this.taskService = taskService;
        this.events = Flux.create(eventCreatedEventProcessor).share();
        this.eventCreatedEventProcessor = eventCreatedEventProcessor;
        this.mapper = mapper;
    }

        @CrossOrigin(origins = "http://localhost:3000")
        @GetMapping(value = "/sse/task", produces = "text/event-stream;charset=utf-8")
            public ResponseEntity<Flux<BaseEntity>> stream() {
            System.out.println("Start listening to the task collection.");

            return ResponseEntity.ok().body(
                    events.map(event -> {
                        BaseEntity toReturn = (BaseEntity) event.getSource();
                        System.out.println("Mapping task");
                        return toReturn;
                    })
            );
        }
}
