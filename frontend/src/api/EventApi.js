
import Api from "./Api";

class EventApi {

    getAllUserEvents() {
        return Api.get('/events/user');
    }
    
    /**
     * Returns all the user's events within the range
     * from start to end
     * @param {*} Long userId 
     * @param {*} String start 
     * @param {*} String end 
     */
    getUserEventsInRange(userId, start, end) {
        return Api.get('/events/' + userId + "/user/range", {
            params: {
                start: start,
                end: end
            }
        });
    }

    /**
     * Returns all the project's events within the range
     * from start to end
     * @param {*} Long projectId 
     * @param {*} String start 
     * @param {*} String end 
     */
    getProjectEventsInRange(projectId, start, end) {
        return Api.get('/events/' + projectId + '/project/range', {
            params: {
                start: start,
                end: end
            }
        });
    }
    /**
     * Creates a new event
     * @param {*} event 
     */
    create(event) {
        return Api.post('/events', event);
    }
    /**
     * Updates an existing event
     * @param {*} event 
     */
    update(event) {
        return Api.put('/events', event);
    }

    /**
     * Takes in an event id and adds a user with the given email address
     * to the list of members and sends the notification to that email address
     * @param {*} eventId 
     * @param {*} userEmail 
     */
    inviteUserByEmail(eventId, userEmail) {
        return Api.put('/events/' + eventId + '/userEmail', {
            params: userEmail
        });
    }
    /**
     * Accepts an event id and user email and removes the user identified by that
     * email from the list of members of the event
     * @param {*} eventId 
     * @param {*} userEmail 
     */
    removeUser(eventId, userEmail) {
        return Api.put('/events/' + eventId + '/delete/userEmail', {
            params: userEmail
        });
    }

    /**
     * Accepts an event in a request body and deletes that event
     * @param {*} event 
     */
    delete(eventId) {
        return Api.delete('/events/' + eventId);
    }

    /**
     * Accepts and event id and LocalDateTime start and changes the start
     * time of the event
     * @param {*} eventId 
     * @param {*} start 
     */
    changeStartingDate(eventId, start) {
        return Api.put('/events/' + eventId + '/change-start/start', {
            params: start
        });
    }

    /**
     * Accepts and event id and LocalDateTime finish and changes the finish
     * time of the event
     * @param {*} eventId 
     * @param {*} start 
     */
    changeFinishDate(eventId, finish) {
        return Api.put('/events/' + eventId + '/change-finish/finish', {
            params: finish
        });
    }
}


export default new EventApi;
