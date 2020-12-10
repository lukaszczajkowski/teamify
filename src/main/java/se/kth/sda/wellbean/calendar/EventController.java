package se.kth.sda.wellbean.calendar;

import org.eclipse.jetty.client.HttpRequest;
import org.eclipse.jetty.client.api.Request;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.notification.NotificationService;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserRepository;
import se.kth.sda.wellbean.user.UserService;

import javax.websocket.server.PathParam;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventRepository eventRepository;
    private final UserService userService;
    private final AuthService authService;
    private final NotificationService notificationService;
    private final ProjectService projectService;
    private final UserRepository userRepository;

    public EventController(EventRepository eventRepository,
                           UserService userService,
                           AuthService authService,
                           NotificationService notificationService,
                           ProjectService projectService,
                           UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.authService = authService;
        this.notificationService = notificationService;
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public List<Event> events(){
        return eventRepository.findAll();
    }

    @GetMapping("{eventId}")
    public Event eventById(@PathVariable Long eventId){
        return eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
    }

    @GetMapping("/beanEvents/{beanId}")
    public List<Event> eventsByBeanId(@PathVariable Long beanId){
        return eventRepository.getEventsByBeanId(beanId);
    }
    
    @GetMapping("/user")
    public List<Event> getAllUserEvents() {
        User user = getUser();
        return eventRepository.findAllByUsers_id(user.getId());
    }

    /**
     * Creates a new event, sets its creator to the current user, adds that
     * user to the set of members of that event and saves the event in the database
     * @param event
     * @return
     */
    @PostMapping("")
    public Event create(@RequestBody Event event) {
        String creatorEmail = authService.getLoggedInUserEmail();
        User creator = userService.findUserByEmail(creatorEmail);
        event.setCreator(creator);
        event.addMember(creator);
        return eventRepository.save(event);
    }

    @PutMapping("")
    public Event update(@RequestBody Event event) {
        System.out.println("Updating: " + event.getId() + ", " + event.getTitle());
        System.out.println("Created by: " + event.getCreator());
        if(checkCredentials(event)){
            System.out.println("Credentials ok!");
            event.addMember(event.getCreator());
            return eventRepository.save(event);
        } else {
            System.out.println("Credentials not ok.");
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("{eventId}/userEmail")
    public Event inviteUserByEmail(@PathVariable Long eventId, @RequestParam String userEmail) {
        System.out.println("Inviting to: " + eventId);
        System.out.println("Inviting: " + userEmail);
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        if(checkCredentials(event)){
            System.out.println("Checking if user is in the db:" + userEmail);
            User user = userService.findUserByEmail(userEmail);
            if(user == null) {
                throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
            } else {
                event.addMember(user);
                notificationService.sendNotification(user, event);
                return eventRepository.save(event);
            }

        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("{eventId}")
    public void delete(@PathVariable Long eventId) {
        Event eventToDelete = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        System.out.println("Deleting event: " + eventToDelete.getId() + " " + eventToDelete.getTitle());
        if(checkCredentials(eventToDelete)){
            System.out.println("Deleting....");
            eventRepository.delete(eventToDelete);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("/{eventId}/delete/userEmail")
    public Event removeUser(@PathVariable Long eventId, @RequestParam String userEmail) {
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        if(checkCredentials(event)){
            event.removeMember(getUserByEmail(userEmail));
            return eventRepository.save(event);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    private boolean checkCredentials(Event event) {
        String creatorEmail = event.getCreator().getEmail();
        String currentUserEmail = authService.getLoggedInUserEmail();
        return creatorEmail.equals(currentUserEmail);
    }

    private User getUserByEmail(String email) {
        return userService.findUserByEmail(email);
    }

    private User getUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }

    private LocalDateTime parseDate(String dateString) {
        Date date = null;
        SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-ddHH:MM");

        try {
            date = inputDateFormat.parse(dateString);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad date: " + date);
        }

        LocalDateTime localDate = LocalDateTime.ofInstant(date.toInstant(),
                ZoneId.systemDefault());

        return localDate;
    }
}
