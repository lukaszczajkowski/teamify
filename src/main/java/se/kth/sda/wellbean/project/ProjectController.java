package se.kth.sda.wellbean.project;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.notification.NotificationService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthService authService;
    private final UserService userService;
    private final NotificationService notificationService;
    private final Flux<ProjectChanged> events;
    private final ProjectChangedEventProcessor projectChangedEventProcessor;
    private final ProjectMapper mapper;

    public ProjectController(ProjectService projectService,
                             AuthService authService,
                             UserService userService,
                             NotificationService notificationService,
                             ProjectChangedEventProcessor projectChangedEventProcessor,
                             ProjectMapper mapper) {
        this.projectService = projectService;
        this.authService = authService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.projectChangedEventProcessor = projectChangedEventProcessor;
        this.mapper = mapper;
        this.events = Flux.create(projectChangedEventProcessor).share();
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
     * localhost:8080/projects/1 - returns the project with the ID = 1
     * @param projectId
     * @return
     * @throws ResponseStatusException
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
     * localhost:8080/projects/userId?userId=1 - returns the list of projects with the member ID = 1
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
     * localhost:8080/projects/creatorId?creatorId=1 - returns the list of projects with a creator ID = 1
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
     * Example of usage:
     * localhost:8080/projects + project in the request body
     * @param project
     * @return created Project
     */
    @PostMapping("")
    public Project create(@RequestBody Project project) {
        project.setUsers(new HashSet<>());
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
     * Example of usage:
     * localhost:8080/projects + updated project in the request body
     * @param updatedProject
     * @return Project
     * @throws ResponseStatusException
     */
    @PutMapping("")
    public Project update(@RequestBody Project updatedProject) {
        String currentUserEmail = authService.getLoggedInUserEmail();
        User currentUser = userService.findUserByEmail(currentUserEmail);
        User creator = projectService.getById(updatedProject.getId()).getCreator();
        Project prjFromDb = projectService.getById(updatedProject.getId());
        if(currentUser.getId() != creator.getId()) {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        } else {
            //need to update all the fields ManyToMany and ManyToOne, otherwise it will be 0
            updatedProject.setCreator(creator);
            updatedProject.setUsers(prjFromDb.getUsers());
            updatedProject.setTeamBeanScore(prjFromDb.getTeamBeanScore());
            return projectService.update(updatedProject);
        }
    }

    //TODO: send a notification to the user

    /**
     * Updates the list of users assigned to the project with the given id with a new member
     * only to the user who created the project
     * Example of usage:
     * localhost:8080/projects/1/userId?userId=1 - updates the project with the ID = 1
     * by adding the user with the ID = 1 to the list of members
     * @param userId
     * @return project
     * @throws ResponseStatusException
     */
    @PutMapping("/{projectId}/userId")
    public Project inviteUser(@PathVariable Long projectId, @RequestParam Long userId) {
        Project project = projectService.getById(projectId);
        if(checkCredentials(project)){
            User newMember = userService.findById(userId);
            project.addMember(newMember);
            notificationService.sendNotificationFromProject(project, newMember);
            return projectService.update(project);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    /**
     * Updates the list of users assigned to the project with the given id with a new member
     * only to the user who created the project
     * Example of usage:
     * localhost:8080/projects/1/userEmail?userEmail=test@test.com - updates the project with the
     * email test@test.com
     * by adding the user with the ID = 1 to the list of members
     * @param userEmail
     * @return project
     * @throws ResponseStatusException
     */
    @PutMapping("/{projectId}/userEmail")
    public Project inviteUserEmail(@PathVariable Long projectId, @RequestParam String userEmail) {
        Project project = projectService.getById(projectId);
        if(checkCredentials(project)){
            User newMember = userService.findUserByEmail(userEmail);
            project.addMember(newMember);
            notificationService.sendNotificationFromProject(project, newMember);
            return projectService.update(project);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    /**
     * Deletes the project with the given id - allowed only for users
     * who created the project
     * Example of usage:
     * localhost:8080/1 - deletes the project with the ID = 1
     * @param id
     * @throws ResponseStatusException
     */
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        Project project = projectService.getById(id);
        if(checkCredentials(project)){
            projectService.delete(id);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    /**
     * accepts a projectId as a path variable and memberId as a RequestParam
     * and removes the user identified by memberId from the list of members -
     * the operation is only allowed if the user is a creator of the project
     * @param projectId
     * @param memberId
     * @return Project updated project
     * @throws ResponseStatusException
     */
    @PutMapping("{projectId}/remove/memberId")
    public Project removeMember(@PathVariable Long projectId, @RequestParam Long memberId) {
        Project project = projectService.getById(projectId);
        User userToRemove = userService.findById(memberId);
        if(checkCredentials(project) && userAlreadyAMember(project, userToRemove)){
            project.removeUser(userToRemove);
            return projectService.update(project);
        } else if (!userAlreadyAMember(project, userToRemove)){
            return project;
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private boolean checkCredentials(Project project) {
        String projectCreatorEmail = project.getCreator().getEmail();
        String editorEmail = authService.getLoggedInUserEmail();
        return projectCreatorEmail.equals(editorEmail);
    }

    private boolean userAlreadyAMember(Project project, User user) {
        Set<User> members = project.getUsers();
        return members.contains(user);
    }

}
