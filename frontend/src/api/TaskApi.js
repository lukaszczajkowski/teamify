import Api from "./Api";

class TaskApi {
    getAllTasks() {
        return Api.get('/tasks');
    }

    getTaskById(taskId) {
        return Api.get('/tasks/' + taskId)
    }

    getTasksByMemberId(memberId) {
        return Api.get('/tasks/memberId', {params: memberId });
    }

    getTasksByCategoryId(categoryId) {
        return Api.get('/tasks/categoryId', {params: categoryId });
    }

    getTasksByProjectId(projectId) {
        return Api.get('/tasks/projectId', {params: projectId });
    }

    getTasksByCategoryIdAndMemberId(categoryId, memberId ) {
        return Api.get('/tasks/categoryMember', {params: categoryId, memberId});
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

}

export default new TaskApi();