package backend.service;

import backend.dto.AlertNotification;
import backend.entity.Alert;
import backend.entity.Notification;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class AlertNotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    public AlertNotificationService(
            SimpMessagingTemplate messagingTemplate,
            NotificationService notificationService
    ) {
        this.messagingTemplate = messagingTemplate;
        this.notificationService = notificationService;
    }

    public void sendNotification(Alert alert) {

        // Save notification to database
        Notification notification = notificationService.saveNotification(
                alert.getTitle(),
                alert.getSeverity(),
                "New alert generated: " + alert.getTitle()
        );

        // Send notification to frontend
        AlertNotification alertNotification = new AlertNotification(
                notification.getId(),
                notification.getTitle(),
                notification.getSeverity(),
                alert.getStatus(),
                notification.getCreatedAt()
        );

        messagingTemplate.convertAndSend(
                "/topic/alerts",
                alertNotification
        );
    }
}