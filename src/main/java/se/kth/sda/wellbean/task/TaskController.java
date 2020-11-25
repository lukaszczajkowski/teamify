package se.kth.sda.wellbean.task;

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

    /**
     * Returns all tasks
     * @return List of all tasks
     */
    @GetMapping("")
    public List<Task> getAllTask(
            @RequestParam(required = false) String sort) {
        if (sort == null) {
            sort = "title";
        }
        return service.getAllListTask(sort);
    }

    /**
     * Accepts task id and returns a task that matches the id only
     * otherwise it throws not found exception
     *
     * Example of usage:
     * localhost:8080/tasks/1 - returns the task with the ID = 1
     * @param taskId
     * @return Task
     * @throws ResponseStatusException
     */

    @GetMapping("/{taskId}")
    public Task getById(@PathVariable Long taskId) {
        return service.getById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     * Accepts a category id and returns tasks that matches the id only
     * if the user is on inside the set of members, otherwise it throws a Method
     * not Allowed exception.
     * Example of usage:
     * localhost:8080/tasks/category?categoryId=1 - returns all the tasks related to category
     *  with ID = 1
     * @param categoryId
     * @return
     * @throws ResponseStatusException
     */
    @GetMapping("/category")
    public List<Task> getAllTaskByCategoryId(@PathVariable Long categoryId
    ) {
        //TODO: check the user
        if (categoryId != null)
        {
            return service.getAllTaskByCategoriesId(categoryId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Accepts a project id and returns tasks that matches the id only
     * if the user is on inside the set of members,
     * otherwise it throws a Method not Allowed exception.
     * Example of usage:
     * localhost:8080/tasks/project?projectId=1 - returns all the tasks related to project
     * with ID = 1
     * @param projectId
     * @return
     * @throws ResponseStatusException
     */

    @GetMapping("/project")
    public List<Task> getAllTaskByProjectId(@PathVariable  Long projectId)
    {
        //TODO: check the user
        if (projectId != null)
        {
            return service.gelAllTaskByProjectId(projectId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Returns all tasks assigned to specific member id. If user doesn't exist
     * method throw not found exception
     * Example of usage:
     * localhost:8080/tasks/memberId?membersId=1 - returns the project with the ID = 1
     * @param memberId
     * @return List of tasks with specific member id
     */
    @GetMapping("/memberId")
    public List<Task> getAllTaskByMemberId(@PathVariable Long memberId) {
        if (memberId != null)
        {
            return service.gelAllTaskByMemberId(memberId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Returns all tasks created by specific user id. If user doesn't exist
     * method throw not found exception
     * Example of usage:
     * localhost:8080/tasks/creatorId?creatorId=1 - returns the project with the ID = 1
     * @param creatorId
     * @return List of tasks with specific member id
     */
    @GetMapping("/creatorId")
    public List<Task> getAllTaskByCreatorId(@PathVariable Long creatorId) {
        if (creatorId != null)
        {
            return service.gelAllTaskByCreatorId(creatorId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    //TODO find all tasks related to specific project AND specific category



    @PostMapping("")
    public Task create(@RequestBody Task newTask){
        //TODO: assign project and add user
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
