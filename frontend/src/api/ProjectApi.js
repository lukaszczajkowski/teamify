import Api from "./Api";

class ProjectApi {
    getCurrentUsersProjects(userId) {
        return Api.get(`/projects/userId?userId=${userId}`);
    }

    getCreatorsProjects(creatorId) {
        return Api.get(`/projects/creatorId?creatorId=${creatorId}`);
    }

    getProjectById(projectId) {
        return Api.get(`/projects/${projectId}`);
    }

    createProject(project) {
        return Api.post('/projects', project);
    }

    updateProject(project) {
        return Api.put('/projects', project);
    }

    addMemberById(projectId, memberId) {
        return Api.put(`/projects/${projectId}/userId?userId=${memberId}`);
    }

    addMemberByEmail(projectId, userEmail) {
        return Api.put(`/projects/${projectId}/userEmail?userEmail=${userEmail}`);
    }

    removeMemberById(projectId, memberId) {
        return Api.put(`/projects/${projectId}remove/memberId=${memberId}`);
    }

    deleteProject(projectId) {
        return Api.delete('/projects/'+projectId);
    } 
}

export default new ProjectApi();