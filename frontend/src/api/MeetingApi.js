import Api from "./Api";

class MeetingApi {
    

    createNewMeeting(meeting) {
        return Api.post("/meeting", meeting);
    }
    getMeetings() {
        return Api.get("/meeting");
    }
    addMembers(emails,id) {
        return Api.put("/meeting/addMembers/"+id, emails);
    }
    cancelMeeting(id) {
        return Api.delete("/meeting/"+id);
    }
    getMeetingMembers(id) {
        return Api.delete("/meeting/members/"+id);
    }

    
}

export default new MeetingApi();