import Api from "./Api";

class CategoryApi {
    getAllCategories(projectId) {
        return Api.get('/categories/' + projectId);
    }

    createCategory(projectId, category) {
        return Api.post('/categories/' + projectId, category);
    }

    updateCategory(projectId, category) {
        return Api.put('/categories/' + projectId, {
                "updatedCategory": category
        });
    }

    deleteCategory(categoryId) {
        return Api.delete('/categories/'+ categoryId);
    } 
}

export default new CategoryApi();