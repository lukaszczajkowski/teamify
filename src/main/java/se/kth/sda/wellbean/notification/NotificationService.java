package se.kth.sda.wellbean.notification;

import com.sun.xml.bind.v2.runtime.output.SAXOutput;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.project.Project;
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
        //TODO: replace hardcoded email address
        mailMessage.setFrom("lukaszczajkowski.wroc@gmail.com");

        String eventTitle = event.getTitle();
        if(eventTitle == null) {
            eventTitle = " an ";
        }
        String eventDescription = event.getDescription();

        if(eventDescription == null) {
            eventDescription = "You have an upcoming event!";
        }
        mailMessage.setSubject("You've been invited to " + eventTitle + " event on WellBean!" );
        String text = eventDescription +  "It starts on " + event.getStart() + ".";;
        mailMessage.setText(text);

        javaMailSender.send(mailMessage);
        System.out.println("Message successfully sent!");
    }

    public void sendNotificationFromProject(Project project, User user) throws MailException{
        System.out.println("Preparing the message...");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setFrom("lukaszczajkowski.wroc@gmail.com");

        String projectTitle = project.getTitle();
        String creatorName = project.getCreator().getName();

        System.out.println("Setting message and subject");

        message.setSubject("You've been invited to a " + projectTitle + " by " + creatorName + " on WellBean!");
        message.setText("Hi "
                        + user.getName() +
                        "!\nYou've been invited to participate in the " + projectTitle + " on WellBean!\n" +
                "In order to join, just click on this link: " + "http://localhost:8080/projects/" + project.getId() +
                "\nTake care and enjoy your wellbeing!" +
                "\nWellBean Team");

        javaMailSender.send(message);
        System.out.println("Message successfully sent!");
    }
}
