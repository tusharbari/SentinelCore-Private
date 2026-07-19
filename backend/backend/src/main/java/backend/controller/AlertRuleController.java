package backend.controller;

import backend.entity.AlertRule;
import backend.service.AlertRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alert-rules")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertRuleController {

    @Autowired
    private AlertRuleService alertRuleService;

    // Get all rules
    @GetMapping
    public List<AlertRule> getAllRules() {
        return alertRuleService.getAllRules();
    }

    // Get rule by ID
    @GetMapping("/{id}")
    public Optional<AlertRule> getRuleById(@PathVariable Long id) {
        return alertRuleService.getRuleById(id);
    }

    // Create rule
    @PostMapping
    public AlertRule createRule(@RequestBody AlertRule alertRule) {
        return alertRuleService.createRule(alertRule);
    }

    // Update rule
    @PutMapping("/{id}")
    public AlertRule updateRule(@PathVariable Long id,
                                @RequestBody AlertRule alertRule) {
        return alertRuleService.updateRule(id, alertRule);
    }

    // Delete rule
    @DeleteMapping("/{id}")
    public void deleteRule(@PathVariable Long id) {
        alertRuleService.deleteRule(id);
    }
}