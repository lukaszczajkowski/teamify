package se.kth.sda.wellbean.server.events;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

import java.util.Date;

public interface ServerEventRepository extends ReactiveMongoRepository<ServerEvent, String> {
    Flux<ServerEvent> findByTimestampGreaterThanOrderByTimestampAsc(Date date);
    Flux<ServerEvent> findAllByOrderByTimestampDesc();
}
