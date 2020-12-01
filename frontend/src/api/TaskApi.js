import Api from "./Api";

class TaskApi {
    getAllTasks() {
        return Api.get('/tasks');
    }

    getTaskById(taskId) {
        return Api.get('/tasks/' + taskId)
    }

    createTask(categoryId, task) {
        return Api.post('/tasks/' + categoryId, task);
    }

    updateTask(categoryId, task) {
        return Api.put('/tasks/' + categoryId, task);
    }

    deleteTask(taskId) {
        return Api.delete('/tasks/'+ taskId);
    }

    addMemberToTask(taskId, userId) {
        return Api.update('/tasks/' + taskId + '/userId', {
            params: userId
        })
    }

    deleteMemberFromTask(taskId, userId) {
        return Api.update('/tasks/' + taskId + '/remove/userId', {
            params: userId
        })
    }

    deleteTask(taskId) {
        return Api.delete('/tasks/' + taskId)
    }
}

export default new TaskApi();