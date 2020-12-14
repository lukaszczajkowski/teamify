package se.kth.sda.wellbean.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.category.CategoryMapper;
import se.kth.sda.wellbean.category.EventCreated;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private TaskRepository repo;

    private final ApplicationEventPublisher publisher;

    private final CategoryMapper mapper;

    public TaskService(TaskRepository repo, ApplicationEventPublisher publisher, CategoryMapper mapper) {
        this.repo = repo;
        this.publisher = publisher;
        this.mapper = mapper;
    }

    public List<Task> getAllListTask(String sort) {
        return repo.findAll().stream()
                .sorted(Comparator.comparing(Task::getTitle))
                .collect(Collectors.toList());
    }

    public  List<Task> getAllListTask() {
        return repo.findAll();
    }


    public Optional<Task> getById(Long id) {
        return repo.findById(id);
    }

    public Task create(Task newTask){

        Task saved = this.repo.save(newTask);

        this.publisher.publishEvent(new EventCreated(saved));

        return saved;
    }

    public void delete (Long id) {
        Task deleted = this.repo.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        this.publisher.publishEvent(new EventCreated(deleted));

        repo.deleteById(id);
    }

    public Task update(Task updatedTask)  {
        Task updated = repo.save(updatedTask);

        this.publisher.publishEvent(new EventCreated(updated));

        return updated;
    }

    public List<Task> gelAllTaskByMemberId(Long memberId) {
        return repo.findAllByMembers_id(memberId);
    }

    public List<Task> getAllTaskByCategoriesId(Long categoryId) {
        return repo.findAllByCategoryId(categoryId);
    }

    public List<Task> gelAllTaskByProjectId(Long projectId) {
        return repo.findAllByProjectId(projectId);
    }

    public List<Task> getAllTaskByCategoryId(Long creatorId) {
        return repo.findAllByCategoryId(creatorId);
    }

    public List<Task> findAllByCategoryIdAndMembers_Id(Long categoryId, Long memberId) {
        return repo.findAllByCategoryIdAndMembers_Id(categoryId, memberId);
    }

    public List<Task> findAllByProjectIdIdAndMembers_Id(Long projectId, Long memberId) {
        return repo.findAllByProjectIdAndMembers_Id(projectId, memberId);
    }
}
