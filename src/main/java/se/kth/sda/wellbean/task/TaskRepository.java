package se.kth.sda.wellbean.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByMembers_id(Long memberId);

    List<Task> findAllByCategoryId(Long categoryId);

    List<Task> findAllByProjectId(Long projectId);
    List<Task> findAllByCategoryIdAndMembers_Id(Long categoryId, Long memberId);
    List<Task> findAllByProjectIdAndMembers_Id (Long projectId, Long memberId);
}