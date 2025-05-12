import {useMutation, useQuery} from '@tanstack/react-query';
import {Pet, PetSpecie} from './types.ts';
import {axiosInstance} from '@/api/axios.ts';

export const useGetAllPets = () => {
  return useQuery({
    queryKey: ['useGetAllPets'],
    queryFn: async () => {
      const res = await axiosInstance.get<Pet[]>('/pets');
      return transformResponsePets(res?.data);
    },
  });
};

export const useGetAllPetSpecies = () => {
  return useQuery({
    queryKey: ['useGetAllPetSpecies'],
    queryFn: () => {
      return axiosInstance.get<PetSpecie[]>('/pets/species');
    },
  });
};

export const useAddPet = () => {
  return useMutation({
    mutationFn: async (pet: Pet) => {
      return axiosInstance.post('/pets', pet);
    }
  });
};

export const useUpdatePet = () => {
  return useMutation({
    mutationFn: async (pet: Pet) => {
      return axiosInstance.put(`/pets/${pet.id}`, pet);
    }
  });
};

export const useDeletePet = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(`/pets/${id}`);
    }
  });
};

const transformResponsePets = (res: any): Pet[] => {
  console.log('Transforming', res);
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
