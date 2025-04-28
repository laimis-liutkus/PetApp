package com.app.pet.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.stream.Stream;

@Getter
@AllArgsConstructor
public enum PetSpecie {
  DOG("Dog"),
  CAT("Cat"),
  HAMSTER("Hamster"),
  PARROT("Parrot");

  private final String title;

  public static PetSpecie getPetSpecie(String title) {
    return Stream.of(PetSpecie.values())
        .filter(petSpecie -> petSpecie.getTitle().equals(title))
        .findFirst()
        .orElse(null);
  }
}
