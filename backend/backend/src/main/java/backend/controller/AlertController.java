package backend.controller;

import backend.entity.Alert;
import backend.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class AlertController {

    @Autowired
    private AlertService alertService;

    // Get All Alerts
    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    // Get Alert By ID
    @GetMapping("/{id}")
    public Alert getAlertById(@PathVariable Long id) {
        return alertService.getAlertById(id);
    }

    // Add Alert
    @PostMapping
    public Alert addAlert(@RequestBody Alert alert) {
        return alertService.addAlert(alert);
    }

    // Update Alert
    @PutMapping("/{id}")
    public Alert updateAlert(@PathVariable Long id,
                             @RequestBody Alert alert) {
        return alertService.updateAlert(id, alert);
    }

    // Delete Alert
    @DeleteMapping("/{id}")
    public void deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
    }
}