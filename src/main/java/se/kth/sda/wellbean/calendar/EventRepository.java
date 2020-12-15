package se.kth.sda.wellbean.calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    //List<Event> findByStartGreaterThanEqualAndFinishLessThanEqual(LocalDateTime start, LocalDateTime end);
    List<Event> findAllByUsers_id(Long userId);
    //@Query("select b from Event b where b.start >= ?1 and b.finish <= ?2")
    //List<Event> findByDateBetween(LocalDateTime start, LocalDateTime end);
    List<Event> getEventsByBeanId(Long beanId);
    Event getEventByMeetingId(Long meetingId);
    void deleteAllByMeetingId(Long meetingId);
    void deleteAllByBeanId(Long beanId);
}
