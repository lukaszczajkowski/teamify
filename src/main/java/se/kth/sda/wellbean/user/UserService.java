package se.kth.sda.wellbean.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.project.ProjectService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service()
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private ProjectService projectService;


    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void register(User user) {
        String encryptedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPass);
        userRepository.save(user);
    }

    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
    }

    public List<UserSummary> getAllExceptLoggedIn(User currentUser, Long projectId) {
         List<User> allUsersExceptLoggedIn =  userRepository.findAll()
                .stream()
                .filter(user -> !currentUser.getId().equals(user.getId())).collect(Collectors.toList());

         Project project = projectService.getById(projectId);

         List<User> usersInProject = allUsersExceptLoggedIn
                                .stream()
                                .filter(user -> project.getUsers().contains(user)).collect(Collectors.toList());

         return (List<UserSummary>) usersInProject.stream().map(this::convertTo);
    }

    private UserSummary convertTo(User user) {
        UserSummary userSummary = new UserSummary();
        userSummary.setId(user.getId());
        userSummary.setEmail(user.getEmail());
        userSummary.setName(user.getName());
        return userSummary;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
