import Api from "./Api";

class CategoryApi {
    getAllCategories(project_id) {
        return Api.get('/categories/' + project_id);
    }

    createCategory(project_id, category) {
        return Api.post('/categories' + project_id, {newCategory: category});
    }

    updateCategory(project_id, category) {
        return Api.put('/categories' + project_id, {updatedCategory: category});
    }

    deleteCategory(category_id) {
        return Api.delete('/categories/'+ category_id);
    } 
}

export default new CategoryApi();