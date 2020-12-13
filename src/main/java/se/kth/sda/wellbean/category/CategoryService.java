package se.kth.sda.wellbean.category;


import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository cRepository;

    private final ApplicationEventPublisher publisher;

    private final CategoryMapper mapper;

    public CategoryService(CategoryRepository cRepository, ApplicationEventPublisher publisher,
                           CategoryMapper mapper) {
        this.cRepository = cRepository;
        this.publisher = publisher;
        this.mapper = mapper;
    }

    public List<Category> getAllCategories() {
        return cRepository.findAll();
    }

    public List<CategoryDto> getCategories() {
        return this.cRepository.findAll()
                .stream().map(c -> this.mapper.entityToDto(c))
                .collect(Collectors.toList());
    }

    public Optional<Category> getById(Long id) {
        return cRepository.findById(id);
    }

    public List<Category> getAllCategoriesByProjectId(Long projectId) {
        return cRepository.getAllCommentsByProjectId(projectId);
    }

    public Category createNewCategory(Category newCategory) {
        Category saved = cRepository.save(newCategory);

        this.publisher.publishEvent(new CategoryCreated(saved));

        return saved;
    }

    public Category updateCategory(Category updatedCategory) {
        Category saved = cRepository.save(updatedCategory);

        this.publisher.publishEvent(new CategoryCreated(saved));

        return cRepository.save(updatedCategory);
    }

    public void deleteCategory(Long id) {
        Category deleted = cRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
        this.publisher.publishEvent(new CategoryCreated(deleted));

        cRepository.deleteById(id);
    }
}
