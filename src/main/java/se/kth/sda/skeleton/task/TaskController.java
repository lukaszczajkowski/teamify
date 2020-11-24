package se.kth.sda.skeleton.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping("")
    public List<Task> getAllListTask(
            @RequestParam(required = false) String sort,
            @RequestParam (required = false) Long userId
    ) {
        if (sort == null) {
            sort = "title";
        }
        if (userId != null)
        {
            return service.gelAllTaskByUserId(userId);
        }
        else {
            return service.getAllListTask(sort);
        }
    }

    @GetMapping("/{id}")
    public Task getById(@PathVariable Long id) {
        return service.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    @PostMapping("")
    public Task create(@RequestBody Task newTask){
        service.create(newTask);
        return newTask;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

    @PutMapping("")
    public Task update(@RequestBody Task updatedTask)
    {
        service.update(updatedTask);
        return updatedTask;
    }

}
