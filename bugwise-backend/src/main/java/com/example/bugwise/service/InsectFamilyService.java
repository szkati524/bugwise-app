package com.example.bugwise.service;

import com.example.bugwise.dto.InsectFamilyDTO;
import com.example.bugwise.entity.InsectFamily;
import com.example.bugwise.mapper.InsectFamilyMapper;
import com.example.bugwise.repository.InsectFamilyRepository;


import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsectFamilyService {
    private final InsectFamilyRepository insectFamilyRepository;
    private final InsectFamilyMapper insectFamilyMapper;

    public InsectFamilyService(InsectFamilyRepository insectFamilyRepository, InsectFamilyMapper insectFamilyMapper) {
        this.insectFamilyRepository = insectFamilyRepository;
        this.insectFamilyMapper = insectFamilyMapper;
    }
    public List<InsectFamilyDTO> getAllInsectFamily(){
        return insectFamilyRepository.findAll().stream().map(insectFamilyMapper::toDTO).toList();
    }
    public InsectFamilyDTO findInsectFamilyById(Long id){
        return insectFamilyRepository.findById(id).map(insectFamilyMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Family with id " + id + " not found"));
    }
    @Transactional
    public InsectFamilyDTO addInsectFamily(InsectFamilyDTO dto){
        InsectFamily entity = insectFamilyMapper.toEntity(dto);
        return insectFamilyMapper.toDTO(insectFamilyRepository.save(entity));
    }
    @Transactional
    public InsectFamilyDTO updateInsectFamily(Long id,InsectFamilyDTO dto){
      return insectFamilyRepository.findById(id)
              .map(existing -> {
                  insectFamilyMapper.updateFamilyFromDTO(dto,existing);
                  return insectFamilyMapper.toDTO(insectFamilyRepository.save(existing));
              })
              .orElseThrow(() ->  new EntityNotFoundException("Family with id " + id + " not found"));
    }
    @Transactional
    public void deleteInsectFamily(Long id){
        if (!insectFamilyRepository.existsById(id)){
            throw new EntityNotFoundException("Family with id " + id + " not found");
        }
        insectFamilyRepository.deleteById(id);
    }

    }

