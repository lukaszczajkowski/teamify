package se.kth.sda.wellbean.bean;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.kth.sda.wellbean.category.Category;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BeanRepository extends JpaRepository<Bean, Long> {
    List<Bean> getAllByCreatedDateAndUserId(LocalDate startOfDay, long userId);
}
