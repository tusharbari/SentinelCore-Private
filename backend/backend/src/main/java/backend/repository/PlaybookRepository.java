package backend.repository;

import backend.entity.PlaybookExecution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaybookRepository extends JpaRepository<PlaybookExecution,Long> {

    Optional<PlaybookExecution> findByIncidentId(Long incidentId);

}
