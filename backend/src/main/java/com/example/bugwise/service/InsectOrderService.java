package com.example.bugwise.service;

import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.InsectOrder;
import com.example.bugwise.mapper.InsectOrderMapper;
import com.example.bugwise.repository.InsectOrderRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsectOrderService {
    private final InsectOrderRepository insectOrderRepository;
    private final InsectOrderMapper insectOrderMapper;

    @Autowired
    public InsectOrderService(InsectOrderRepository insectOrderRepository, InsectOrderMapper insectOrderMapper) {
        this.insectOrderRepository = insectOrderRepository;
        this.insectOrderMapper = insectOrderMapper;
    }

    public List<InsectOrderDTO> getAllInsectOrder() {
        return insectOrderRepository.findAll().stream().map(insectOrderMapper::toDTO).toList();
    }

    public InsectOrderDTO findByIdInsectOrder(Long id) {
        return insectOrderRepository.findById(id).map(insectOrderMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Order with id " + id + " not found"));
    }

    @Transactional
    public InsectOrderDTO addInsectOrder(InsectOrderDTO dto) {
        InsectOrder entity = insectOrderMapper.toEntity(dto);
        return insectOrderMapper.toDTO(insectOrderRepository.save(entity));
    }

    @Transactional
    public void deleteInsectOrder(Long id) {
        if (!insectOrderRepository.existsById(id)) {
            throw new EntityNotFoundException("Order with id " + id + " not found");
        }
        insectOrderRepository.deleteById(id);
    }


    @Transactional
    public InsectOrderDTO updateInsectOrder(Long id,InsectOrderDTO dto) {
       return insectOrderRepository.findById(id)
                .map(existing -> {
                    insectOrderMapper.updateEntityFromDTO(dto, existing);
                    return insectOrderMapper.toDTO(insectOrderRepository.save(existing));
                })
                .orElseThrow(() -> new EntityNotFoundException("Order with id " + id + " not found"));
    }



    }

