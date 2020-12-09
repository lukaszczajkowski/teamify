package se.kth.sda.wellbean.bean;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BeansPreSetRepository extends JpaRepository<BeansPreSet, Long> {
    BeansPreSet getByTitle(String title);

    Optional<Object> findById(Optional<Long> id);
}
