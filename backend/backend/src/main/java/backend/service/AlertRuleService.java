package backend.service;

import backend.entity.AlertRule;
import backend.repository.AlertRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlertRuleService {

    @Autowired
    private AlertRuleRepository alertRuleRepository;

    // Get all rules
    public List<AlertRule> getAllRules() {
        return alertRuleRepository.findAll();
    }

    // Get rule by ID
    public Optional<AlertRule> getRuleById(Long id) {
        return alertRuleRepository.findById(id);
    }

    // Create new rule
    public AlertRule createRule(AlertRule alertRule) {
        return alertRuleRepository.save(alertRule);
    }

    // Update existing rule
    public AlertRule updateRule(Long id, AlertRule updatedRule) {
        AlertRule existingRule = alertRuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert Rule not found"));

        existingRule.setName(updatedRule.getName());
        existingRule.setDescription(updatedRule.getDescription());
        existingRule.setEventType(updatedRule.getEventType());
        existingRule.setConditionType(updatedRule.getConditionType());
        existingRule.setThreshold(updatedRule.getThreshold());
        existingRule.setSeverity(updatedRule.getSeverity());
        existingRule.setEnabled(updatedRule.getEnabled());

        return alertRuleRepository.save(existingRule);
    }

    // Delete rule
    public void deleteRule(Long id) {
        alertRuleRepository.deleteById(id);
    }
}