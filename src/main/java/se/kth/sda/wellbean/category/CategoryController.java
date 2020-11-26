package se.kth.sda.wellbean.category;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.notification.NotificationService;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.task.TaskController;
import se.kth.sda.wellbean.task.TaskService;
import se.kth.sda.wellbean.user.UserService;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;
    private final ProjectService projectService;
    private final TaskService taskService;
    private final AuthService authService;
    private final UserService userService;

    public CategoryController(CategoryService categoryService,
                              ProjectService projectService,
                              TaskService taskService,
                             AuthService authService,
                             UserService userService) {
        this.categoryService = categoryService;
        this.projectService = projectService;
        this.taskService = taskService;
        this.authService = authService;
        this.userService = userService;
    }
    /**
     * This method return all categories
     * @return List of Categories for the project
     */
    @GetMapping("/categories")
    public List<Category> getAllComments() {
            return categoryService.getAllCategories();
    }

    /**
     * This method takes project id as parameter and returns list of categories
     * @param projectId
     * @return list of categories
     */
    @GetMapping("/categories/{projectId}")
    public List<Category> getAllCommentsByProjectId(@PathVariable Long projectId) {
            return categoryService.getAllCategoriesByProjectId(projectId);
    }

    /**
     * This method takes new category details and create entry in system
     * @param newCategory
     * @param projectId
     * @return category
     */
    @PostMapping("/categories/{projectId}")
    public Category createNewCategory(@RequestBody Category newCategory, @PathVariable Long projectId) {
        newCategory.setProject(projectService.getById(projectId));
        return categoryService.createNewCategory(newCategory);
    }

    /**
     * This method takes updated category details and update the existng entry in system
     * @param updatedCategory
     * @param projectId
     * @return
     */
    @PutMapping("/categories/{projectId}")
    public Category updateCategory(@RequestBody Category updatedCategory, @PathVariable Long projectId) {
        updatedCategory.setProject(projectService.getById(projectId));
        return categoryService.updateCategory(updatedCategory);
    }

    /**
     * This method deletes the category details
     * @param id
     */
    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
        //TODO: add condition to check task in category using task controller
        if(taskService.getAllTaskByCategoriesId(id).size()==0)
        {
            categoryService.deleteCategory(id);
        }

    }

}
