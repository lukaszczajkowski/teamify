import Api from './Api';

class UserApi {
    /**
     * Returns the list of user summaries except from the 
     * currently logged in user
     * @param {Long} projectId 
     */
    getUsersSummaries(projectId) {
        return Api.get('/users/summaries' + projectId);
    }

    /**
     * Returns the User object of the currently logged in user
     */
    getCurrentUser() {
        return Api.get('/users/current');
    }

    getUsersFromSharedProjects() {
        return Api.get('/users/from-shared-projects');
    }

    getEventMembers(eventId) {
        return Api.get('/users/get-members/' + eventId);
    }

}

export default new UserApi();