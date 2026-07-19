package backend.service;

import backend.entity.Notification;
import backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification saveNotification(String title,
                                         String severity,
                                         String message) {

        Notification notification = new Notification(
                title,
                severity,
                message,
                false,
                LocalDateTime.now()
        );

        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findByReadStatusFalseOrderByCreatedAtDesc();
    }

    public Notification markAsRead(Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setReadStatus(true);

        return notificationRepository.save(notification);
    }

    public void markAllAsRead() {

        List<Notification> notifications =
                notificationRepository.findByReadStatusFalseOrderByCreatedAtDesc();

        notifications.forEach(n -> n.setReadStatus(true));

        notificationRepository.saveAll(notifications);
    }

    public void clearAll() {
        notificationRepository.deleteAll();
    }
}