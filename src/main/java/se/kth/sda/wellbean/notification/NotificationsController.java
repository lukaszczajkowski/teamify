package se.kth.sda.wellbean.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.kth.sda.wellbean.user.User;

@RestController
@RequestMapping("/notifications")
public class NotificationsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationsController.class);

    private final NotificationService notificationService;

    public NotificationsController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send")
    public String sendNotification() {
        System.out.println("Are we here?");
        User user = new User();
        user.setEmail("lukasz_czajkowski@gazeta.pl");
        user.setName("Lukasz Czajkowski");

        try {
            notificationService.sendNotification(user, null);
        } catch (MailException e) {
            LOGGER.info("Error sending email: " + e.getMessage());
        }
        return "here you go!";
    }

}
