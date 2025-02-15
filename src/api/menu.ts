import { axiosClient } from "@/helpers/axiosHelpers";

import { IEvento } from "@/interfaces/menu";

export const getEventosService = async (): Promise<IEvento[]> => {
  const { data } = await axiosClient.get<IEvento[]>("/menus");
  return data;
};

export const createEventoService = async (event: { fecha: Date }) => {
  const { data } = await axiosClient.post<Promise<IEvento>>("/menus", event);
  return data;
};

export const findByFilterEventService = async (filters: {
  fecha: Date;
}): Promise<IEvento[]> => {
  const { data } = await axiosClient.post<Promise<IEvento[]>>(
    "/menus/search",
    filters
  );
  return data;
};

export const assignPlatoToMenuService = async ({
  mealType,
  platoId,
  fecha,
}: {
  mealType: string;
  platoId: number;
  fecha: Date;
}) => {
  const { data } = await axiosClient.put<Promise<IEvento>>(
    `/menus/assign/${mealType}/${platoId}`,
    { fecha }
  );
  return data;
};

export const removePlatoFromMenuService = async ({
  menuId,
  mealType,
  platoId,
}: {
  menuId: number;
  mealType: string;
  platoId: number;
}) => {
  const { data } = await axiosClient.put<Promise<IEvento>>(
    `/menus/${menuId}/remove/${mealType}/${platoId}`
  );
  return data;
};
