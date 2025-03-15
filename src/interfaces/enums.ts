export enum MealType {
  DESAYUNO = "Desayuno",
  ALMUERZO = "Almuerzo",
  CENA = "Cena",
}

export type GroupedMenu = {
  [key in MealType]?: { id?: number; name: string }[];
};

export enum UnitType {
  KG = "kg",
  GR = "gr",
  L = "L",
  ML = "ml",
  PZA = "pza",
}
