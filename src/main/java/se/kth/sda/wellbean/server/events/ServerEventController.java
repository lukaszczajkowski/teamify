package se.kth.sda.wellbean.server.events;


import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.Calendar;
import java.util.Date;


@RestController
public class ServerEventController {

    private final ServerEventService serverEventService;
    private final ServerEventRepository serverEventRepository;
    private ConnectableFlux<Object> flux;

    public ServerEventController(ServerEventService serverEventService,
                                 ServerEventRepository serverEventRepository) {
        this.serverEventService = serverEventService;
        this.serverEventRepository =  serverEventRepository;
    }

    //@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
    @GetMapping(value = "/server-event", produces = "text/event-stream;charset=UTF-8")
    public Flux<ServerEvent> getAllServerEvents() {
        System.out.println("Getting events...");
        flux.autoConnect();
        System.out.println(serverEventRepository.findAllByOrderByTimestampDesc().take(1));
        return serverEventRepository.findAllByOrderByTimestampDesc().take(1);
    }

    @PostConstruct
    public void load()
    {
        this.flux = Flux.create(fluxSink -> {
            final Date lastChecked = Calendar.getInstance().getTime();
            Flux.interval(Duration.ofSeconds(2))
                    .map(s -> {
                        this.serverEventRepository
                                .findByTimestampGreaterThanOrderByTimestampAsc(lastChecked)
                                .doOnEach(commentSignal -> {
                                    fluxSink.next(commentSignal.get());
                                    lastChecked.setTime(commentSignal.get().getTimestamp().getTime());
                                })
                                .subscribe();
                        System.out.println(s.toString());
                        return s;
                    })
                    .subscribe();
        })
                .publishOn(Schedulers.parallel())
                .onBackpressureBuffer()
                .publish();
    }
}
