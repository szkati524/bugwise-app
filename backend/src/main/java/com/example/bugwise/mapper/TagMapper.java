package com.example.bugwise.mapper;

import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.Tag;
import org.springframework.stereotype.Component;

@Component
public class TagMapper {

    public TagDTO toDTO(Tag tag){
        if (tag == null) return null;
        return new TagDTO(tag.getId(),tag.getName());
    }
    public Tag toEntity(TagDTO dto){
        if (dto == null) return null;
        Tag tag = new Tag();
        tag.setName(dto.name());
        return tag;
    }
}
