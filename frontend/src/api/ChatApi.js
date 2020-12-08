import Api from './Api';

class ChatApi {

    getUsers() {
        return Api.get("/from-shared-projects");
    }

    countNewMessages(senderId) {
        return Api.get("/messages/" + senderId + "/count");
    }
    
    findChatMessages(senderId) {
        return Api.get("/messages/" + senderId);
    }
      
    findChatMessage(id) {
        return Api.get("/messages/findMessage/" + id);
    }

}

export default new ChatApi();