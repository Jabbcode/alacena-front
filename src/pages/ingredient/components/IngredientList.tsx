import { IIngredient } from "@/interfaces/ingredient.interface";
import IngredienteItem from "./IngredientItem";

type IngredientListProps = {
  ingredients: IIngredient[];
};

const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <IngredienteItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </ul>
  );
};
export default IngredientList;
