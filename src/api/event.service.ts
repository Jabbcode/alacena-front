import { axiosClient } from "@/helpers/axiosHelpers";

import { IEvent } from "@/interfaces/menu.interface";

const ROUTE_MENU = "/menus";
const ROUTE_MENU_PLATO = "/menu-plate";

type BodyFilter = {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
};

type BodyAssignPlato = {
  mealType: string;
  plateId: number;
  date: Date;
};

type BodyRemovePlato = {
  menuId: number;
  mealType: string;
  plateId: number;
};

const useEventApi = () => {
  const findAllEvents = async (): Promise<IEvent[]> => {
    const { data } = await axiosClient.get<IEvent[]>(ROUTE_MENU);
    return data;
  };

  const createEvent = async (event: { date: Date }) => {
    const { data } = await axiosClient.post<Promise<IEvent>>(ROUTE_MENU, event);
    return data;
  };

  const findByFilterEvent = async (filters: BodyFilter): Promise<IEvent[]> => {
    const { data } = await axiosClient.post<Promise<IEvent[]>>(
      `${ROUTE_MENU}/search`,
      filters
    );
    return data;
  };

  const assignPlateToMenu = async ({
    mealType,
    plateId,
    date,
  }: BodyAssignPlato) => {
    const { data } = await axiosClient.put<Promise<IEvent>>(
      `${ROUTE_MENU_PLATO}/assign/${mealType}/${plateId}`,
      { date }
    );
    return data;
  };

  const removePlateFromMenu = async ({
    menuId,
    mealType,
    plateId,
  }: BodyRemovePlato) => {
    const { data } = await axiosClient.put<Promise<IEvent>>(
      `${ROUTE_MENU_PLATO}/${menuId}/remove/${mealType}/${plateId}`
    );
    return data;
  };

  return {
    findAllEvents,
    createEvent,
    findByFilterEvent,
    assignPlateToMenu,
    removePlateFromMenu,
  };
};

export default useEventApi;
