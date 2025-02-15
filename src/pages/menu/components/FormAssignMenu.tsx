import { IPlato } from "@/interfaces/plato";

interface FormAssignMenuProps {
  form: {
    mealType: string;
    platoId: number;
    fecha: Date;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      mealType: string;
      platoId: number;
      fecha: Date;
    }>
  >;
  platos: IPlato[];
}

const FormAssignMenu = ({ form, setForm, platos }: FormAssignMenuProps) => {
  return (
    <form className="mb-6 flex flex-col gap-4 items-center">
      <div>
        <label htmlFor="">Categoria: </label>
        <select
          name="categorias"
          onChange={(event) =>
            setForm({ ...form, mealType: event.currentTarget.value })
          }
          defaultValue="Desayuno"
        >
          <option value="Desayuno">Desayuno</option>
          <option value="Almuerzo">Almuerzo</option>
          <option value="Cena">Cena</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Plato: </label>
        <select
          name="platos"
          onChange={(event) =>
            setForm({
              ...form,
              platoId: Number(event.currentTarget.value),
            })
          }
          defaultValue={platos[0]?.nombre}
        >
          {platos.map((plato) => {
            return (
              <option key={plato.id} value={plato.id}>
                {plato.nombre}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
export default FormAssignMenu;
