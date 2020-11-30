import Api from "./Api";

class CategoryApi {
    getAllCategories(projectId) {
        return Api.get('/categories/' + projectId);
    }

    createCategory(projectId, category) {
        return Api.post('/categories/' + projectId, category);
    }

    updateCategory(project_id, category) {
        return Api.put('/categories/' + project_id, {
                "updatedCategory": category
        });
    }

    deleteCategory(category_id) {
        return Api.delete('/categories/'+ category_id);
    } 
}

export default new CategoryApi();