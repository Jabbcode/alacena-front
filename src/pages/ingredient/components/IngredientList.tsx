import IngredienteItem from "./IngredientItem";
import Pagination from "@/components/Pagination/Pagination";

import { IIngredient } from "@/interfaces/ingredient.interface";

type IngredientListProps = {
  ingredients: IIngredient[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const IngredientList = ({
  ingredients,
  page,
  setPage,
  setLimit,
  totalPages,
}: IngredientListProps) => {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ingredients.map((ingredient) => (
          <IngredienteItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </section>
      <Pagination
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        totalPages={totalPages}
      />
    </>
  );
};
export default IngredientList;
