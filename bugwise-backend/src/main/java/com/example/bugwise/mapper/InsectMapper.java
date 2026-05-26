package com.example.bugwise.mapper;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.dto.QuestionDTO;
import com.example.bugwise.entity.*;
import com.example.bugwise.enums.DangerLevel;
import com.example.bugwise.repository.HabitatRepository;
import com.example.bugwise.repository.InsectFamilyRepository;
import com.example.bugwise.repository.InsectOrderRepository;
import com.example.bugwise.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class InsectMapper {

    @Autowired
    private InsectOrderRepository orderRepository;
    @Autowired
    private InsectFamilyRepository familyRepository;
    @Autowired
    private HabitatRepository habitatRepository;
    @Autowired
    private TagRepository tagRepository;

    public InsectDTO toDTO(Insect insect){
        if (insect == null) return null;
        List<QuestionDTO> questionDTOS = insect.getTemplateQuestions() != null
                ? insect.getTemplateQuestions().stream()
                .map(q -> new QuestionDTO(
                        q.getId(),
                        q.getContent(),
                        new ArrayList<>(q.getOptions()),
                        q.getCorrectAnswer()
                ))
                .toList()
                : List.of();

        return new InsectDTO(
                insect.getId(),
                insect.getCommonName(),
                insect.getLatinName(),
                insect.getEnglishName(),
                insect.getDescription(),
                insect.getInsectOrder() != null ? insect.getInsectOrder().getName() : "unknown",
                insect.getInsectOrder() != null ? insect.getInsectOrder().getLatinName() : "unknown",
                insect.getInsectFamily() != null ? insect.getInsectFamily().getName() : "unknown",
                insect.getInsectFamily() != null ? insect.getInsectFamily().getLatinName() : "unknown",
                insect.getHabitat() != null ? insect.getHabitat().getName() : "unknown",
                insect.getInsectImage() != null ? insect.getInsectImage().stream().map(InsectImage::getUrl).toList() : List.of(),
                insect.getTag() != null ? insect.getTag().stream().map(Tag::getName).toList() : List.of(),
                insect.isProtected(),
                insect.getDangerLevel() != null ? insect.getDangerLevel().name() : "unknown",
                insect.getDangerLevel() != null ? insect.getDangerLevel().name() : null,
                questionDTOS
        );
    }

    public void updateEntityFromDTO(InsectDTO dto, Insect insect) {
        if (dto == null) return;


        insect.setCommonName(dto.commonName());
        insect.setLatinName(dto.latinName());
        insect.setEnglishName(dto.englishName());
        insect.setDescription(dto.description());
        insect.setProtected(dto.isProtected());

        if (dto.dangerLevel() != null) {
            insect.setDangerLevel(DangerLevel.valueOf(dto.dangerLevel()));
        }


    }
}

