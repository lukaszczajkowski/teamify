import Api from "./Api";

class CategoryApi {
    getAllCategories(projectId) {
        return Api.get('/categories/' + projectId);
    }

    createCategory(projectId, category) {
        return Api.post(`/categories/${projectId}`, category);
    }

    updateCategory(updatedCategory) {
        return Api.put('/categories', updatedCategory);
    }

    deleteCategory(categoryId) {
        return Api.delete('/categories/'+ categoryId);
    } 
}

export default new CategoryApi();