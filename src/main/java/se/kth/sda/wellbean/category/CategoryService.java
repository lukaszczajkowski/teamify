package se.kth.sda.wellbean.category;


import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository cRepository;

    private final ApplicationEventPublisher publisher;


    public CategoryService(CategoryRepository cRepository, ApplicationEventPublisher publisher) {
        this.cRepository = cRepository;
        this.publisher = publisher;
    }

    public List<Category> getAllCategories() {
        return cRepository.findAll();
    }


    public Optional<Category> getById(Long id) {
        return cRepository.findById(id);
    }

    public List<Category> getAllCategoriesByProjectId(Long projectId) {
        return cRepository.getAllCommentsByProjectId(projectId);
    }

    public Category createNewCategory(Category newCategory) {
        Category saved = cRepository.save(newCategory);

        return saved;
    }

    public Category updateCategory(Category updatedCategory) {
        Category saved = cRepository.save(updatedCategory);

        return cRepository.save(updatedCategory);
    }

    public void deleteCategory(Long id) {
        Category deleted = cRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        cRepository.deleteById(id);
    }
}
