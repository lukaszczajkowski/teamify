package se.kth.sda.wellbean.category;

import org.springframework.beans.factory.annotation.Autowired;
import se.kth.sda.wellbean.server.events.ServerEventService;

import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

public class CategoryListener {

    /*
    private static ServerEventService serverEventService;

    public CategoryListener() {
    }

    @Autowired
    public void init(ServerEventService serverEventService) {
        CategoryListener.serverEventService = serverEventService;
    }

    @PostPersist
    @PostUpdate
    @PostRemove
    public void createServerEvent(Category category){
        System.out.println(serverEventService.create());
    }

     */
}
