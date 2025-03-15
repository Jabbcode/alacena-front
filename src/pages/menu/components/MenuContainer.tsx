import PlatosContainer from "./PlatosContainer";

import { GroupedMenu } from "@/interfaces/enums";
import { IEvent } from "@/interfaces/menu.interface";

interface MenuContainerProps {
  event: IEvent;
}

const MenuContainer = ({ event }: MenuContainerProps) => {
  const groupedMenu: GroupedMenu = {};

  // Agrupar platos por categoría
  event.menuPlates?.forEach((mp) => {
    if (!groupedMenu[mp.category]) {
      groupedMenu[mp.category] = [];
    }
    groupedMenu[mp.category]?.push(mp.plate);
  });

  // Convertir groupedMenu a categorizedMenu
  const categorizedMenu = Object.entries(groupedMenu).map(
    ([category, plates]) => ({ category, plates })
  );

  return (
    <article className="p-4 bg-white rounded-lg mb-5 flex flex-col gap-2">
      {categorizedMenu.length > 0 ? (
        <ul className="ml-6 space-y-2">
          {categorizedMenu.map(({ category, plates }) => {
            return (
              <li key={category} className="mb-6">
                <strong className="block text-gray-600">{category}: </strong>
                <PlatosContainer
                  plates={plates}
                  category={category}
                  menu={event}
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
