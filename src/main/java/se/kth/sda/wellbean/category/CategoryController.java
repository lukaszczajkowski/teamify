package se.kth.sda.wellbean.category;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    /**
     * This method takes projectId as parameter and return all categories
     * created in that project
     * @param projectId
     * @return List of Categories for the project
     */
    @GetMapping("/categories")
    public List<Category> getAllComments(@RequestParam(required = false) Long projectId) {
        if(projectId == null) {
            return categoryService.getAllCategories();
        } else
            return categoryService.getAllCategoriesByProjectId(projectId);
    }

    /**
     * This method takes new category details and create entry in system
     * @param newCategory
     * {
     *     "title":"...",
     *     "project": {
     *         "id":"..."
     *     }
     * }
     * @return category object
     */
    @PostMapping("/categories")
    public Category createNewCategory(@RequestBody Category newCategory) {
        return categoryService.createNewCategory(newCategory);
    }

    /**
     * This method takes updated category details and update the existng entry in system
     * @param updatedCategory
     * {
     *      "id":"...",
     *      "title":"...",
     *      "project": {
     *             "id":"..."
     *       }
     * }
     * @return category object
     */
    @PutMapping("/categories")
    public Category updateCategory(@RequestBody Category updatedCategory) {
        return categoryService.updateCategory(updatedCategory);
    }

    /**
     * This method deletes the category details
     * @param id
     */
    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
        //TODO: add condition to check task in category using task controller
         categoryService.deleteCategory(id);
    }

}
