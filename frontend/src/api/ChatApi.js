import Api from './Api';

class ChatApi {

    getUsers() {
        return Api.get("/users/summaries");
    }

    countNewMessages(senderId, recipientId) {
        return Api.get("/messages/" + senderId + "/" + recipientId + "/count")
    }
    
    findChatMessages(senderId, recipientId) {
        return Api.get("/messages/" + senderId + "/" + recipientId)
    }
      
    findChatMessage(id) {
        return Api.get("/messages/" + id)
    }

}

export default new ChatApi();