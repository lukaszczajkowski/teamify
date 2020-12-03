package se.kth.sda.wellbean.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;


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
        return repo.save(newTask);
    }

    public void delete (Long id) {
        repo.deleteById(id);
    }

    public void update(Task updatedTask)  {
        repo.save(updatedTask);
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
