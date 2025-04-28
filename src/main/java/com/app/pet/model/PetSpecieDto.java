package com.app.pet.model;

import lombok.Builder;

@Builder
public record PetSpecieDto(String name, String title) {
}
