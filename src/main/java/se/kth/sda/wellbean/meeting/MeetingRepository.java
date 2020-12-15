package se.kth.sda.wellbean.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.kth.sda.wellbean.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> getAllByHostIdAndStartTimeIsAfter(Long userId, LocalDateTime currentTime);
    Meeting getById(Long id);
   // List<Meeting> findAllByUsers_idAndStartTimeIsAfter(Long userId, LocalDateTime currentTime);
}
