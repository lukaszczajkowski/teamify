import Api from "./Api";

class ProjectApi {
    getCurrentUsersProjects(currentUser_id) {
        return Api.get('/projects', {
            params: {
                userId: currentUser_id
            }
        });
    }

    getProjectById(id) {
        return Api.get('/projects/'+id);
    }

    createProject(project) {
        return Api.post('/projects', project);
    }

    updateProject(project) {
        return Api.put('/projects', project);
    }

    addMemberByEmail(projectId, userEmail) {
        return Api.put('/projects/' + projectId + '/userEmail', {
            params: userEmail
        });
    }

    removeMemberById(projectId, memberId) {
        return Api.put('/projects/' + projectId + '/remove/memberId', {
            params: memberId
        });
    }

    deleteProject(projectId) {
        return Api.delete('/projects/'+projectId);
    } 
}

export default new ProjectApi();