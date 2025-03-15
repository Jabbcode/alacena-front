import { MealType } from "./enums";
import { IPlate } from "./plate.interface";

export interface IEvent {
  id?: number;
  date: Date;
  menuPlates?: IMenuPlate[];
}

export interface IMenuPlate {
  id?: number;
  menu: IEvent;
  plate: IPlate;
  category: MealType;
}
