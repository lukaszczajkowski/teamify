package se.kth.sda.wellbean.calendar;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event create(Event event) {
        return this.eventRepository.save(event);
    }

    public Event update(Event event) {
        return this.eventRepository.save(event);
    }

    public void delete(Event event) {
       this.eventRepository.delete(event);
    }

    public List<Event> findAllByUserId(Long userId) {
        return this.eventRepository.findAllByUsers_id(userId);
    }
    public List<Event> getEventsByBeanId(Long beanId) {
        return this.eventRepository.getEventsByBeanId(beanId);
    }
}
