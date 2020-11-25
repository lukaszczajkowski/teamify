package se.kth.sda.wellbean.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
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

    /**
     * Accepts an optional parameter task id and
     * returns all comments in case of no paramter or all Comments related to specific task
     * Example of usage:
     * localhost:8080/comments - returns all the comments
     * localhost:8080/comments?taskId=1 - returns all the comments related to task with id = 1
     *
     * @param taskId (optional)
     * @return List of comments
     */
    @GetMapping("")
    public List<Comment> getAll(@RequestParam(required = false) Long taskId) {
        if (taskId == null) {
            return commentService.getAll();
        } else {
            return commentService.getAllByTaskId(taskId);
        }
    }

    /**
     * Accepts a comment id and returns a comment that matches the id only
     * if there is no comment withsuch id it throws a Method
     * not Found exception.
     * Example of usage:
     * localhost:8080/comments/1 - returns the comment with the ID = 1
     *
     * @param commentId
     * @return Comment
     */
    @GetMapping("/{id}")
    public Comment getById(@PathVariable Long commentId) {
        return commentService.getById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("")
    public Comment create(@RequestBody Comment newComment) {
        newComment.setUser(getCurrentUser());
        return commentService.create(newComment);
    }

    @PutMapping("")
    public Comment update(@RequestBody Comment updatedComment) {
        if (isCreator(updatedComment)) {
            return commentService.update(updatedComment);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Comment comment = commentService.getById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (isCreator(comment)) {
            commentService.delete(id);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private User getCurrentUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }

    private boolean isCreator(Comment comment) {
        return getCurrentUser() == comment.getUser();
    }
}