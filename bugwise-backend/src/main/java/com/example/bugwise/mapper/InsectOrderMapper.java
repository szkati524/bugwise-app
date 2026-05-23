package com.example.bugwise.mapper;

import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.InsectOrder;
import org.springframework.stereotype.Component;

@Component
public class InsectOrderMapper {

    public InsectOrderDTO toDTO(InsectOrder order){
        if (order ==null) return null;
        return new InsectOrderDTO(
                order.getId(),
                order.getName(),
                order.getLatinName(),
                order.getDescription()
        );

    }
    public void updateEntityFromDTO(InsectOrderDTO dto,InsectOrder entity){
        if (dto == null || entity == null) return;
        entity.setName(dto.name());
        entity.setLatinName(dto.latinName());
        entity.setDescription(dto.description());
    }
    public InsectOrder toEntity(InsectOrderDTO dto){
        if (dto == null) return null;
        InsectOrder order = new InsectOrder();
        updateEntityFromDTO(dto,order);
        return order;
    }
}
