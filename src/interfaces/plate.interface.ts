import { IIngredientPlate } from "./ingredient.interface";

export interface IPlate {
  id?: number;
  name: string;
  description?: string;
  ingredients?: IIngredientPlate[];
}
