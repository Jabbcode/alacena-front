export enum MealType {
  DESAYUNO = "Desayuno",
  ALMUERZO = "Almuerzo",
  CENA = "Cena",
}

export type GroupedMenu = {
  [key in MealType]?: { id?: number; nombre: string }[];
};
