import { useQuery } from "@tanstack/react-query";

import useIngredientApi from "@/api/ingredient.service";

interface FormAssignMenuProps {
  form: {
    plateId: number;
    ingredientId: number;
    quantity: number;
    unit: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      plateId: number;
      ingredientId: number;
      quantity: number;
      unit: string;
    }>
  >;
}

const FormAssignIngrediente = ({ form, setForm }: FormAssignMenuProps) => {
  const { findAllIngredient } = useIngredientApi();

  const { data } = useQuery({
    queryKey: ["ingredients"],
    queryFn: findAllIngredient,
    staleTime: 5 * 60 * 1000, // Mantener en caché durante 5 minutos
    refetchOnWindowFocus: false, // Evitar refetch cuando el usuario cambie de pestaña
  });

  return (
    <form className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            htmlFor="ingredient"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ingrediente
          </label>
          <select
            onChange={(event) =>
              setForm({
                ...form,
                ingredientId: Number(event.currentTarget.value),
              })
            }
            id="ingredient"
            value={form.ingredientId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option>Seleccione un ingrediente</option>
            {data?.ingredients?.map((ingredient) => {
              return <option value={ingredient.id}>{ingredient.name}</option>;
            })}
          </select>
        </div>

        <div className="col-span-1">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cantidad
          </label>
          <input
            onChange={(event) =>
              setForm({ ...form, quantity: Number(event.currentTarget.value) })
            }
            type="text"
            name="quantity"
            id="quantity"
            value={form.quantity}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Cantidad"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="unit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Unidad
          </label>
          <select
            onChange={(event) =>
              setForm({ ...form, unit: event.currentTarget.value })
            }
            id="unit"
            value={form.unit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option>Seleccione una unidad</option>
            <option value="kg">Kg</option>
            <option value="gr">g</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
            <option value="pza">Pza</option>
          </select>
        </div>
      </div>
    </form>
  );
};
export default FormAssignIngrediente;
