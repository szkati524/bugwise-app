package com.example.bugwise.service;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.entity.Tag;
import com.example.bugwise.mapper.InsectMapper;
import com.example.bugwise.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class InsectService {

    private final InsectRepository insectRepository;
    private final HabitatRepository habitatRepository;
    private final InsectOrderRepository insectOrderRepository;
    private final InsectFamilyRepository insectFamilyRepository;
    private final TagRepository tagRepository;
    private final InsectMapper insectMapper;

    @Autowired
    public InsectService(InsectRepository insectRepository, HabitatRepository habitatRepository, InsectOrderRepository insectOrderRepository, InsectFamilyRepository insectFamilyRepository, TagRepository tagRepository, InsectMapper insectMapper) {
        this.insectRepository = insectRepository;
        this.habitatRepository = habitatRepository;
        this.insectOrderRepository = insectOrderRepository;
        this.insectFamilyRepository = insectFamilyRepository;
        this.tagRepository = tagRepository;
        this.insectMapper = insectMapper;
    }
    @Transactional
    public InsectDTO addInsect(InsectDTO dto){
       Insect insect = new Insect();
       insectMapper.updateEntityFromDTO(dto,insect);

       habitatRepository.findByName(dto.habitatName())
               .stream().findFirst()
                       .ifPresentOrElse(insect::setHabitat,
                               () -> {throw new EntityNotFoundException("Habitat not found " + dto.habitatName());});
       insectOrderRepository.findByName(dto.orderName())
                       .ifPresent(insect::setInsectOrder);
       insectFamilyRepository.findByName(dto.familyName())
                       .ifPresent(insect::setInsectFamily);
       if (dto.tags() != null) {
           Set<Tag> insectTags = dto.tags().stream()
                   .map(tagName -> tagRepository.findByName(tagName)
                           .orElseGet(() -> tagRepository.save(new Tag(tagName))))
                   .collect(Collectors.toSet());
           insect.setTag(insectTags);
       }

       return insectMapper.toDTO(insectRepository.save(insect));
    }

    public List<InsectDTO> getAllInsects(){
       List<Insect> insects = insectRepository.findAllWithBasicInfo();
       insects = insectRepository.fetchTags(insects);
       return insects.stream()
               .map(insectMapper::toDTO)
               .toList();
    }
    public InsectDTO getInsectById(Long id){
        return insectRepository.findById(id).map(insectMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Insect with id " + id + " not found"));

    }
    @Transactional
    public InsectDTO updateInsect(Long id,InsectDTO dto){
return insectRepository.findById(id)
        .map(existing -> {
            insectMapper.updateEntityFromDTO(dto,existing);
            return insectMapper.toDTO(insectRepository.save(existing));
        })
        .orElseThrow(() -> new EntityNotFoundException("Insect with id " + id + " not found"));

    }
    @Transactional
    public void deleteInsect(Long id){
        if (!insectRepository.existsById(id)) {
            throw new EntityNotFoundException("Insect with id " + id + " not found");
        }
        insectRepository.deleteById(id);
    }

    }


