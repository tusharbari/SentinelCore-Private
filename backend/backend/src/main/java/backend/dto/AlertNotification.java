package backend.dto;

import java.time.LocalDateTime;

public class AlertNotification {

    private Long id;
    private String title;
    private String severity;
    private String status;
    private LocalDateTime time;

    public AlertNotification() {
    }

    public AlertNotification(Long id,
                             String title,
                             String severity,
                             String status,
                             LocalDateTime time) {

        this.id = id;
        this.title = title;
        this.severity = severity;
        this.status = status;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}