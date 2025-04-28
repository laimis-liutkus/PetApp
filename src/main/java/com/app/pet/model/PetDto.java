package com.app.pet.model;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record PetDto(Long id, String microchipNumber, String name, PetSpecie specie, String specieTitle,
                     LocalDate birthdate, int age) {
}
