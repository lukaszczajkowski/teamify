package se.kth.sda.wellbean.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.kth.sda.wellbean.auth.AuthService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private  final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    /**
     * Returns every user in the project
     * @return
     */
    @GetMapping("/summaries/{projectId}")
    public List<UserSummary> getUsersSummaries(@PathVariable Long projectId){
        String email = authService.getLoggedInUserEmail();
        User currentUser = userService.findUserByEmail(email);
        return userService.getAllExceptLoggedIn(currentUser, projectId);
    }

    @GetMapping("/current")
    public User getCurrentUser() {
        String email = authService.getLoggedInUserEmail();
        return userService.findUserByEmail(email);
    }
}
