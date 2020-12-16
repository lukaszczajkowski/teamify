package se.kth.sda.wellbean.bean;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BeanRepository extends JpaRepository<Bean, Long> {
    List<Bean> getAllByCreatedDateAndUserId(LocalDate startOfDay, long userId);
    List<Bean> getAllByUserId( long userId);
}
