package se.kth.sda.wellbean.project;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.user.User;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    public Project getById(Long id) {
        return projectRepository.findById(id).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
    }

    public List<Project> getProjectsByUserId(Long userId) {
        return projectRepository.findAllByUsers_id(userId);
    }

    public List<Project> getProjectsByCreatorId(long creatorId) {
        return projectRepository.findAllByCreatorId(creatorId);
    }

    public Project create(Project project) {
        return projectRepository.save(project);
    }

    public Project update(Project updatedProject) {
        return projectRepository.save(updatedProject);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    public void increaseTeamBeanScore(User user) {
        List<Project> projectsList= getProjectsByUserId(user.getId());
        for (Project project: projectsList) {
            long currentTeamBeanScore= project.getTeamBeanScore();
            long newTeamBeanScore=currentTeamBeanScore+1;
            project.setTeamBeanScore(newTeamBeanScore);
        }
    }

}
