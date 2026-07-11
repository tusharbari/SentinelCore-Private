package backend.service;

import backend.entity.Alert;
import backend.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    // Get All Alerts
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    // Get Alert By ID
    public Alert getAlertById(Long id) {
        return alertRepository.findById(id).orElse(null);
    }

    // Add Alert
    public Alert addAlert(Alert alert) {
        return alertRepository.save(alert);
    }

    // Update Alert
    public Alert updateAlert(Long id, Alert updatedAlert) {

        Alert alert = alertRepository.findById(id).orElse(null);

        if (alert != null) {

            alert.setTitle(updatedAlert.getTitle());
            alert.setSeverity(updatedAlert.getSeverity());
            alert.setSource(updatedAlert.getSource());
            alert.setStatus(updatedAlert.getStatus());
            alert.setDescription(updatedAlert.getDescription());

            return alertRepository.save(alert);
        }

        return null;
    }

    // Delete Alert
    public void deleteAlert(Long id) {
        alertRepository.deleteById(id);
    }
}