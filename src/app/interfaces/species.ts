import { History } from '@interfaces/history';
import { EventSummary } from './event-summary';

export interface Species extends History {
    id: number;
    name: string;
    class_name: string;
    order_name: string;
    family_name: string;
    sub_family_name: string;
    genus_name: string;
    species_latin_name: string;
    subspecies_latin_name: string;
    tsn: number;
}

// Map species classes to broad animal type categories
const animalTypeNameMap = {
  Mammalia: "Mammal",
  Aves: "Bird",
  Reptilia: "Reptile/Amphibian",
  Amphibia: "Reptile/Amphibian",
  Actinopterygii: "Fish",
  Chondrichthyes: "Fish",
  Osteichthyes: "Fish",
  Teleostei: "Fish",
};

export function getAnimalType(species: Species): string {
  const animalType = animalTypeNameMap[species.class_name];
  if (animalType) {
    return animalType;
  } else {
    return "Other";
  }
}

export function getAnimalTypes(speciesArray:Species[]): string[] {
  const animalTypes = [];
  if (speciesArray && speciesArray.length > 0) {
    for (const species of speciesArray) {
      animalTypes.push(getAnimalType(species));
    }
  } else {
    animalTypes.push("Other");
  }
  return animalTypes;
}
