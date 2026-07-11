package backend.repository;

import backend.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    long countByStatus(String status);

    long countBySeverity(String severity);

}