export const GLOBAL_ERROR_MSG_KEY = 'globalError';

export interface Pet {
  id?: number;
  microchipNumber?: string;
  name: string;
  specie: string;
  specieTitle?: string;
  birthdate: Date;
  age?: number;
}

export interface PetSpecie {
  name: string;
  title: string;
}