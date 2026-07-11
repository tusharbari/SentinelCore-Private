package backend.repository;

import backend.entity.IOC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOCRepository extends JpaRepository<IOC, Long> {

    List<IOC> findByTypeContainingIgnoreCase(String type);

    List<IOC> findByRiskLevel(String riskLevel);

}