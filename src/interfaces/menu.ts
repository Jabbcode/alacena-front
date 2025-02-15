import { MealType } from "./enums";
import { IPlato } from "./plato";

export interface IEvento {
  id?: number;
  fecha: Date;
  menuPlatos?: IMenuPlato[];
}

export interface IMenuPlato {
  id?: number;
  categoria: MealType;
  plato: IPlato;
}
