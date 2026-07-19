package backend.dto;

public class SecurityEvent {

    private String eventType;

    private Integer value;

    private String source;

    private String description;

    public SecurityEvent() {
    }

    public SecurityEvent(String eventType,
                         Integer value,
                         String source,
                         String description) {
        this.eventType = eventType;
        this.value = value;
        this.source = source;
        this.description = description;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}