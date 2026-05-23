package com.example.bugwise.service;

import com.example.bugwise.dto.HabitatDTO;
import com.example.bugwise.entity.Habitat;
import com.example.bugwise.mapper.HabitatMapper;
import com.example.bugwise.repository.HabitatRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitatService {
    private final HabitatRepository habitatRepository;
    private final HabitatMapper habitatMapper;
@Autowired
    public HabitatService(HabitatRepository habitatRepository, HabitatMapper habitatMapper) {
        this.habitatRepository = habitatRepository;
    this.habitatMapper = habitatMapper;
}
@Transactional
    public List<HabitatDTO> getAllHabitats(){
    return habitatRepository.findAll().stream().map(habitatMapper::toDTO).toList();

    }
    public HabitatDTO findByIdHabitat(Long id){
    return habitatRepository.findById(id).map(habitatMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Habitat with id " + id + " not found"));
    }
    @Transactional
    public HabitatDTO addHabitat(HabitatDTO dto){
    Habitat entity = habitatMapper.toEntity(dto);
    Habitat saved = habitatRepository.save(entity);
    return habitatMapper.toDTO(saved);
    }
    @Transactional
    public HabitatDTO updatedHabitat(Long id,HabitatDTO dto){
    return habitatRepository.findById(id)
            .map(existingHabitat -> {
                habitatMapper.updateEntityFromDTO(dto,existingHabitat);
                return habitatMapper.toDTO(habitatRepository.save(existingHabitat));
            })
            .orElseThrow(() -> new EntityNotFoundException("Habitat not found"));
    }
    @Transactional
    public void deleteHabitat(Long id){
    if (!habitatRepository.existsById(id)){
        throw new EntityNotFoundException("Habitat with id " + id + " not found");
    }
    habitatRepository.deleteById(id);
    }


}
