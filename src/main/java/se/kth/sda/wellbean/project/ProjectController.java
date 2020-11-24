package se.kth.sda.wellbean.project;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthService authService;
    private final UserService userService;

    public ProjectController(ProjectService projectService,
                             AuthService authService,
                             UserService userService) {
        this.projectService = projectService;
        this.authService = authService;
        this.userService = userService;
    }

    /**
     * Returns all projects
     * @return List of all projects
     */
    @GetMapping("")
    public List<Project> getAllProjects() {
        return projectService.getAll();
    }

    /**
     * Accepts a project id and returns a project that matches the id only
     * if the user is on inside the set of members, otherwise it throws a Method
     * not Allowed exception.
     * Example of usage:
     * localhost:8080/1 - returns the project with the ID = 1
     * @param projectId
     * @return
     */
    @GetMapping("/{projectId}")
    public Project getProjectById(@PathVariable Long projectId) {
        Project project = projectService.getById(projectId);
        Set<User> members = project.getUsers();
        String currentUser = authService.getLoggedInUserEmail();
        User user = userService.findUserByEmail(currentUser);
        if(members.contains(user)){
            return projectService.getById(projectId);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }

    }

    /**
     * Accepts an user id and returns a list of projects that matches the user id
     * Example of usage:
     * localhost:8080/1 - returns the list of projects with the member ID = 1
     * @param userId
     * @return List of projects
     */
    @GetMapping("/userId")
    public List<Project> getProjectsByUserId(@RequestParam Long userId) {
        return projectService.getProjectsByUserId(userId);
    }

    /**
     * Accepts a creator id and returns a list of projects that matched the creator id
     * Example of usage:
     * localhost:8080/creatorId=1 - returns the list of projects with a creator ID = 1
     * @param creatorId
     * @return List of projects
     */
    @GetMapping("/creatorId")
    public List<Project> getProjectsByCreator(@RequestParam Long creatorId) {
        return projectService.getProjectsByCreatorId(creatorId);
    }

    /**
     * Accepts a project object as a parameter and returns it after saving.
     * It sets the user creator as the currently logged in user and adds the creator
     * to the list of the project's members.
     * @param project
     * @return created Project
     */
    @PostMapping("")
    public Project create(@RequestBody Project project) {
        String creatorEmail = authService.getLoggedInUserEmail();
        User creator = userService.findUserByEmail(creatorEmail);
        project.setCreator(creator);
        project.addMember(creator);
        return projectService.create(project);
    }

    /**
     * Accepts an updated project, checks if the user is the creator of the project.
     * If the user is not the creator, a Method not Allowed exception is thrown.
     * If the user is the creator, it updates and returns the updated project
     *
     * @param updatedProject
     * @return Project
     */
    @PutMapping("")
    public Project update(@RequestBody Project updatedProject) {
        String currentUserEmail = authService.getLoggedInUserEmail();
        User currentUser = userService.findUserByEmail(currentUserEmail);
        User creator = updatedProject.getCreator();

        if(currentUser.getId() != creator.getId()) {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        } else {
            return projectService.update(updatedProject);
        }
    }

    //TODO: send a notification to the user

    /**
     * Updates the list of users assigned to the project with the given id by a new member
     * only to the user who created the project
     * Example of usage:
     * localhost:8080/1/userId?userId=1 - updates the project with the ID = 1
     * by adding the user with the ID = 1 to the list of members
     * @param userId
     * @return project
     */
    @PutMapping("/{projectId}/userId")
    public Project inviteUser(@PathVariable Long projectId, @RequestParam Long userId) {
        Project project = projectService.getById(projectId);
        User newMember = userService.findById(userId);
        project.addMember(newMember);
        return projectService.update(project);
    }
}
