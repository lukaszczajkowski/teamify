package se.kth.sda.wellbean.server.events;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ServerEventService {

    private final ServerEventRepository serverEventRepository;

    public ServerEventService(ServerEventRepository serverEventRepository) {
        this.serverEventRepository = serverEventRepository;
    }

    public Mono<ServerEvent> getLastEvent() {
        return serverEventRepository.findAll().last();
    }

    public Mono<ServerEvent> create() {
        System.out.println("Server event created!");
        return serverEventRepository.save(new ServerEvent("created"));
    }
}
