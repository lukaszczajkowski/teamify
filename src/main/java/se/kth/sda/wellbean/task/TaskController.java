package se.kth.sda.wellbean.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.comment.Comment;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

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
        //TODO: check the user ??
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
        //TODO: check the user ??? 
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


    //TODO: find all tasks related to the specific project AND specific category


    /**
     Accepts a task object as a parameter and returns it after saving.
     * It sets the user creator as the currently logged in user and adds the creator
     * to the list of task's members.
     * Example of usage:
     * localhost:8080/tasks + task in the request body
     * @param newTask
     * @return created Task
     */
    @PostMapping("")
    public Task create(@RequestBody Task newTask){
        //TODO: assign to project and category
        newTask.setCreator(getCurrentUser());
        newTask.addMember(getCurrentUser());
        service.create(newTask);
        return newTask;
    }

    /**
     * accepts a task to be updated and return updated task
     * and added current user which updated the task to the member list
     * @param updatedTask
     * @return updated task
     *
     */

    @PutMapping("")
    public Task update(@RequestBody Task updatedTask)
    {
        //TODO: should we check the access of the user?
        updatedTask.addMember(getCurrentUser());
        service.update(updatedTask);
        return updatedTask;
    }

    /**
     * Deletes the task with the given id - allowed only for users
     * who created the task
     * Example of usage:
     * localhost:8080/1 - deletes the task with the ID = 1
     * @param id
     * @throws ResponseStatusException
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        Task task = service.getById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (isCreator(task)) {
            service.delete(id);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private User getCurrentUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }

    private boolean isCreator(Task task) {
        return getCurrentUser() == task.getCreator();
    }

}

