package se.kth.sda.wellbean.project;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import se.kth.sda.wellbean.category.Category;
import se.kth.sda.wellbean.project.ProjectDto;

@Component
@Slf4j
public class ProjectMapper {

    private final ModelMapper modelMapper;

    public ProjectMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

        public ProjectDto entityToDto(Project project) {
        System.out.println(String.format("Convert 'Category' entity to DTO. ['id': %d, 'title', %s]",
                project.getId(), project.getTitle()));

        ProjectDto dto = modelMapper.map(project, ProjectDto.class);

        System.out.println(String.format("DTO '%d' initialized with id &s",
                project.getId(), project.getTitle()));

        return dto;
    }
}
