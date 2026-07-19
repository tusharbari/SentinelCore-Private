package backend.repository;

import backend.entity.AlertRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRuleRepository extends JpaRepository<AlertRule, Long> {

    List<AlertRule> findByEnabled(Boolean enabled);

    List<AlertRule> findBySeverity(String severity);

    List<AlertRule> findByEventType(String eventType);
}