import { IIngredient } from "@/interfaces/ingredient.interface";
import IngredienteItem from "./IngredientItem";

type IngredientListProps = {
  ingredients: IIngredient[];
};

const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ingredients.map((ingredient) => (
        <IngredienteItem key={ingredient.id} ingredient={ingredient} />
      ))}
    </ul>
  );
};
export default IngredientList;
