package com.app.pet.service;

import com.app.pet.model.Pet;
import com.app.pet.model.PetDto;
import com.app.pet.model.PetSpecie;
import com.app.pet.model.PetSpecieDto;
import com.app.pet.repository.PetRepository;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Stream;

@Service
@Transactional
@AllArgsConstructor
public class PetService {

  private final PetRepository petRepository;

  public List<PetDto> getAll() {
    return petRepository.findAll().stream().map(this::toDto).toList();
  }

  public PetDto getById(Long id) {
    return petRepository.findById(id)
        .map(this::toDto)
        .orElseThrow(() -> new IllegalStateException("Pet not found"));
  }

  public void add(PetDto petDto) {
    petRepository.findByName(petDto.name()).ifPresent((pet) -> {
      throw new IllegalArgumentException(String.format("Pet '%s' already exists", petDto.name()));
    });
    petRepository.create(fromDto(petDto));
  }

  public void update(Long id, PetDto petDto) {
    petRepository.update(id, fromDto(petDto));
  }

  public void delete(Long id) {
    petRepository.deleteById(id);
  }

  public List<PetSpecieDto> getPetSpecies() {
    return Stream.of(PetSpecie.values())
        .map((petSpecie -> new PetSpecieDto(petSpecie.name(), petSpecie.getTitle())))
        .toList();
  }

  private Pet fromDto(PetDto petDto) {
    final String microchipNumber = StringUtils.isBlank(petDto.microchipNumber())
        ? null
        : petDto.microchipNumber();
    return Pet.builder()
        .id(petDto.id())
        .microchipNumber(microchipNumber)
        .name(petDto.name())
        .specie(petDto.specie())
        .birthdate(petDto.birthdate())
        .build();
  }

  private PetDto toDto(Pet pet) {
    int years = (int) ChronoUnit.YEARS.between(pet.getBirthdate(), LocalDate.now());
    return PetDto.builder()
        .id(pet.getId())
        .microchipNumber(pet.getMicrochipNumber())
        .name(pet.getName())
        .specie(pet.getSpecie())
        .specieTitle(pet.getSpecie().getTitle())
        .birthdate(pet.getBirthdate())
        .age(years)
        .build();
  }

}
