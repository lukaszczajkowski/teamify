package se.kth.sda.wellbean.calendar;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.notification.Notification;
import se.kth.sda.wellbean.notification.NotificationService;
import se.kth.sda.wellbean.project.Project;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserRepository;
import se.kth.sda.wellbean.user.UserService;

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

    public EventController(EventRepository eventRepository,
                           UserService userService,
                           AuthService authService,
                           NotificationService notificationService,
                           ProjectService projectService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.authService = authService;
        this.notificationService = notificationService;
        this.projectService = projectService;
    }

    @GetMapping("")
    public List<Event> events(){
        return eventRepository.findAll();
    }

    /**
     * Returns the events of the given user identified by userId within a given range of time
     * /events/1/range?start=2020-12-02&end=2020-12-03
     * @param userId
     * @param start
     * @param end
     * @return
     * @throws BadDateFormatException
     */
    @GetMapping("{userId}/user/range")
    public List<Event> getEventsInRange(@PathVariable Long userId,
                                        @RequestParam(value = "start", required = true) String start,
                                        @RequestParam(value = "end", required = true) String end) throws BadDateFormatException {
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-dd");

        try {
            startDate = inputDateFormat.parse(start);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad start date: " + start);
        }

        try {
            endDate = inputDateFormat.parse(end);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad end date: " + end);
        }

        LocalDateTime startDateTime = LocalDateTime.ofInstant(startDate.toInstant(),
                ZoneId.systemDefault());

        LocalDateTime endDateTime = LocalDateTime.ofInstant(endDate.toInstant(),
                ZoneId.systemDefault());

        User user = userService.findById(userId);

        List<Event> eventsInTimeScope = eventRepository.findByDateBetween(startDateTime, endDateTime);

        List<Event> userEventsInTimeScope = new ArrayList<>();
        for(Event event : eventsInTimeScope) {
            if(event.getUsers().contains(user)){
                userEventsInTimeScope.add(event);
            }
        }

        return userEventsInTimeScope;
    }

    @GetMapping("{projectId}/project/range")
    public List<Event> getEventsByProjectInRange(@PathVariable Long projectId,
                                        @RequestParam(value = "start", required = true) String start,
                                        @RequestParam(value = "end", required = true) String end) throws BadDateFormatException {
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-ddHH:MM");

        try {
            startDate = inputDateFormat.parse(start);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad start date: " + start);
        }

        try {
            endDate = inputDateFormat.parse(end);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad end date: " + end);
        }

        LocalDateTime startDateTime = LocalDateTime.ofInstant(startDate.toInstant(),
                ZoneId.systemDefault());

        LocalDateTime endDateTime = LocalDateTime.ofInstant(endDate.toInstant(),
                ZoneId.systemDefault());

        Project project = projectService.getById(projectId);

        List<Event> eventsInTimeScope = eventRepository.findByDateBetween(startDateTime, endDateTime);

        List<Event> userEventsInTimeScope = new ArrayList<>();
        for(Event event : eventsInTimeScope) {
            if(event.getUsers().contains(project)){
                userEventsInTimeScope.add(event);
            }
        }

        return userEventsInTimeScope;
    }
    /**
     * Createas a new event, sets its creator to the current user, adds that
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
        if(checkCredentials(event)){
            return eventRepository.save(event);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("/{eventId}/userEmail")
    public Event inviteUserByEmail(@PathVariable Long eventId, @RequestParam String userEmail) {
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        if(checkCredentials(event)){
            User user = userService.findUserByEmail(userEmail);
            event.addMember(user);
            notificationService.sendNotification(user, event);
            return eventRepository.save(event);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("/{eventId}/change-start/start")
    public Event changeStartingDate(@PathVariable Long eventId,
                                    @RequestParam LocalDateTime start) {
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        if(event.getFinish().compareTo(start) >= 0){
            event.setStart(start);
            return eventRepository.save(event);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("/{eventId}/change-finish/finish")
    public Event changeFinishDate(@PathVariable Long eventId,
                                  @RequestParam LocalDateTime finish) {
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        if(event.getStart().compareTo(finish) <= 0){
            event.setStart(finish);
            return eventRepository.save(event);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("")
    public void delete(Event event) {
        if(checkCredentials(event)){
            eventRepository.delete(event);
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
}
