import { IIngredient } from "@/interfaces/ingredient.interface";

type IngredientItemProps = {
  ingredient: IIngredient;
};

const IngredienteItem = ({ ingredient }: IngredientItemProps) => {
  return <li key={ingredient.id}>{ingredient.name}</li>;
};

export default IngredienteItem;
