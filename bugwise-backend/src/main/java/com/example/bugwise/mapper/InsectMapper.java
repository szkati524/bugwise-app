package com.example.bugwise.mapper;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.dto.QuestionDTO;
import com.example.bugwise.entity.*;
import com.example.bugwise.enums.DangerLevel;
import com.example.bugwise.repository.HabitatRepository;
import com.example.bugwise.repository.InsectFamilyRepository;
import com.example.bugwise.repository.InsectOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InsectMapper {

    @Autowired
    private InsectOrderRepository orderRepository;
    @Autowired
    private InsectFamilyRepository familyRepository;
    @Autowired
    private HabitatRepository habitatRepository;

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

    public void updateEntityFromDTO(InsectDTO dto, Insect insect){
        if (dto == null) return;


        insect.setCommonName(dto.commonName());
        insect.setLatinName(dto.latinName());
        insect.setEnglishName(dto.englishName());
        insect.setDescription(dto.description());
        insect.setProtected(dto.isProtected());


        if (dto.dangerLevel() != null) {
            insect.setDangerLevel(DangerLevel.valueOf(dto.dangerLevel()));
        }


        if (dto.orderName() != null && !dto.orderName().isBlank()) {
            InsectOrder order = orderRepository.findByName(dto.orderName())
                    .orElseGet(() -> {
                        InsectOrder newOrder = new InsectOrder();
                        newOrder.setName(dto.orderName());

                        newOrder.setLatinName(dto.orderLatinName() != null ? dto.orderLatinName() : dto.orderName());
                        return orderRepository.save(newOrder);
                    });
            insect.setInsectOrder(order);
        }


        if (dto.familyName() != null && !dto.familyName().isBlank()) {
            InsectFamily family = familyRepository.findByName(dto.familyName())
                    .orElseGet(() -> {
                        InsectFamily newFamily = new InsectFamily();
                        newFamily.setName(dto.familyName());

                        newFamily.setLatinName(dto.familyLatinName() != null ? dto.familyLatinName() : dto.familyName());
                        return familyRepository.save(newFamily);
                    });
            insect.setInsectFamily(family);
        }


        if (dto.habitatName() != null && !dto.habitatName().isBlank()) {
            Habitat habitat = habitatRepository.findByName(dto.habitatName())
                    .orElseGet(() -> {
                        Habitat newHabitat = new Habitat();
                        newHabitat.setName(dto.habitatName());

                        newHabitat.setType("TERRESTRIAL");
                        return habitatRepository.save(newHabitat);
                    });
            insect.setHabitat(habitat);
        }
    }
}
