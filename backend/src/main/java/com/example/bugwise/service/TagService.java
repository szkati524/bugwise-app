package com.example.bugwise.service;

import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.Tag;
import com.example.bugwise.mapper.TagMapper;
import com.example.bugwise.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;
@Autowired
    public TagService(TagRepository tagRepository, TagMapper tagMapper) {
        this.tagRepository = tagRepository;
    this.tagMapper = tagMapper;
}
    public List<TagDTO> getAllTags(){
        return tagRepository.findAll().stream().map(tagMapper::toDTO).toList();
    }

    public TagDTO findByTagId(Long id){
        return tagRepository.findById(id).map(tagMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Tag with id " + id + " not found"));
    }

    @Transactional
    public TagDTO addTag(TagDTO dto){
        Tag entity = tagMapper.toEntity(dto);
        Tag savedTag = tagRepository.save(entity);
        return tagMapper.toDTO(savedTag);
    }
    @Transactional
    public void deleteTag(Long id){
    if (!tagRepository.existsById(id)){
        throw new EntityNotFoundException("Tag with id " + id + " not found");
    }
        tagRepository.deleteById(id);
    }

}
