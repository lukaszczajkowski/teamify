package se.kth.sda.wellbean.task;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TaskMapper {
    private final ModelMapper modelMapper;

    public TaskMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public TaskDto entityToDto(Task task) {
        System.out.println(String.format("Convert 'Category' entity to DTO. ['id': %d, 'title', %s]",
                task.getId(), task.getTitle()));

        TaskDto dto = modelMapper.map(task, TaskDto.class);

        System.out.println(String.format("DTO '%d' initialized with id &s",
                dto.getId(), dto.getTitle()));

        return dto;
    }
}
