package se.kth.sda.wellbean.category;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.FluxSink;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;

@Slf4j
@Component
public class EventCreatedEventProcessor implements ApplicationListener<EventCreated>,
        Consumer<FluxSink<EventCreated>> {

    private final Executor executor;
    private final BlockingQueue<EventCreated> queue = new LinkedBlockingQueue<>(10);

    public EventCreatedEventProcessor(@Qualifier("brokerChannelExecutor") Executor executor) {
        this.executor = executor;
    }

    @Override
    public void accept(FluxSink<EventCreated> categoryCreatedFluxSink) {
        this.executor.execute(() -> {
            while (true) {
                try {
                    EventCreated event = queue.take();
                    categoryCreatedFluxSink.next(event);
                } catch (InterruptedException e) {
                    ReflectionUtils.rethrowRuntimeException(e);
                }
            }
        });
    }

    @Override
    public void onApplicationEvent(EventCreated event) {
        this.queue.offer(event);
    }
}
