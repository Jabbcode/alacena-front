import { UnitType } from "./enums";
import { IPlate } from "./plate.interface";

export interface IIngredient {
  id?: number;
  name: string;
}

export interface IIngredientPlate {
  id?: number;
  plate: IPlate;
  info: IIngredient;
  quantity: number;
  unit: UnitType;
}
