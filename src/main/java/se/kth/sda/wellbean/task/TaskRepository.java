package se.kth.sda.wellbean.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.kth.sda.wellbean.category.Category;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByMembers_id(Long memberId);

    List<Task> findAllByCategories_id(Long categoryId);

    List<Task> findAllByProjectId(Long projectId);

    List<Task> findAllByCreatorId(Long creatorId);
}