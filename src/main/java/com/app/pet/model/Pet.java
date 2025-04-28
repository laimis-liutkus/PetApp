package com.app.pet.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class Pet {
  private Long id;
  private String microchipNumber;
  private String name;
  private PetSpecie specie;
  private LocalDate birthdate;
}
