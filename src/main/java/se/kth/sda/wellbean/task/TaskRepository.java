package se.kth.sda.wellbean.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    //try: findAllByMembers_id(Long memberId) :) - Lukasz
    /*
    This is because your Task entity has a field variable called private List<User> members,
    so there is a naming convention for this kind of methods:
    findAllByFieldVariableName_id(Long thisFieldInSingleFormId)
     */
    //List<Task> findAllByMemberId(Long userId);
}