package se.kth.sda.wellbean.project;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;

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
}
