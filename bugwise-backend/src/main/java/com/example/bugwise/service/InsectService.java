package com.example.bugwise.service;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.dto.InsectQuizDTO;
import com.example.bugwise.dto.QuestionDTO;
import com.example.bugwise.entity.*;
import com.example.bugwise.mapper.InsectMapper;
import com.example.bugwise.repository.*;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private final UserRepository userRepository;

    @Autowired
    public InsectService(InsectRepository insectRepository, HabitatRepository habitatRepository, InsectOrderRepository insectOrderRepository, InsectFamilyRepository insectFamilyRepository, TagRepository tagRepository, InsectMapper insectMapper, UserRepository userRepository) {
        this.insectRepository = insectRepository;
        this.habitatRepository = habitatRepository;
        this.insectOrderRepository = insectOrderRepository;
        this.insectFamilyRepository = insectFamilyRepository;
        this.tagRepository = tagRepository;
        this.insectMapper = insectMapper;
        this.userRepository = userRepository;
    }

    @Transactional
    public InsectDTO addInsect(InsectDTO dto) {
        Insect insect = new Insect();
        insectMapper.updateEntityFromDTO(dto, insect);
        Habitat habitat = habitatRepository.findByName(dto.habitatName())
                .stream().findFirst()
                .orElseGet(() -> {
                    Habitat newHabitat = new Habitat();
                    newHabitat.setName(dto.habitatName());
                    return habitatRepository.save(newHabitat);
                });
        insect.setHabitat(habitat);
        InsectOrder order = insectOrderRepository.findByName(dto.orderName())
                .orElseGet(() -> {
                    InsectOrder newOrder = new InsectOrder();
                    newOrder.setName(dto.orderName());
                    newOrder.setLatinName(dto.orderLatinName() != null ? dto.orderLatinName() : dto.latinName());
                    newOrder.setDescription("Automatycznie utworzony rząd dla : " + dto.orderName());
                    return insectOrderRepository.save(newOrder);
                });
        insect.setInsectOrder(order);
        InsectFamily family = insectFamilyRepository.findByName(dto.familyName())
                .orElseGet(() -> {
                    InsectFamily newFamily = new InsectFamily();
                    newFamily.setName(dto.familyName());
                    newFamily.setLatinName(dto.familyLatinName() != null ? dto.familyLatinName() : dto.familyName());
                    return insectFamilyRepository.save(newFamily);
                });
        insect.setInsectFamily(family);
        if (dto.templateQuestions() != null) {
            List<Question> questions = dto.templateQuestions().stream().map(qDto -> {
                Question q = new Question();
                q.setContent(qDto.content());
                q.setOptions(qDto.options());
                q.setCorrectAnswer(qDto.correctAnswer());
                q.setInsect(insect);
                return q;

            }).toList();
            insect.setTemplateQuestions(questions);
        }
        if (dto.tags() != null) {
            List<Tag> insectTags = dto.tags().stream()
                    .map(tagName -> tagRepository.findByName(tagName)
                            .orElseGet(() -> tagRepository.save(new Tag(tagName))))
                    .collect(Collectors.toList());
            insect.setTag(insectTags);
            System.out.println("tagi " + dto.tags());
        }

        return insectMapper.toDTO(insectRepository.save(insect));
    }

    public List<InsectDTO> getAllInsects() {
        List<Insect> insects = insectRepository.findAllWithBasicInfo();
        if (!insects.isEmpty()) {
            insects = insectRepository.fetchQuestions(insects);
            insects = insectRepository.fetchTags(insects);
        }
        return insects.stream()
                .map(insectMapper::toDTO)
                .toList();
    }

    public InsectDTO getInsectById(Long id) {
        return insectRepository.findById(id).map(insectMapper::toDTO).orElseThrow(() -> new EntityNotFoundException("Insect with id " + id + " not found"));

    }

    @Transactional
    public InsectDTO updateInsect(Long id, InsectDTO dto) {
        return insectRepository.findById(id)
                .map(existing -> {

                    insectMapper.updateEntityFromDTO(dto, existing);


                    existing.setInsectOrder(getOrCreateOrder(dto.orderName(), dto.orderLatinName()));
                    existing.setInsectFamily(getOrCreateFamily(dto.familyName(), dto.familyLatinName()));
                    existing.setHabitat(getOrCreateHabitat(dto.habitatName()));


                    if (dto.templateQuestions() != null) {
                        existing.getTemplateQuestions().clear();
                        List<Question> newQuestions = dto.templateQuestions().stream().map(qDto -> {
                            Question q = new Question();
                            q.setContent(qDto.content());
                            q.setOptions(qDto.options());
                            q.setCorrectAnswer(qDto.correctAnswer());
                            q.setInsect(existing);
                            return q;
                        }).toList();
                        existing.getTemplateQuestions().addAll(newQuestions);
                    }


                    if (dto.tags() != null) {
                        List<Tag> newTags = dto.tags().stream()
                                .map(tagName -> tagRepository.findByName(tagName)
                                        .orElseGet(() -> tagRepository.save(new Tag(tagName))))
                                .collect(Collectors.toList());
                        existing.setTag(newTags);
                    }

                    return insectMapper.toDTO(insectRepository.save(existing));
                })
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono owada: " + id));
    }
    @Transactional
    public void deleteInsect(Long id) {
        if (!insectRepository.existsById(id)) {
            throw new EntityNotFoundException("Insect with id " + id + " not found");
        }
        insectRepository.deleteById(id);
    }


    public List<InsectDTO> getInsectForQuiz(List<Long> ids) {

        List<Insect> insects = insectRepository.findAllByIdsWithQuestions(ids);


        return insects.stream()
                .map(insectMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<InsectDTO> getInsectForQuizByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found " + email));
        List<Insect> savedInsects = user.getSavedInsects();
        if (savedInsects.isEmpty()) {
            return new ArrayList<>();
        }
        List<Long> ids = savedInsects.stream().map(Insect::getId).toList();
        return getInsectForQuiz(ids);


    }

    @Transactional
    public boolean toggleInsectInQuiz(String email, Long insectId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + email));

        Insect insect = insectRepository.findById(insectId)
                .orElseThrow(() -> new EntityNotFoundException("Insect not found: " + insectId));

        List<Insect> savedList = user.getSavedInsects();


        boolean alreadyExists = savedList.stream()
                .anyMatch(i -> i.getId().equals(insectId));

        boolean isRemoved;
        if (alreadyExists) {

            savedList.removeIf(i -> i.getId().equals(insectId));
            isRemoved = true;
        } else {
            savedList.add(insect);
            isRemoved = false;
        }


        userRepository.save(user);

        return isRemoved;
    }

    private InsectOrder getOrCreateOrder(String name, String latinName) {
        return insectOrderRepository.findByName(name)
                .or(() -> insectOrderRepository.findByLatinName(latinName))
                .orElseGet(() -> insectOrderRepository.save(new InsectOrder(name, latinName)));
    }

    private InsectFamily getOrCreateFamily(String name, String latinName) {
        return insectFamilyRepository.findByName(name)
                .or(() -> insectFamilyRepository.findByLatinName(latinName))
                .orElseGet(() -> insectFamilyRepository.save(new InsectFamily(name, latinName)));
    }

    private Habitat getOrCreateHabitat(String name) {
        return habitatRepository.findByName(name)
                .orElseGet(() -> habitatRepository.save(new Habitat(name)));
    }
}



