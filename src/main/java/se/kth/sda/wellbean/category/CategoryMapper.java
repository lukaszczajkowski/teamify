package se.kth.sda.wellbean.category;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CategoryMapper {

    private final ModelMapper modelMapper;

    public CategoryMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CategoryDto entityToDto(Category category) {
        System.out.println(String.format("Convert 'Category' entity to DTO. ['id': %d, 'title', %s]",
                category.getId(), category.getTitle()));

        CategoryDto dto = modelMapper.map(category, CategoryDto.class);

        System.out.println(String.format("DTO '%d' initialized with id &s",
                category.getId(), category.getTitle()));

        return dto;
    }
}
