package se.kth.sda.wellbean.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.project.ProjectService;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private  final AuthService authService;
    private final ProjectService projectService;

    public UserController(UserService userService, AuthService authService,
                          ProjectService projectService) {
        this.userService = userService;
        this.authService = authService;
        this.projectService = projectService;
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

    @GetMapping("/from-shared-projects")
    public List<User> getUsersFromSharedProjects() {
        User user = getCurrentUser();
        List<Project> projects = projectService.getProjectsByUserId(user.getId());
        projects.forEach(p -> System.out.println("Project: " + p.getId()));
        Map<Project, List<User>> getUsersByProjects = getUsersByProjects(projects);
        getUsersByProjects.forEach((k, v) -> {
            System.out.println("Project: " + k);
            System.out.println("Emails:");
            v.forEach(u -> System.out.println(u.getEmail()));
        });
        return setOfUsersFromMap(getUsersByProjects);
    }

    private Map<Project, List<User>> getUsersByProjects(List<Project> projects) {
        Map<Project, List<User>> usersFromSharedProjects = new HashMap<>();
        for (Project project:
                projects) {
            if(usersFromSharedProjects.containsKey(project)) {
                for(User u : project.getUsers()){
                    if(!usersFromSharedProjects.get(project).contains(u)){
                        usersFromSharedProjects.get(project).add(u);
                        System.out.println("Adding user: " + u.getEmail());
                    }
                }
            } else {
                List<User> users = new ArrayList<>();
                for(User u : project.getUsers()) {
                    if (!users.contains(u)) {
                        users.add(u);
                    }
                }
                usersFromSharedProjects.put(project, users);
            }
        }
        return usersFromSharedProjects;
    }

    private List<User> setOfUsersFromMap(Map<Project, List<User>> usersByProject) {
        List<User> usersFromSharedProjects = new ArrayList<>();
        usersByProject.forEach((project, list) -> {
            list.forEach(user -> {
                if(!usersFromSharedProjects.contains(user)){
                    usersFromSharedProjects.add(user);
                }
            });
        });
        return usersFromSharedProjects;
    }
}
