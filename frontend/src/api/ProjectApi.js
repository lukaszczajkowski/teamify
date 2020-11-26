import Api from "./Api";

class ProjectApi {
    getAllProjects() {
        return Api.get('/posts');
    }

    getProjectById(id) {
        return Api.get('/posts/'+id);
    }

    createProject(project) {
        return Api.post('/posts', post);
    }

    updateProject(project) {
        return Api.put('/posts', post);
    }

    deleteProject(id) {
        return Api.delete('/posts/'+id);
    } 
}

export default new ProjectApi();