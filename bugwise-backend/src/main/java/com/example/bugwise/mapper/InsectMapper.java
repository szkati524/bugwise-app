package com.example.bugwise.mapper;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.entity.InsectImage;
import com.example.bugwise.entity.Tag;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InsectMapper {

    public InsectDTO toDTO(Insect insect){
        if (insect == null) return null;
        return new InsectDTO(
                insect.getId(),
                insect.getCommonName(),
                insect.getLatinName(),
                insect.getEnglishName(),
                insect.getDescription(),
                insect.getInsectOrder() != null ? insect.getInsectOrder().getName() : "unknown",
                insect.getInsectFamily() != null ? insect.getInsectFamily().getName() : "unknown",
                insect.getHabitat() != null ? insect.getHabitat().getName() : "unknown",
                insect.getInsectImage() != null ? insect.getInsectImage().stream().map(InsectImage::getUrl).toList() : List.of(),
                insect.getTag() != null ? insect.getTag().stream().map(Tag::getName).toList() : List.of(),
                insect.isProtected(),
                insect.getDangerLevel() != null ? insect.getDangerLevel().name() : "unknown",
                insect.getDangerLevel() != null ? insect.getDangerLevel().name() : null
        );
    }
    public void updateEntityFromDTO(InsectDTO dto,Insect insect){
        if (dto == null) return;
        insect.setCommonName(dto.commonName());
        insect.setLatinName(dto.latinName());
        insect.setEnglishName(dto.englishName());
        insect.setDescription(dto.description());
        insect.setProtected(dto.isProtected());
    }
}
