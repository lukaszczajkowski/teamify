package se.kth.sda.wellbean.bean;


import org.springframework.web.bind.annotation.*;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.calendar.EventService;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/beans")
public class BeanController {
    private final BeanService beanService;
    private final UserService userService;
    private final AuthService authService;
    private final EventService eventService;
    private  final ProjectService projectService;


    public  BeanController ( BeanService beanService,
                             UserService userService,
                             AuthService authService,
                             EventService eventService,
                             ProjectService projectService) {
        this.beanService = beanService;
        this.userService = userService;
        this.authService = authService;
        this.eventService = eventService;
        this.projectService = projectService;
    }


    @GetMapping("/preset")
    public List<BeansPreSet>  getBeansPreSet() {
        return beanService.getBeansPreSet();
    }

    @GetMapping("")
    public List<Bean> getAllBeansByUserId() {
        User user = getUser();
        return beanService.findAllByUserId(user.getId());
    }
    @GetMapping("/{beanId}")
    public Optional<Bean> getBeanByBeanId(@PathVariable Long beanId) {
        return beanService.findByBeanId(beanId);
    }

    @PostMapping("")
    public Bean createBean(@RequestBody BeansPreSet customBeanDetails) {
        Bean newBean = new Bean();
        User user = getUser();
        newBean.setUser(user);
        newBean.setTitle(customBeanDetails.getTitle());
        newBean.setDescription(customBeanDetails.getDescription());
        newBean.setCreatedDate(LocalDate.now());
        newBean = beanService.createNewBean(newBean);
        createBeanEvents(newBean,customBeanDetails);
        return newBean;
    }

    @PutMapping("")
    public Bean updateBean(@RequestBody Bean updatedBean) {
        User user = getUser();
        if(updatedBean.isCompleted() == true)
        {
            Bean currentBeanDetails = beanService.findByBeanId(updatedBean.getId()).orElseThrow();
            updatedBean.setTitle(currentBeanDetails.getTitle());
            updatedBean.setDescription(currentBeanDetails.getDescription());
            userService.increaseBeanScore(user);
            projectService.increaseTeamBeanScore(user);
        }
        List<Event> beanEvents = eventService.getEventsByBeanId(updatedBean.getId());
        for (Event event: beanEvents) {
            event.setTitle(updatedBean.getTitle());
            event.setDescription(updatedBean.getDescription());
            eventService.update(event);
        }
        updatedBean.setUser(user);
        return beanService.updateBean(updatedBean);
    }
    @DeleteMapping("{id}")
    public void deleteBean(@PathVariable long id) {
         beanService.deleteBean(id);
    }


    private User getUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }

    private void createBeanEvents(Bean bean,BeansPreSet beanEventDetails) {
        LocalDateTime eventStartTime;
        String creatorEmail = authService.getLoggedInUserEmail();
        User creator = userService.findUserByEmail(creatorEmail);
        long eventCount = beanEventDetails.getEventCount();
        long eventDuration = beanEventDetails.getDuration();
        switch (beanEventDetails.getTitle()) {
            case "Keep hydrated" :
                eventStartTime  = LocalDate.now().atTime(8,0,0);
                for(int i = 0; i < beanEventDetails.getEventCount(); i++) {
                    createEvent(eventStartTime,eventDuration,bean,creator);
                    eventStartTime = eventStartTime.plusMinutes((10*60)/eventCount);
                }
                break;
            case "Meditation" :
                eventStartTime  = LocalDate.now().atTime(10,00,0);
                createEvent(eventStartTime,eventDuration,bean,creator);
                break;
            case "Exercise" :
                eventStartTime  = LocalDate.now().atTime(15,00,0);
                createEvent(eventStartTime,eventDuration,bean,creator);
                break;
            case "Eat on time" :
                eventStartTime  = LocalDate.now().atTime(8,0,0);
                String[] description = {
                        "Have you had breakfast?",
                        "Have some tea",
                        "It is Lunch Time",
                        "Have some tea/snacks",
                };
                for(int i = 0; i < beanEventDetails.getEventCount(); i++) {
                    createEvent(eventStartTime,eventDuration,bean,creator);
                    eventStartTime = eventStartTime.plusMinutes((10*60)/eventCount);
                }
                break;
            default:
                eventStartTime  = LocalDate.now().atTime(8,0,0);
                for(int i = 0; i < eventCount; i++) {
                    createEvent(eventStartTime,eventDuration,bean,creator);
                    eventStartTime = eventStartTime.plusMinutes((10*60)/eventCount);
                }


        }
    }

    private void createEvent(LocalDateTime eventStartTime, Long duration, Bean bean, User creator) {
        Event beanEvent = new Event();
        beanEvent.setTitle(bean.getTitle());
        beanEvent.setDescription(bean.getDescription());
        beanEvent.setStart(eventStartTime);
        beanEvent.setEnd(eventStartTime.plusMinutes(duration));
        beanEvent.setBean(bean);
        beanEvent.setCreator(creator);
        beanEvent.addMember(creator);
        eventService.create(beanEvent);
    }
}
