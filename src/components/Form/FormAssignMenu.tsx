import { useQuery } from "@tanstack/react-query";

import usePlateApi from "@/api/plate.service";

interface FormAssignMenuProps {
  form: {
    mealType: string;
    name: string;
    date: Date;
    plateId: number;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      mealType: string;
      name: string;
      date: Date;
      plateId: number;
    }>
  >;
}

const FormAssignMenu = ({ form, setForm }: FormAssignMenuProps) => {
  const { findAllPlates } = usePlateApi();

  const { data: plates } = useQuery({
    queryKey: ["plates"],
    queryFn: findAllPlates,
  });

  return (
    <form className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Plato
          </label>
          <input
            onChange={(event) =>
              setForm({ ...form, name: event.currentTarget.value })
            }
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Nombre del plato"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Categoria
          </label>
          <select
            onChange={(event) =>
              setForm({ ...form, mealType: event.currentTarget.value })
            }
            id="category"
            defaultValue=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option>Seleccione una categoria</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
            <option value="Cena">Cena</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="plates"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Platos
          </label>
          <select
            disabled={form.name.length > 0}
            onChange={(event) =>
              setForm({
                ...form,
                plateId: Number(event.currentTarget.value),
              })
            }
            defaultValue=""
            id="plates"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option>Seleccione un plato</option>
            {plates?.map((plate) => {
              return (
                <option key={plate.id} value={plate.id}>
                  {plate.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </form>
  );
};
export default FormAssignMenu;
