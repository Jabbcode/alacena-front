import { removePlatoFromMenuService } from "@/api/menu";
import { IEvento } from "@/interfaces/menu";
import { IPlato } from "@/interfaces/plato";
import { CircleMinus } from "lucide-react";

interface PlatosContainerProps {
  menu: IEvento;
  categoria: string;
  platos: IPlato[];
  setMenu: React.Dispatch<React.SetStateAction<IEvento>>;
}

const PlatosContainer = ({
  menu,
  categoria,
  platos,
  setMenu,
}: PlatosContainerProps) => {
  const deletePlato = async (
    mealType: string,
    menuId: number,
    platoId: number
  ) => {
    const data = await removePlatoFromMenuService({
      mealType,
      menuId,
      platoId,
    });
    setMenu(data);
  };

  return (
    <ul className="list-disc list-inside ml-4 space-y-1">
      {platos.map((plato) => {
        return (
          <li key={plato.id} className="text-gray-700 flex gap-2">
            {plato.nombre}
            <div onClick={() => deletePlato(categoria, menu.id!, plato.id!)}>
              <CircleMinus />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PlatosContainer;
