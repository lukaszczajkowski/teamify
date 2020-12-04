import Api from "./Api";

class CommentApi {

    getCommentsTaskId(taskId) {
        return Api.get('/comments/taskId', {params: taskId });
    }

    createComment(comment, taskId) {
        return Api.post('/comments/' + taskId, comment);
    }

    updateComment(comment, taskId) {
        return Api.put('/comments/' + taskId, comment);
    }

    deleteComment(commentId) {
        return Api.delete('/comments/'+ commentId);
    }

}
export default new CommentApi();