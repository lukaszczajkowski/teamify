package se.kth.sda.wellbean.project;

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
public class ProjectChangedEventProcessor implements ApplicationListener<ProjectChanged>,
        Consumer<FluxSink<ProjectChanged>> {

    private final Executor executor;
    private final BlockingQueue<ProjectChanged> queue = new LinkedBlockingQueue<>();

    public ProjectChangedEventProcessor(@Qualifier("getTaskExecutor") Executor executor) {
        this.executor = executor;
    }

    @Override
    public void accept(FluxSink<ProjectChanged> projectChangedFluxSink) {
        this.executor.execute(() -> {
            while (true) {
                try {
                    ProjectChanged event = queue.take();
                    projectChangedFluxSink.next(event);
                } catch (InterruptedException e) {
                    ReflectionUtils.rethrowRuntimeException(e);
                }
            }
        });
    }

    @Override
    public void onApplicationEvent(ProjectChanged event) {
        this.queue.offer(event);
    }
}
