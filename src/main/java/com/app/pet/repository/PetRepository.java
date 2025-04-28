package com.app.pet.repository;

import com.app.pet.model.Pet;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PetRepository {
  @Select("""
      select * from pet
      order by name asc
      """
  )
  List<Pet> findAll();

  @Select("""
      select * from pet
      where id = #{id}
      """
  )
  Optional<Pet> findById(Long id);

  @Insert("""
      insert into pet (microchip_number, name, specie, birthdate) 
      values (#{microchipNumber}, #{name}, #{specie}, #{birthdate})
      """
  )
  void create(Pet pet);

  @Update("""
      update pet
      set microchip_number=#{pet.microchipNumber}, 
          name=#{pet.name}, 
          specie=#{pet.specie}, 
          birthdate=#{pet.birthdate} 
      where id=#{id}
      """
  )
  void update(@Param("id") Long id, @Param("pet") Pet pet);

  @Delete("""
      delete from pet 
      where id = #{id}
      """
  )
  void deleteById(Long id);
}
