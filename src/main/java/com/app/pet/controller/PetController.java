package com.app.pet.controller;

import com.app.pet.model.PetDto;
import com.app.pet.model.PetSpecieDto;
import com.app.pet.service.PetService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/api/pets")
public class PetController {

  private PetService petService;

  @GetMapping(produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
  public List<PetDto> getPets() {
    return petService.getPets();
  }

  @GetMapping(value = "/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
  public PetDto getPet(@PathVariable Long id) {
    return petService.getPet(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public void createPet(@RequestBody PetDto pet) {
    petService.add(pet);
  }

  @PutMapping("/{id}")
  public void updatePet(@PathVariable Long id, @RequestBody PetDto pet) {
    petService.update(id, pet);
  }

  @DeleteMapping("/{id}")
  public void deletePet(@PathVariable Long id) {
    petService.deletePet(id);
  }

  @GetMapping(value = "/species", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
  public List<PetSpecieDto> getPetSpecies() {
    return petService.getPetSpecies();
  }

}
