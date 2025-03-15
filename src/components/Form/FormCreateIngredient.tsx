import { useEffect, useRef } from "react";

interface FormCreateIngredientProps {
  form: { name: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string }>>;
}

const FormCreateIngredient = ({ form, setForm }: FormCreateIngredientProps) => {
  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputNameRef.current?.focus();
  }, [form.name]);

  return (
    <form className="p-4 md:p-5">
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            htmlFor="ingredient"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            ref={inputNameRef}
            type="text"
            name="ingredient"
            value={form.name}
            onChange={(event) =>
              setForm({ ...form, name: event.currentTarget.value })
            }
            id="ingredient"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Ingrediente"
          />
        </div>
      </div>
    </form>
  );
};
export default FormCreateIngredient;
