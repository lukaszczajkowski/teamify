package se.kth.sda.wellbean.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.task.Task;
import se.kth.sda.wellbean.task.TaskService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ProjectService projectService;

    /**
     * Returns all comments which is availible for current user
     * Example of usage:
     * localhost:8080/comments - returns all the comments
     *
     * @return List of comments
     */

    //TODO: discuss again. Unable to find situation when we can use this functionality
    @GetMapping("")
    public List<Comment> getAllComments(){
            return commentService.getAll();
    }

    /**
     * Accepts an optional parameter task id and
     * returns all comments in case of no paramter or all Comments related to specific task
     * Example of usage:
     *
     * localhost:8080/comments/taskId?taskId=1 - returns all the comments related to task with id = 1
     * @param taskId
     * @return List of comments
     * @throws ResponseStatusException
     */
    @GetMapping("/taskId")
    public List<Comment> getAllByTaskId(@RequestParam Long taskId) {
        Task currentTask = taskService.getById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (checkCredentials(taskId)) {
            return commentService.getAllByTaskId(taskId);
        }
        else
        {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }


    /**
     * Accepts a comment id and returns a comment that matches the id only
     * if there is no comment with such id it throws a Method
     * not Found exception.
     * Example of usage:
     * localhost:8080/comments/1 - returns the comment with the ID = 1
     * @param commentId
     * @return Comment
     */
    //TODO: discuss again. Unable to find situation when we can use this functionality
    @GetMapping("/{commentId}")
    public Comment getById(@PathVariable Long commentId) {
        return commentService.getById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     Accepts a comment object and id of task to which comment will be added
     * and returns comment after saving.
     *
     * Example of usage:
     * localhost:8080/comments/1
     * @param newComment, taskId
     * @return created Comment
     * @throws ResponseStatusException
     */
    @PostMapping("/{taskId}")
    public Comment create(@RequestBody Comment newComment, @PathVariable Long taskId) {
        Task currentTask = taskService.getById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if(checkCredentials(taskId)) {
            User commentCreator = getCurrentUser();
            newComment.setUser(commentCreator);
            newComment.setTask(currentTask);
            return commentService.create(newComment);
        }
        else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    /**
     Accepts a comment object and id of task to which comment will be updated
     * and returns comment after  update.
     *
     * Example of usage:
     * localhost:8080/comments/1 - updated comment to task with taskId
     * @param updatedComment, taskId
     * @return updated Comment
     * @throws ResponseStatusException
     */

    @PutMapping("/{taskId}")
    public Comment update(@RequestBody Comment updatedComment, @PathVariable Long taskId) {
        Task currentTask = taskService.getById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        // if user has access to current project -> to current task
        if(checkCredentials(taskId)) {
            //if user is a creator of the comment
            if (isCreator(updatedComment)) {
                updatedComment.setUser(getCurrentUser());
                updatedComment.setTask(currentTask);
                return commentService.update(updatedComment);
            }
            else {
                throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    /**
     Delete a comment object and id of task to which comment will be updated
     * and returns comment after  update.
     *
     * Example of usage:
     * localhost:8080/comments/1/1 - Delete comment to task with taskId = 1
     * @param id
     * @return updated Comment
     * @throws ResponseStatusException
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Comment comment = commentService.getById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Long taskId = comment.getTask().getId();

        // if user has access to current project -> to current task
        if(checkCredentials(taskId)) {
            //if user is a creator of the comment
            if (isCreator(comment)) {
                commentService.delete(id);
            } else {
                throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private User getCurrentUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }

    private boolean isCreator(Comment comment) {
       Long currentUserId =  getCurrentUser().getId();
       Comment fullCommentFromDbToCheckUser = commentService.getById(comment.getId())
               .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Long commentAuthorId = fullCommentFromDbToCheckUser.getUser().getId();
        return  currentUserId == commentAuthorId;
    }

    private boolean checkCredentials(Long taskId)
    {
        Task currentTask = taskService.getById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Long currentProjectId = currentTask.getProject().getId();
        if (projectService.getById(currentProjectId).getUsers().contains(getCurrentUser())) {
            return true;
        }
        else {
            return false;
        }
    }


}