package com.example.bugwise.mapper;

import com.example.bugwise.dto.InsectFamilyDTO;
import com.example.bugwise.entity.InsectFamily;
import org.springframework.stereotype.Component;

@Component
public class InsectFamilyMapper {

    public InsectFamilyDTO toDTO(InsectFamily family){
        if (family == null) return null;
return new InsectFamilyDTO(
        family.getId(),
        family.getName(),
        family.getLatinName()
);
    }
    public void updateFamilyFromDTO(InsectFamilyDTO dto,InsectFamily entity){
        if (dto == null || entity == null) return;
        entity.setName(dto.name());
        entity.setLatinName(dto.latinName());
    }
    public InsectFamily toEntity(InsectFamilyDTO dto){
        if (dto == null) return null;
        InsectFamily family = new InsectFamily();
        updateFamilyFromDTO(dto,family);
        return family;
    }
}
