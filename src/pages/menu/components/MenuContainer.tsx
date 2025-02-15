import PlatosContainer from "./PlatosContainer";

import { GroupedMenu } from "@/interfaces/enums";
import { IEvento } from "@/interfaces/menu";

interface MenuContainerProps {
  evento: IEvento;
  setMenu: React.Dispatch<React.SetStateAction<IEvento>>;
}

const MenuContainer = ({ evento, setMenu }: MenuContainerProps) => {
  const groupedMenu: GroupedMenu = {};

  // Agrupar platos por categoría
  evento.menuPlatos?.forEach((mp) => {
    if (!groupedMenu[mp.categoria]) {
      groupedMenu[mp.categoria] = [];
    }
    groupedMenu[mp.categoria]?.push(mp.plato);
  });

  // Convertir groupedMenu a categorizedMenu
  const categorizedMenu = Object.entries(groupedMenu).map(
    ([categoria, platos]) => ({ categoria, platos })
  );

  return (
    <article className="p-4 bg-white rounded-lg mb-5 flex flex-col gap-2">
      {categorizedMenu.length > 0 ? (
        <ul className="ml-6 space-y-2">
          {categorizedMenu.map(({ categoria, platos }) => {
            return (
              <li key={categoria} className="mb-6">
                <strong className="block text-gray-600">{categoria}: </strong>
                <PlatosContainer
                  platos={platos}
                  categoria={categoria}
                  menu={evento}
                  setMenu={setMenu}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center mx-auto font-bold text-xl">
          Sin comidas asignadas
        </div>
      )}
    </article>
  );
};
export default MenuContainer;
