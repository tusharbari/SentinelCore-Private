package backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String severity;

    private String source;

    private String status;

    @Column(length = 1000)
    private String description;

    @Column(name = "occurrence_count")
    private Integer occurrenceCount = 1;

    @Column(name = "last_occurred")
    private LocalDateTime lastOccurred;

    public Alert() {
    }

    public Alert(Long id, String title, String severity,
                 String source, String status,
                 String description,
                 Integer occurrenceCount,
                 LocalDateTime lastOccurred) {

        this.id = id;
        this.title = title;
        this.severity = severity;
        this.source = source;
        this.status = status;
        this.description = description;
        this.occurrenceCount = occurrenceCount;
        this.lastOccurred = lastOccurred;
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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOccurrenceCount() {
        return occurrenceCount;
    }

    public void setOccurrenceCount(Integer occurrenceCount) {
        this.occurrenceCount = occurrenceCount;
    }

    public LocalDateTime getLastOccurred() {
        return lastOccurred;
    }

    public void setLastOccurred(LocalDateTime lastOccurred) {
        this.lastOccurred = lastOccurred;
    }
}