package se.kth.sda.wellbean.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.category.Category;
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
        //TODO if current user has access to tasks
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
        //don't need to check the access of the user, since it was already done in scope of the project
        if (categoryId != null)
        {
            return service.getAllTaskByCategoryId(categoryId);
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
    public List<Task> getAllTaskByProjectId(@PathVariable Long projectId)
    {
        //don't need to check the access of the user, since it was already done in scope of the project
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
     Accepts a task object as a parameter and returns it after saving.
     * It sets the user creator as the currently logged in user and adds the creator
     * to the list of task's members.
     * Example of usage:
     * localhost:8080/tasks
     * @param newTask
     * @return created Task
     */

    @PostMapping("")
    public Task create(@PathVariable Long categoryId, @RequestBody Task newTask){
        //TODO: assign to project and category
        //Category category = new Category(); //-> find it via the category service
        //newTask.setCategories(category);
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
        //TODO: check project
        //updatedTask.addMember(getCurrentUser());
       // currentuser has access to task
        service.update(updatedTask);
        return updatedTask;
    }

    /**
     * accepts a task to be updated and return updated task
     * and added current user which updated the task to the member list
     *  localhost:8080/tasks/1/userId?userId=1
     * @param taskID, userId
     * @return updated task
     *
     */

    @PutMapping("/{taskID}/userId")
    public Task update(@PathVariable Long taskID, @PathVariable Long userId)
    {
        Task updatedTask = service.getById(taskID).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User newMember = userService.findById(userId);
        updatedTask.addMember(newMember);
        service.update(updatedTask);
        return updatedTask;
    }

    /**
     * Delete member from  the task with the given id - allowed only for users
     * and return updated task
     * localhost:8080/tasks/1/userId?userId=1
     * @param taskId, userId
     * @throws ResponseStatusException
     */
    @PutMapping("{taskId}/remove/userId")
    @DeleteMapping("/{taskID}/userId")
    public Task delete(@PathVariable Long taskId, @PathVariable Long userId){
        Task updatedTask = service.getById(taskId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User newMember = userService.findById(userId);
        updatedTask.removeMember(newMember);
        service.update(updatedTask);
        return updatedTask;
    }

    /**
     * Deletes the task with the given id
     * Example of usage:
     * localhost:8080/1 - deletes the task with the ID = 1
     * @param id
     * @throws ResponseStatusException
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        Task task = service.getById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        service.delete(id);
    }

    private User getCurrentUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }



}

