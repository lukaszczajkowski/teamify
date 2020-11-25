package se.kth.sda.wellbean.notification;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.user.User;

@Service
public class NotificationService {

    private final JavaMailSender javaMailSender;

    public NotificationService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(User user, Event event) throws MailException {
        //send email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setFrom("lukaszczajkowski.wroc@gmail.com");

        String eventTitle = event.getTitle();
        String eventDescription = event.getDescription();
        mailMessage.setSubject("You've been invited to " + eventTitle + " event on WellBean!" );
        String text = eventDescription;
        mailMessage.setText(text);

        javaMailSender.send(mailMessage);
    }

}
