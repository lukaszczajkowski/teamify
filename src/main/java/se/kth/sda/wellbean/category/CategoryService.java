package se.kth.sda.wellbean.category;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository cRepository;

    public List<Category> getAllCategories() {
        return cRepository.findAll();
    }

    public List<Category> getAllCategoriesByProjectId(Long projectId) {
        return cRepository.getAllCommentsByProjectId(projectId);
    }

    public Category createNewCategory(Category newCategory) {
        return cRepository.save(newCategory);
    }

    public Category updateCategory(Category updatedCategory) {
        return cRepository.save(updatedCategory);
    }

    public void deleteCategory(Long id) {
        cRepository.deleteById(id);
    }
}
