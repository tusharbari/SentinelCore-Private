package backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "alert_rules")
public class AlertRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String eventType;

    @Column(nullable = false)
    private String conditionType;

    @Column(nullable = false)
    private Integer threshold;

    @Column(nullable = false)
    private String severity;

    private Boolean enabled = true;

    public AlertRule() {
    }

    public AlertRule(Long id, String name, String description, String eventType,
                     String conditionType, Integer threshold,
                     String severity, Boolean enabled) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.eventType = eventType;
        this.conditionType = conditionType;
        this.threshold = threshold;
        this.severity = severity;
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public Integer getThreshold() {
        return threshold;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}