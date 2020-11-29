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

    addMemberById(project_id, user_id) {
        return Api.put('projects/' + project_id, {
            params: {
                userId: user_id
            }
        });
    }

    addMemberByEmail(project_id, user_email) {
        return Api.put('projects/' + project_id, {
            params: {
                userEmail: user_email
            }
        });
    }

    removeMemberById(project_id, member_id) {
        return Api.put('projects/' + project_id + '/remove/memberId', {
            params: {
                memberId: member_id
            }
        });
    }

    deleteProject(id) {
        return Api.delete('/projects/'+id);
    } 
}

export default new ProjectApi();