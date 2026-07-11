package backend.controller;

import backend.entity.Threat;
import backend.repository.AlertRepository;
import backend.repository.ThreatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class DashboardController {

    @Autowired
    private ThreatRepository threatRepository;

    @Autowired
    private AlertRepository alertRepository;

    // ================= Dashboard Cards =================

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();

        // Threat Statistics
        stats.put("totalThreats", threatRepository.count());
        stats.put("criticalThreats", threatRepository.countBySeverity("Critical"));
        stats.put("openThreats", threatRepository.countByStatus("Open"));
        stats.put("resolvedThreats", threatRepository.countByStatus("Resolved"));

        // Alert Statistics
        stats.put("totalAlerts", alertRepository.count());
        stats.put("criticalAlerts", alertRepository.countBySeverity("Critical"));
        stats.put("openAlerts", alertRepository.countByStatus("Open"));
        stats.put("resolvedAlerts", alertRepository.countByStatus("Resolved"));

        return stats;
    }

    // ================= Threat Distribution =================

    @GetMapping("/chart")
    public List<Map<String, Object>> getChartData() {

        List<Map<String, Object>> chart = new ArrayList<>();

        chart.add(Map.of(
                "severity", "Critical",
                "count", threatRepository.countBySeverity("Critical")
        ));

        chart.add(Map.of(
                "severity", "High",
                "count", threatRepository.countBySeverity("High")
        ));

        chart.add(Map.of(
                "severity", "Medium",
                "count", threatRepository.countBySeverity("Medium")
        ));

        chart.add(Map.of(
                "severity", "Low",
                "count", threatRepository.countBySeverity("Low")
        ));

        return chart;
    }

    // ================= Recent Threats =================

    @GetMapping("/recent-threats")
    public List<Threat> getRecentThreats() {

        return threatRepository.findTop5ByOrderByIdDesc();

    }

}