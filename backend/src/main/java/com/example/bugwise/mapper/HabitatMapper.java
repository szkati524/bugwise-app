package com.example.bugwise.mapper;

import com.example.bugwise.dto.HabitatDTO;
import com.example.bugwise.entity.Habitat;
import org.springframework.stereotype.Component;

@Component
public class HabitatMapper {

    public HabitatDTO toDTO(Habitat habitat){
        if (habitat == null ) return null;
        return new HabitatDTO(
                habitat.getId(),
                habitat.getName(),
                habitat.getType(),
                habitat.getClimateDescription()
        );

    }
    public Habitat toEntity(HabitatDTO dto){
        if (dto == null) return null;
        Habitat habitat = new Habitat();
        habitat.setName(dto.name());
        habitat.setType(dto.type());
        habitat.setClimateDescription(dto.climateDescription());
        return habitat;
    }
    public void updateEntityFromDTO(HabitatDTO dto,Habitat habitat){
        if (dto == null || habitat == null) return;
        habitat.setName(dto.name());
        habitat.setType(dto.type());
        habitat.setClimateDescription(dto.climateDescription());
    }
}
