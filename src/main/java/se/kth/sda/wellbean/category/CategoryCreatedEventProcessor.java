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
public class CategoryCreatedEventProcessor implements ApplicationListener<CategoryCreated>,
        Consumer<FluxSink<CategoryCreated>> {

    private final Executor executor;
    private final BlockingQueue<CategoryCreated> queue = new LinkedBlockingQueue<>();

    public CategoryCreatedEventProcessor(@Qualifier("brokerChannelExecutor") Executor executor) {
        this.executor = executor;
    }

    @Override
    public void accept(FluxSink<CategoryCreated> categoryCreatedFluxSink) {
        this.executor.execute(() -> {
            while (true) {
                try {
                    CategoryCreated event = queue.take();
                    categoryCreatedFluxSink.next(event);
                } catch (InterruptedException e) {
                    ReflectionUtils.rethrowRuntimeException(e);
                }
            }
        });
    }

    @Override
    public void onApplicationEvent(CategoryCreated event) {
        this.queue.offer(event);
    }
}
