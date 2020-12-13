package se.kth.sda.wellbean.category;


import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.task.TaskService;
import se.kth.sda.wellbean.user.UserService;

import java.util.List;

@Slf4j
@RestController
public class CategoryController {

    private final CategoryService categoryService;
    private final ProjectService projectService;
    private final TaskService taskService;
    private final AuthService authService;
    private final UserService userService;
    private final CategoryCreatedEventProcessor categoryCreatedEventProcessor;
    private final Flux<CategoryCreated> events;
    private final CategoryMapper mapper;

    public CategoryController(CategoryService categoryService,
                              ProjectService projectService,
                              TaskService taskService,
                             AuthService authService,
                             UserService userService,
                              CategoryCreatedEventProcessor categoryCreatedEventProcessor,
                              CategoryMapper mapper) {
        this.categoryService = categoryService;
        this.projectService = projectService;
        this.taskService = taskService;
        this.authService = authService;
        this.userService = userService;
        this.categoryCreatedEventProcessor = categoryCreatedEventProcessor;
        this.mapper = mapper;
        this.events = Flux.create(categoryCreatedEventProcessor).share();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/sse/category", produces = "text/event-stream;charset=utf-8")
    public ResponseEntity<Flux<CategoryDto>> stream() {
        System.out.println("Start listening to the category collection.");

        return ResponseEntity.ok().body(events.map(event -> {
            CategoryDto dto = this.mapper.entityToDto((Category) event.getSource());
            System.out.println("Mapping category " + dto.getTitle());
            return dto;
        }));
    }

    /**
     * This method return all categories
     * @return List of Categories for the project
     */
    @GetMapping("/categories")
    public List<Category> getAllCategory() {
            return categoryService.getAllCategories();
    }

    /**
     * This method takes project id as parameter and returns list of categories
     * @param projectId
     * @return list of categories
     * Example of usage:
     * localhost:8080/categories/1 - returns the project with the ID = 1
     */
    @GetMapping("/categories/{projectId}")
    public List<Category> getAllCategoryByProjectId(@PathVariable Long projectId) {
            return categoryService.getAllCategoriesByProjectId(projectId);
    }

    /**
     * This method takes new category details and create entry in system
     * @param newCategory
     * @param projectId
     * @return category
     * Example of usage:
     *localhost:8080/categories/1 + category in the request body
     * request body  {
     *                  "title": "title of category"
     *                  }
     * -Create category based on request body details
     */
    @PostMapping("/categories/{projectId}")
    public Category createNewCategory(@RequestBody Category newCategory, @PathVariable Long projectId) {
         newCategory.setProject(projectService.getById(projectId));
         return categoryService.createNewCategory(newCategory);
    }

    /**
     * This method takes updated category details and update the existng entry in system
     * @param updatedCategory
     * @return
     * Example of usage:
     *localhost:8080/categories + category in the request body
     * request body  {
     *                 "id":2,
     *                 "title":"title of category"
     *               }
     * -updates category based on request body details
     */
    @PutMapping("/categories")
    public Category updateCategory(@RequestBody Category updatedCategory) {
            return categoryService.updateCategory(updatedCategory);
    }

    /**
     * This method deletes the category details
     * @param id
     * @throws ResponseStatusException
     * Example of usage:
     * localhost:8080/categories/2
     * -deletes category with id 2
     */
    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
             if (taskService.getAllTaskByCategoriesId(id).size() == 0) {
                categoryService.deleteCategory(id);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
    }


}
