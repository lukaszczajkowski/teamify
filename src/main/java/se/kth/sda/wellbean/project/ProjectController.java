package se.kth.sda.wellbean.project;

import org.springframework.web.bind.annotation.*;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/project")
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
     * Accepts a project id and returns a project that matches the id
     * @param projectId
     * @return
     */
    @GetMapping("/{projectId}")
    public Project getProjectById(@PathVariable Long projectId) {
        return projectService.getById(projectId);
    }

    /**
     * Accepts an user id and returns a list of projects that matches the user id
     * @param userId
     * @return List of projects
     */
    @GetMapping("/userId")
    public List<Project> getProjectsByUserId(@RequestParam Long userId) {
        return projectService.getProjectsByUserId(userId);
    }

    /**
     * Accepts a creator id and returns a list of projects that matched the creator id
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
        project.setCreatorId(creator.getId());
        project.addMember(creator);
        return projectService.create(project);
    }
}
