import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Pet, PetSpecie} from './types.ts';

export const useGetAllPets = () => {
  return useQuery({
    queryKey: ['useGetAllPets'],
    queryFn: () => {
      return axios.get<Pet[]>('http://localhost:8080/api/pets', {
        transformResponse: [transformResponsePets]
      });
    },
  });
};

export const useGetAllPetSpecies = () => {
  return useQuery({
    queryKey: ['useGetAllPetSpecies'],
    queryFn: () => {
      return axios.get<PetSpecie[]>('http://localhost:8080/api/pets/species');
    },
  });
};


export const useAddPet = () => {
  return useMutation({
    mutationFn: async (pet: Pet) => {
      return axios.post(`http://localhost:8080/api/pets`, pet);
    }
  });
};

export const useUpdatePet = () => {
  return useMutation({
    mutationFn: async (pet: Pet) => {
      return axios.put(`http://localhost:8080/api/pets/${pet.id}`, pet);
    }
  });
};

export const useDeletePet = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`http://localhost:8080/api/pets/${id}`);
    }
  });
};

const transformResponsePets = (rawResponse: string): Pet[] => {
  const res = JSON.parse(rawResponse);
  if (!res || !res.length) {
    return [];
  }
  return res.map((item: any) => ({
    id: item.id,
    name: item.name,
    microchipNumber: item.microchipNumber,
    specie: item.specie,
    specieTitle: item.specieTitle,
    birthdate: new Date(item.birthdate),
    age: item.age,
  }));
};

