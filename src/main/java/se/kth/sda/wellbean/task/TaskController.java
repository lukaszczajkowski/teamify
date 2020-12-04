package se.kth.sda.wellbean.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.category.Category;
import se.kth.sda.wellbean.category.CategoryService;
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

    @Autowired
    private CategoryService categoryService;

    /**
     *
     * Returns all tasks
     * @return List of all tasks
     *
     *
     */
    @GetMapping("")
    public List<Task> getAllTask() {
        //TODO if current user has access to tasks
        return service.getAllListTask();
    }

    /**
     * Returns all tasks related to specific projectId. If project doesn't exist
     * method throw not found exception
     * Example of usage:
     * localhost:8080/tasks/projectId?projectId=1 - returns all the task
     * with projectId = 1
     * @param projectId
     * @return List of tasks with specific projectId
     * @throws ResponseStatusException
     */
    @GetMapping("/projectId")
    public List<Task> gelAllTaskByProjectId(@RequestParam Long projectId) {
        //TODO if current user has access to tasks
        if (projectId != null) {
            return service.gelAllTaskByProjectId(projectId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Returns all tasks related to specific category. If category doesn't exist
     * method throw not found exception
     * Example of usage:
     * localhost:8080/tasks/categoryId?categoryId=1 - returns all the task
     * with category  ID = 1
     * @param categoryId
     * @return List of tasks with specific category id
     * @throws ResponseStatusException
     */
    @GetMapping("/categoryId")
    public List<Task> getAllTaskByCategoryId(@RequestParam Long categoryId) {
        //TODO if current user has access to tasks
        if (categoryId != null) {
            return service.getAllTaskByCategoryId(categoryId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Returns all tasks created by specific user id. If user doesn't exist
     * method throw not found exception
     * Example of usage:
     * localhost:8080/tasks/memberId?memberId=1 - returns the all tasks related
     * to the user with the ID = 1
     * @param memberId
     * @return List of tasks with specific member id
     * @throws ResponseStatusException
     */
    @GetMapping("/memberId")
    public List<Task> getAllTaskByMemberId(@RequestParam Long memberId) {
        //TODO if current user has access to tasks
        if (memberId != null)
        {
            return service.gelAllTaskByMemberId(memberId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Returns all task with specific category AND specific user id. If user or category
     * tegory doesn't exist
     * method throw not found exception
     * Example of usage:
     * localhost:8080/tasks/memberCategory?categoryId=1&memberId=1 - returns the all tasks related
     * to the user with the ID = 1
     * @param memberId, categoryId
     * @return List of tasks with specific member id
     * @throws ResponseStatusException
     */
    @GetMapping("/categoryMember")
    public List<Task> getAllTask ( @RequestParam Long categoryId, @RequestParam Long memberId) {
        //TODO if current user has access to tasks
        if (memberId != null && categoryId != null)
        {
            return service.findAllByCategoryIdAndMembers_Id(categoryId, memberId);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
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
     Accepts a task object and id of category to which object belongs to as a parameter
     * and returns task after saving.
     *
     * Example of usage:
     * localhost:8080/tasks/1
     * @param newTask, categoryId
     * @return created Task
     * @throws ResponseStatusException
     */

    @PostMapping("/{categoryId}")
    public Task create(@PathVariable Long categoryId, @RequestBody Task newTask){
        Category newCategory =  categoryService.getById(categoryId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        newTask.setProject(newCategory.getProject());
        newTask.setCategory(newCategory);
        service.create(newTask);
        return newTask;
    }

    /**
     Accepts a task object and id of category to which object belongs to as a parameter
     * and returns task after saving.
     *
     * Example of usage:
     * localhost:8080/tasks/1
     * @param updatedTask, categoryId
     * @throws ResponseStatusException
     * @return created Task
     */

    @PutMapping("/{categoryId}")
    public Task update(@PathVariable Long categoryId, @RequestBody Task updatedTask)
    {
        Category newCategory =  categoryService.getById(categoryId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        updatedTask.setCategory(newCategory);
        updatedTask.setProject(newCategory.getProject());
        service.create(updatedTask);
        return updatedTask;
    }

    /**
     * Accepts a task and specific user id
     * to add particular user the member list of the task
     *  localhost:8080/tasks/1/userId?userId=1
     * @param taskId, userId
     * @throws ResponseStatusException
     * @return updated task
     *
     */

    @PutMapping("/{taskId}/userId")
    public Task update(@PathVariable Long taskId, @RequestParam Long userId)
    {
        Task updatedTask = service.getById(taskId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User newMember = userService.findById(userId);
        if (newMember != null) {
            //TODO: Check if user already a member
            updatedTask.addMember(newMember);
            service.update(updatedTask);
            return updatedTask;
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete member from the task with the given id
     * and return updated task
     * localhost:8080/tasks/1/remove/userId?userId=1
     * @param taskId, userId
     * @throws ResponseStatusException
     * @return updated task
     */
    @PutMapping("{taskId}/remove/userId")
    public Task delete(@PathVariable Long taskId, @RequestParam Long userId){
        Task updatedTask = service.getById(taskId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User membertoBeDeleted = userService.findById(userId);
        if (membertoBeDeleted != null) {
            updatedTask.removeMember(membertoBeDeleted);
            service.update(updatedTask);
            return updatedTask;
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Deletes the task with the given id
     * Example of usage:
     * localhost:8080/tasks/1 - deletes the task with the ID = 1
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

