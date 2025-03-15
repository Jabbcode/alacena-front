import { useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";

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
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Input
          id="name"
          value={form.name}
          placeholder="Nombre del ingrediente"
          ref={inputNameRef}
          className="col-span-4"
          onChange={(event) =>
            setForm({ ...form, name: event.currentTarget.value })
          }
        />
      </div>
    </div>
  );
};
export default FormCreateIngredient;
