package se.kth.sda.wellbean.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByUsers_id(Long userId);
    List<Project> findAllByCreatorId(Long creatorId);
    Project findByTasks_id(Long taskId);
}
