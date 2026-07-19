package backend.repository;
import java.util.Optional;
import backend.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    Optional<Alert> findByTitleAndStatus(String title, String status);

    long countByStatus(String status);

    long countBySeverity(String severity);

}